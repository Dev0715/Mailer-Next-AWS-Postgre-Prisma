import { Filter } from "@/shared/filter-type";
import {
  isTypeOfDate,
  isTypeOfString,
  isTypeOfSubscribed,
  isTypeOfTags
} from "./filter-customer";

interface Customer {
  [key: string]: any;
}

const isFiltered = (customer: Customer, filters: Filter[]) => {
  for (let i = 0; i < filters.length; i++) {
    const attribute = filters[i].attribute;
    const condition = filters[i].condition;
    const value = filters[i].condition;

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
    }
    if (isTypeOfString(attribute)) {
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
