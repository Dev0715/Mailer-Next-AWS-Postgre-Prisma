export const filterKeys = [
  { value: "customerEmail", name: "Email" },
  { value: "firstName", name: "First Name" },
  { value: "lastName", name: "Last Name" },
  { value: "address", name: "Address" },
  { value: "phoneNumber", name: "Phone Number" },
  { value: "birthday", name: "Birthday" },
  { value: "tags", name: "Tags" },
  { value: "subscribed", name: "Subscribed" },
  { value: "contactRating", name: "Contact Rating" },
  { value: "created", name: "Created" },
  { value: "lastChanged", name: "Last Changed" }
];

export const isTypeOfArray = (keyName: string) => keyName === "tags";

export const isTypeOfBoolean = (keyName: string) => keyName === "subscribed";

export const isTypeOfDate = (keyName: string) =>
  keyName === "birthday" || keyName === "created" || keyName === "lastChanged";
