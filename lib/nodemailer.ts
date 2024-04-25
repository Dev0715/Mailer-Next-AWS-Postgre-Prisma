"use server";

import * as nodemailer from "nodemailer";
import sesClient from "./ses";

export const transporter = nodemailer.createTransport({
  SES: sesClient
});
