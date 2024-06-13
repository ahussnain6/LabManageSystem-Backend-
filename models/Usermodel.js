const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const SignupSchema = new mongoose.Schema({
username:{
    type:String,
    require:true
},
email:{
    type:String,
    require:true
},
password:{
    type:String,
    require:true
}
})
SignupSchema.pre("save",async function (next){
  const usersign = this;
  if(!usersign.isModified("password")){
   next();
  }
  try {
    const genSalt = await bcrypt.genSalt(10);
    const hashing = await bcrypt.hash(usersign.password,genSalt);
    usersign.password = hashing;
  } catch (error) {
    next(error);
  }})
SignupSchema.methods.generateToken = async function (){
    try {
        return jsonwt.sign({
            Id:this._id.toString(),
            email:this.email,
            username:this.username
        },
    process.env.JWTKEY
    ,{
        expiresIn:"30d"})
    } catch (error) {
        console.log(error);
    }};
const Signup = new mongoose.model("User",SignupSchema);
module.exports = Signup;