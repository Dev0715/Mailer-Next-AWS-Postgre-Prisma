import { SESClient } from "@aws-sdk/client-ses";
import { SendEmailCommand } from "@aws-sdk/client-ses";

import axios from "axios";

const url_api_campaign = "https://mailmanjs-git.vercel.app/api/campaign/";
const url_api_unsub = "https://mailmanjs-git.vercel.app/unsubscribe/";

export const handler = async (event, context) => {
  const campaignId = event.campaignId;
  const url_campaign = url_api_campaign + campaignId;

  const response = await axios.get(url_campaign);
  if (!response) {
    // Set failed flag on db
  }

  const campaign = response.data;

  const from = campaign.from;
  const customers = campaign.customers;
  const subject = campaign.subject;
  const html = campaign.html;

  const sesClient = new SESClient();

  // for (let i = 0; i < customers.length; i++) {
};
