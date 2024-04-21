import { SESClient } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  },
  region: process.env.AWS_REGION as string
});

export default sesClient;
