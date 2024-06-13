const Patient = require("../models/Patientmodel");
const createPatient = async (req, res)=>{
  const {  firstname,
  lastname,
  email,
  countryname,
  streetno,
  testname,
  zipcode,
  address,
  code,
  contact,
  occupation,
  information, } = req.body;
  // console.log(req.body);
  try {
    const emailexist = await Patient.findOne({ email });
    if (emailexist) {
     return res.status(400).json({ msg: "Email Exist Already" });
    }
    const patiententry = await Patient.create({  firstname,
        lastname,
        email,
        countryname,
        streetno,
        testname,
        zipcode,
        address,
        code,
        contact,
        occupation,
        information });
    return res.status(201).json({
      email: patiententry.email,
      firstname: patiententry.firstname,
      lastname: patiententry.lastname,
      id: patiententry._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }};
  const getPatients = async (req, res) => {
    try {
      const AllPatients = await Patient.find({});
      return res.status(201).send({ data:  AllPatients });
    } catch (error){
      console.log(error); } } ;
      const delPatient = async(req,res)=>{
        const id = req.params.id;
         try {
          const instance = await Patient.deleteOne({_id:id})
          res.status(200).send({response:instance});
         } catch (error) {
          console.log(error);
         }
        }
        const editPatient =async(req,res)=>{
          const {Url} = req.body;
          const id = req.params.id;
      try {
        const updatemsg = await Patient.updateOne({_id:id},{
          $set: { imgurl : Url } });
      res.status(200).send({ response: updatemsg});
      } catch (error) {
        console.log(error);}
        }
  module.exports = {createPatient, getPatients,delPatient,editPatient};