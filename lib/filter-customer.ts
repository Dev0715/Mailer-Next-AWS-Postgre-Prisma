export const filterKeys = [
  "customerEmail",
  "firstName",
  "lastName",
  "address",
  "phoneNumber",
  "birthday",
  "tags",
  "subscribed",
  "contactRating",
  "created",
  "lastChanged"
];

export const filterKeyNames = [
  "Email",
  "First Name",
  "Last Name",
  "Address",
  "Phone Number",
  "Birthday",
  "Tags",
  "Subscribed",
  "Contact Rating",
  "Created",
  "Last Changed"
];

export const isTypeOfArray = (keyName: string) => keyName === "tags";

export const isTypeOfBoolean = (keyName: string) => keyName === "subscribed";

export const isTypeOfDate = (keyName: string) =>
  keyName === "birthday" || keyName === "created" || keyName === "lastChanged";
