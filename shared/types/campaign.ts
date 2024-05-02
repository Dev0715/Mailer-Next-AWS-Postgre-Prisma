export type CampaignState =
  | "draft"
  | "scheduled"
  | "sending"
  | "sent"
  | "failed";

export type Campaign = {
  userEmail: string;
  campaignId: string;
  title: string;
  state: CampaignState;
  lastUpdated: Date;

  to?: {
    segmentId: string;
    segmentTitle: string;
    totalNumber?: number;
  };
  from?: {
    name: string;
    email: string;
  };
  subject?: {
    subject: string;
    preview?: string;
  };
  time?: {
    instant: boolean;
    date: Date;
  };
  email?: {
    design: any;
    html: string;
  };

  openedEmails?: string[];
  unsubEmails?: string[];
  bouncedEmails?: string[];
};
