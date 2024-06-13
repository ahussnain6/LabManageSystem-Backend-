const mongoose = require("mongoose");
const URI = process.env.MONGODBURI;
const dbConnect = async()=>{
    if (!URI) {
        throw new Error("MongoDB URI is not defined");
    }
try {
    await mongoose.connect(URI);
    console.log("Connection Successfully at DBs");
} catch (error) {
    console.log("Connection failed");
}
}
module.exports = dbConnect;