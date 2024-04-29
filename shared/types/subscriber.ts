export type Subscriber = {
  id?: string;
  userEmail: string | null;
  subscriberEmail: string | null;
  firstName: string | null;
  lastName: string | null;
  address: string | null;
  phoneNumber: string | null;
  // birthday: string;
  birthday: Date | null;
  tags?: string[] | null;
  subscribed?: boolean | null;
  contactRating?: number | null;
  // created?: string;
  created?: Date | null;
  // lastChanged?: string;
  lastChanged?: Date | null;
};
