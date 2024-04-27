import { Filter } from "@/shared/types/filter";

export const filterAttributes = [
  { value: "subscriberEmail", name: "Email" },
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

export const isTypeOfTags = (keyName: string) => keyName === "tags";

export const isTypeOfSubscribed = (keyName: string) => keyName === "subscribed";

export const isTypeOfDate = (keyName: string) => {
  return (
    keyName === "birthday" || keyName === "created" || keyName === "lastChanged"
  );
};

export const isTypeOfString = (keyName: string) => keyName !== "";

export const defaultConditionOfAttribute = (keyName: string) => {
  return isTypeOfTags(keyName)
    ? "contains"
    : isTypeOfSubscribed(keyName)
      ? "is"
      : isTypeOfDate(keyName)
        ? "is-after"
        : isTypeOfString(keyName)
          ? "contains"
          : "";
};

export const checkFilters = (
  filters: Filter[],
  title: string,
  description: string
) => {
  if (filters.length === 0) {
    return "There is a no filter, at least one filter is needed";
  }
  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];
    if (
      filter.attribute === "" ||
      filter.condition === "" ||
      filter.value === ""
    ) {
      return "There is a filter which has not been completed, Complete or Delete it";
    } else {
      const existingIndex = filters.findIndex(
        (oldFilter) =>
          oldFilter.attribute === filter.attribute &&
          oldFilter.condition === filter.condition &&
          oldFilter.value === filter.value
      );
      if (existingIndex !== -1 && existingIndex < i) {
        return "There are duplicated filters, Remove or Edit one before save them";
      }
    }
  }
  if (title === "" || description === "") {
    return "There should be title and description for this segment";
  }
  return "";
};
