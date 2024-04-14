export type Customer = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  birthday: string;
  tags: string[];
  subscribed: boolean;
  contactRating: number;
  created: string;
  lastChanged: string;
};

export interface NewSubscriber {
  ownerEmail: string;
  customerEmail: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  birthday: string;
  tags: string[];
  subscribed: boolean;
  contactRating?: number;
  created?: string;
  lastChanged?: string;
}
