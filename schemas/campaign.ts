import { z } from "zod";

export const CampaignFromSchema = z.object({
  name: z
    .string()
    .min(6, "Name should be at least 6 characters long")
    .max(32, "Name should be a maximum of 32 characters"),
  email: z.string().email({ message: "Please enter a valid email" })
});

export const CampaignSubjectSchema = z.object({
  subject: z
    .string()
    .min(6, "Subject should be at least 6 characters long")
    .max(72, "Subject should be a maximum of 72 characters"),
  preview: z.string().optional()
});

export const CampaignTimeSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required."
  })
});
