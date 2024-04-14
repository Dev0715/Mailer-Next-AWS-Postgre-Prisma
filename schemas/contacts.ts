import * as z from "zod";

export const NewSubscriberSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  firstName: z
    .string()
    .min(6, "First name must be at least 6 characters long")
    .max(32, "First name must be a maximum of 32 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(32, "Last name must be a maximum of 32 characters"),
  address: z
    .string()
    .min(6, "Address must be at least 6 characters long")
    .max(256, "Address must be a maximum of 256 characters"),
  phoneNumber: z
    .string()
    .min(6, "Phone number must be at least 6 characters long")
    .max(12, "Phone number must be a maximum of 12 characters"),
  birthday: z.date({
    required_error: "A date of birth is required."
  })
});

export const EditContactSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  firstName: z
    .string()
    .min(6, "First name must be at least 6 characters long")
    .max(32, "First name must be a maximum of 32 characters"),
  lastName: z
    .string()
    .min(6, "Last name must be at least 6 characters long")
    .max(32, "Last name must be a maximum of 32 characters"),
  address: z
    .string()
    .min(6, "Address must be at least 6 characters long")
    .max(256, "Address must be a maximum of 256 characters"),
  phoneNumber: z
    .string()
    .min(6, "Phone number must be at least 6 characters long")
    .max(12, "Phone number must be a maximum of 12 characters"),
  subscribed: z.string()
});
