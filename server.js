require("dotenv").config();
const express = require("express");
const dbConnect = require("./utils/Db");
const errorMiddleware = require("./middlewares/Errormiddleware");
const app = express();
const cors = require("cors");
const UserRoute = require("./routes/UserRoute");
const Patientrouter = require("./routes/Patientroute");
const port = process.env.PORT || 5500;
const corsOptions={
  origin:"*",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,};
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use("/user",UserRoute);
  app.use("/patient",Patientrouter);
  app.use(errorMiddleware);
app.get("/",async(req,res)=>{
 res.end("Running Backend Successfully");})
dbConnect().then(()=>{
    app.listen(port,()=>{
  console.log(`Server is listening at Port ${port}`);
    }  )  
  }    );