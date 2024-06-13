const express = require("express");
const {getUsers,Signin,SignUP, getemail, changepassword } = require("../controllers/User");
const validate = require("../validators/Authvalidator");
const signupSchema = require("../middlewares/AuthMiddleware");
const router = express.Router();
router.route("/signup").post(validate(signupSchema),SignUP);
router.route("/login").post(Signin);
router.route("/users").get(getUsers);
router.route("/email/:email").post(getemail);
router.route("/password/:id/:password").post(changepassword);
module.exports = router;