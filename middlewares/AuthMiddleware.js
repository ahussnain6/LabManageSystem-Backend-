const { z } = require("zod");
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
const signupSchema = z.object({
    username:
    z.string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be at least of 3 characters"})
    .max(30,{message:"Name must not be more than 30 characters"}),
    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(30, { message: "Email must not be more than 30 characters" }),
    password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least of 6 characters" })
    .max(24, "Password can't be greater than 24 characters")
    .regex(passwordValidation, {
      message: 'At least one uppercase ,one lowercase letter, one number and one special character'
    }),

})
module.exports = signupSchema;