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
    const filter = filters[i];
    if (isTypeOfTags(filter.attribute)) {
      if (
        filter.condition === "contains" &&
        !customer.tags.find((tag: string) => tag === filter.value)
      )
        return false;
      else if (
        filter.condition === "not-contains" &&
        customer.tags.find((tag: string) => tag === filter.value)
      )
        return false;
    } else if (isTypeOfSubscribed(filter.attribute)) {
      if (customer.subscribed !== filter.value) {
        return false;
      }
    } else if (isTypeOfDate(filter.attribute)) {
    }
    if (isTypeOfString(filter.attribute)) {
      if (
        filter.condition === "contains" &&
        !customer[filter.attribute].includes(filter.value)
      )
        return false;
      else if (
        filter.condition === "not-contains" &&
        customer[filter.attribute].includes(filter.value)
      )
        return false;
    }
  }
  return true;
};
