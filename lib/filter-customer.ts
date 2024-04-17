import { FilterType } from "@/shared/filter-type";

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

export const checkFilters = (filters: FilterType[]) => {
  filters.map((filter, index) => {
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
      if (existingIndex !== -1 && existingIndex < index) {
        return "There are duplicated filters, Remove or Edit one before save them";
      }
    }
  });
  return "";
};
