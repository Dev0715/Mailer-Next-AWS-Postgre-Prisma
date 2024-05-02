import { SESClient } from "@aws-sdk/client-ses";
import { SendEmailCommand } from "@aws-sdk/client-ses";

import axios from "axios";

const url_api_campaign = "https://mailmanjs-git.vercel.app/api/campaign/";
const url_api_unsub = "https://mailmanjs-git.vercel.app/unsubscribe/";

const symbol_unsub = "##!!UNSUBSCRIBE!!##";
const symbol_open = "##!!OPEN!!##";
const symbol_body = "</body>";

const tag_open =
  '<img src="https://mailmanjs-git.vercel.app/api/open/##!!OPEN!!##" height="1" width="1" alt="" class="CToWUd" data-bit="iit"></body>';

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
  for (let i = 0; i < 1; i++) {
    const _subEmail = customers[i];

    const _unsub_url = url_api_unsub + campaignId + "/" + _subEmail;
    const _html_unsub = html.replace(symbol_unsub, _unsub_url);

    const _open_url = campaignId + "/" + _subEmail;
    const _tag_open = tag_open.replace(symbol_open, _open_url);

    const _html = _html_unsub.replace(symbol_body, _tag_open);
  }
};
