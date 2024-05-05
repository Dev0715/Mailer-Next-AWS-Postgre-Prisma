import { SchedulerClient } from "@aws-sdk/client-scheduler";

const schedulerClient = new SchedulerClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  },
  region: process.env.AWS_REGION as string
});

export default schedulerClient;
