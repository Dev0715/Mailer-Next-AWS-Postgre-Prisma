"use server";

import * as nodemailer from "nodemailer";
import sesClient from "./ses";

// # Not working #
export const transporter = nodemailer.createTransport({
  SES: sesClient
});
