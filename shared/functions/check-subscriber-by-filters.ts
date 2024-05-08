import { Filter } from "@/shared/types/filter";
import {
  isTypeOfDate,
  isTypeOfString,
  isTypeOfSubscribed,
  isTypeOfTags
} from "./filter-customer";

interface Customer {
  [key: string]: any;
}

export const isFiltered = (customer: Customer, filters: Filter[]) => {
  for (let i = 0; i < filters.length; i++) {
    const attribute = filters[i].attribute;
    const condition = filters[i].condition;
    const value = filters[i].value;

    if (isTypeOfTags(attribute)) {
      if (
        condition === "contains" &&
        !customer.tags.find((tag: string) => tag === value)
      )
        return false;
      else if (
        condition === "not-contains" &&
        customer.tags.find((tag: string) => tag === value)
      )
        return false;
    } else if (isTypeOfSubscribed(attribute)) {
      if (customer.subscribed !== value) {
        return false;
      }
    } else if (isTypeOfDate(attribute)) {
      const customerDate = new Date(customer[attribute]);
      const conditionDate = new Date(value);
      if (condition === "is-after" && customerDate < conditionDate)
        return false;
      else if (condition === "is-before" && customerDate > conditionDate)
        return false;
      else if (condition === "is") {
        if (
          customerDate.getFullYear() !== conditionDate.getFullYear() ||
          customerDate.getMonth() !== conditionDate.getMonth() ||
          customerDate.getDate() !== conditionDate.getDate()
        )
          return false;
      }
    } else if (isTypeOfString(attribute)) {
      if (condition === "contains" && !customer[attribute].includes(value))
        return false;
      else if (
        condition === "not-contains" &&
        customer[attribute].includes(value)
      )
        return false;
    }
  }
  return true;
};
