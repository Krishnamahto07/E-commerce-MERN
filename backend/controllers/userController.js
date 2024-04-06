const User = require("../model/userModel");
// const { options } = require("../routes/userRoutes");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail.js")

const crypto = require("crypto")
// Register a User

exports.registerUser = async(req,res,next) =>{
    try {
        const {name , email, password} = req.body;
        
        const user2 = await User.findOne({ email }).select("+password");
        if(user2){
            return res.status(400).json({
                success:false,
                message:"Already registered !!!"
            })
        }

        const user = await User.create({
            name,email,password,
            avatar:{
                public_id:"this is sampler id",
                url:"profileUrl"
            }
        });

        sendToken(user,201,res)

    } catch (err) {
        res.status(404).json({
            success:false,
            message:"Error in Register User",
            err,
        })
    }
}


// Login User 

exports.loginUser = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        // checking if user has given password and email both
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please Enter Email & Password"
            })
        }
        
        const user = await User.findOne({ email }).select("+password");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid Email and Password"
            })
        }

        const isPasswordMatched = await user.comparePassword(password);

        if(!isPasswordMatched){
            return res.status(401).json({
                success:false,
                message:"Invalid Email and Password"
            })
        }

        // const token = user.getJWTToken();

        sendToken(user,200,res)

        /*const options = {
            expires : new Date.now(
                Date.now()+process.env.COOKIE_EXPIRE*24*60*60*100
            ),
            httpOnly:true,
        };

        res.status(200).cookie('token',token,options).json({
            success:true,
            token,
            user,
        }) */
        // res.status(statusCode).cookie('token',token,options).json({
        //     success:true,
        //     // user,
        //     token,
        // });

    } catch (error) {
        res.status(404).json({
            success:false,
            message:"Error in Login User",
            err,
        })
    }
}

// Logout User

exports.logout = async(req,res,next) =>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
}

// Forgot Password
exports.forgotPassword = async(req,res,next) =>{
    try {
        const user = await User.findOne({ email:req.body.email});
        if(!user) {
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }
         // Get Reset Password Token
        const resetToken = user.getResetPasswordToken();
        await user.save({validateBeforeSave : false});
        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`
        
        try {
            await sendEmail({
                email: user.email,
                subject: `Ecommerce Password Recovery`,
                message,
            });

            res.status(200).json({
                success:true,
                message:`Email sent to ${user.email} successfully`
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave : false});
            
            return res.status(500).json({
                success:false,
                message:`gya abto ${error.message}`
            })
        }
    } catch (error) {
     res.status(500).json({
        success:false,
        message:"Error in Reset Password"
     })   
    }
        
}

exports.resetPassword = async(req , res , next)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt: Date.now() },
    });

    if(!user){
        return res.status(400).json({
            success:false,
            message:"Reset Password token in Invalid or has been expires"
        })
    }

    if(req.body.password !== req.body.confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password doen't match"
        })
    }
    user.password = req.body.password;
    user.resetPasswordExpire= undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    sendToken(user,200,res)
}

// Get User Details
exports.getUserDetails = async(req,res,next) =>{
   try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    })
   } catch (error) {
    res.status(400).json({
        success:false,
        message:"Error in Get User Details"
    })
   }
}

// Update User Password

exports.updatePassword = async(req,res,next) => {
    try {
        const user = await User.findById(req.user.id).select("+password");
        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if(!isPasswordMatched){
            return res.status(401).json({
                success:false,
                message:"Invalid Old Password"
            })
        }
        if(req.body.newPassword !== req.body.confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"Password Doesn't Mathced !"
            })
        }

        user.password = req.body.newPassword;
        
        await user.save();
        sendToken(user,200,res);

    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error in Update Password of User"
        })
    }
}

// Update User Profile Details 

exports.updateProfile = async(req,res,next)=>{
    try {
        const newUserData = {
            name:req.body.name,
            email:req.body.email
        }

        // add cloudinary for avatar

        const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success:true,
            message:"Updated successfully"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error in Update Profile"
        })
    }
}

// Get all Users (Admin)

exports.getAllUser = async(req,res,next) =>{
    try {
        const users = await User.find();

        res.status(200).json({
            success:true,
            users,
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error in Get all User Details"
        })
    }
}



// Get Single User (Admin)

exports.getSingleUser = async(req,res,next) =>{
    try {
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Doesn't Exits"
            })
        }
        res.status(200).json({
            success:true,
            user,
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error in Get Single User Details"
        })
    }
}

// Update User Role
exports.updateUserRole = async(req,res,next)=>{
    try {
        const newUserData = {
            name:req.body.name,
            email:req.body.email,
            role:req.body.role
        }

        const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })

        res.status(200).json({
            success:true,
            message:"Updated successfully"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error in Update Profile"
        })
    }
}

// Deleter User -- Admin
exports.deleteUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json({
                success:false,
                message:`User Does Not exists with id: ${req.params.id}`
            })
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"Deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error in Delete User"
        })
    }
}