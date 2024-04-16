export const filterAttributes = [
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

export const isTypeOfString = (keyName: string) => keyName !== "";

export const isTypeOfTags = (keyName: string) => keyName === "tags";

export const isTypeOfSubscribed = (keyName: string) => keyName === "subscribed";

export const isTypeOfDate = (keyName: string) => {
  return (
    keyName === "birthday" || keyName === "created" || keyName === "lastChanged"
  );
};
