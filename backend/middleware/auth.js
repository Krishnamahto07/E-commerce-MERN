const jwt = require("jsonwebtoken")
const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
exports.isAuthenticatedUser = async(req,res,next) =>{
    try {
        const {token} =  req.cookies;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Please Login to access this resource"
            })
        }
        const decodedData = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decodedData.id)
    
        next();
    
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"Error in Auth..."
        })
    }
}

exports.authorizeRoles = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success:false,
                message:`Role : ${req.user.role} is not allowed to access this role`
            })
        }
        next();
    };
};