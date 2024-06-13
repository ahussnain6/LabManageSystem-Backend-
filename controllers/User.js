const Signup = require("../models/Usermodel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const SignUP = async(req, res) => {
  const { username, email, password } = req.body;
  try {
    const emailexist = await Signup.findOne({ email });
    if (emailexist) {
     return res.status(400).json({ msg: "Email Exist Already" });
    }
    const usersign = await Signup.create({ username, email, password });
    return res.status(201).json({
      email: usersign.email,
      token: await usersign.generateToken(),
      id: usersign._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }};
const Signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailexis = await Signup.findOne({ email });
    if (!emailexis) {
      res.status(201).json({ msg: "Invalid Credentials" });
    } else {
      const isverify = await bcrypt.compare(password, emailexis.password);
      if (isverify) {
        res.status(200).json({
          email: emailexis.email,
          token: await emailexis.generateToken(),
          id: emailexis._id.toString(),
          msg: "Login Successfully",
        });
      } else {
        res.status(201).json({ msg: "Invalid Credentials" });
      }
    }
  } catch (error) {
    console.log(error);
  }};
const getUsers = async (req, res) => {
    try {
      const AllUsers = await Signup.find({});
      return res.status(200).send({ data: AllUsers });
    } catch (error){
      console.log(error); } } ;
      const getemail =async(req,res)=>{
        const {email} = req.params; 
       try {
         const buyer = await Signup.findOne({ email:email });
         if (!buyer) { return res.status(400).json({ msg: "Invalid Credientials" });}
        const token = buyer.generateToken();
        var transporter = nodemailer.createTransport({
         service: "gmail",
         host: "smtp.gmail.com",
         port: 587,
         secure: false,
         auth: {
           user: process.env.email,
           pass: process.env.USERPASSWORD,
         },
       });
       var mailOptions = {
         from: process.env.email,
         to: `${email}`,
         subject: "Reset Your Password",
         text: `http://localhost:5173/changepassword/${buyer._id}`, };
       transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
           console.log(error);
         } else {
           console.log("Email sent: " + info.response);
           return res.send({Status:"Success"});  }
       });
     } catch (error) {}}
     const changepassword = async(req,res)=>{
      const {id,password} = req.params; 
      try {
        const saltRound = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,saltRound);
       const response = await Signup.findByIdAndUpdate({_id:id},{password:hashpassword},{new:true});
         res.json(response);
      } catch (error) {
        console.log(error);
                res.json(error);
      }}
module.exports = {getemail,getUsers,Signin,SignUP,changepassword};