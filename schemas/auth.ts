import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Passwords must be at least 6 characters long"
  })
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email"
  })
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, "Passwords must be at least 6 characters long")
    .max(32, "Passwords must be a maximum of 32 characters"),
  code: z.optional(z.string())
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, "Passwords must be at least 6 characters long")
    .max(32, "Passwords must be a maximum of 32 characters"),
  name: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters")
});