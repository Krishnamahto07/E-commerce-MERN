const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your Name"],
        maxLength:[30,"Name cannot exceed 30 Character"],
        minLength:[4,"Name should have atleast 4 character"]
    },
    email:{
        type:String,
        required:[true,"Please Enter your Email"],
        validate:[validator.isEmail,"Please Enter a valid Email"],
        // unique:true
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should be Atleast 8 Characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire: Date,
});


// Password Hashing
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }
    
    this.password = await bcrypt.hash(this.password,10)
})

// JWT Token genrate

userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE,
    });
};

// comparePassword
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// Genrating Password Reset Token
userSchema.methods.getResetPasswordToken = function(){
    // Genrating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 *1000;
    return resetToken;
}
module.exports = mongoose.model("User",userSchema)