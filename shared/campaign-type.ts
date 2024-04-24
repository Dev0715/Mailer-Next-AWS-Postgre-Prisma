export type Campaign = {
  userEmail: string;
  campaignId: string;
  title: string;

  to?: string;
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
};
