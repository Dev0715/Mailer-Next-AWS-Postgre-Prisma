export type Campaign = {
  userEmail: string;
  campaignId: string;
  title: string;

  to?: {
    segmentId: string;
    segmentTitle: string;
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
    date?: string;
  };
  email?: {
    design: any;
    html: string;
  };

  openedEmails?: string[];
  unsubEmails?: string[];
  bouncedEmails?: string[];
};
