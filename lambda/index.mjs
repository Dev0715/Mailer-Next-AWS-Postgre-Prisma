import axios from "axios";
import { SESClient } from "@aws-sdk/client-ses";
import { SendEmailCommand } from "@aws-sdk/client-ses";

const url_api_get_campaign = "https://mailmanjs-git.vercel.app/api/campaign/";

export const handler = async (event, context) => {
  const campaignId = event.campaignId;
  const url = url_api_get_campaign + campaignId;

  const response = await axios.get(url);
  if (!response) {
    // Set failed flag on db
  }

  const campaign = response.data;
  console.log(campaign);

  const sesClient = new SESClient();
  const command = new SendEmailCommand({
    Source: "malachi.uudev@gmail.com",
    Destination: {
      ToAddresses: ["malachi.uudev@gmail.com"]
    },
    Message: {
      Subject: {
        Data: "Hi There!"
      },
      Body: {
        Html: {
          Data: "<p>Hi There!</p>"
        }
      }
    }
  });
  const res = await sesClient.send(command);
};
