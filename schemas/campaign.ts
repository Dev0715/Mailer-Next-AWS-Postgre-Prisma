import { z } from "zod";

export const CampaignFromSchema = z.object({
  name: z
    .string()
    .min(6, "Name should be at least 6 characters long")
    .max(32, "Name should be a maximum of 32 characters"),
  email: z.string().email({ message: "Please enter a valid email" })
});
