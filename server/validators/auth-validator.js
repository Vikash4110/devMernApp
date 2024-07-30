const { z } = require('zod');

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid Email address" })
        .min(3, { message: "Email must have at least 3 characters" })
        .max(255, { message: "Email must not be more than 255 characters" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(255, { message: "Password can't be greater than 255 characters" }),
});

// Creating an object Schema
const SignupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(3, { message: "Username must have at least 3 characters" })
        .max(255, { message: "Username must not be more than 255 characters" }),
    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must have at least 10 characters" })
        .max(20, { message: "Phone must not be more than 20 characters" }),
});

module.exports = { SignupSchema, loginSchema };
