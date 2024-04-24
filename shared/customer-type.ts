export type Customer = {
  userEmail: string;
  subscriberEmail: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  birthday: string;
  tags?: string[];
  subscribed?: boolean;
  contactRating?: number;
  created?: string;
  lastChanged?: string;
};
