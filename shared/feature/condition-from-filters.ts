import {
  isTypeOfDate,
  isTypeOfString,
  isTypeOfSubscribed,
  isTypeOfTags
} from "@/shared/feature/filter-customer";
import { Filter } from "../types/filter";

export const getConditionFromFilters = (filters: Filter[]) => {
  const _condition = { AND: {} };
  filters.forEach((filter: Filter) => {
    if (isTypeOfTags(filter.attribute)) {
      const _subCondition = { tags: { has: filter.value } };
      if (filter.condition === "not-contains") {
        _condition.AND = {
          ..._condition.AND,
          NOT: _subCondition
        };
      } else {
        _condition.AND = {
          ..._condition.AND,
          ..._subCondition
        };
      }
    } else if (isTypeOfSubscribed(filter.attribute)) {
      _condition.AND = {
        ..._condition.AND,
        subscribed: filter.value === "subscribed"
      };
    } else if (isTypeOfDate(filter.attribute)) {
      if (filter.condition === "is-after") {
        _condition.AND = {
          ..._condition.AND,
          [filter.attribute]: { gt: new Date(filter.value) }
        };
      } else if (filter.condition === "is-before") {
        _condition.AND = {
          ..._condition.AND,
          [filter.attribute]: { lt: new Date(filter.value) }
        };
      } else if (filter.condition === "is") {
        _condition.AND = {
          ..._condition.AND,
          [filter.attribute]: { equals: new Date(filter.value) }
        };
      }
    } else if (isTypeOfString(filter.attribute)) {
      const _subCondition = {
        [filter.attribute]: { contains: filter.value }
      };
      if (filter.condition === "not-contains") {
        _condition.AND = {
          ..._condition.AND,
          NOT: _subCondition
        };
      } else {
        _condition.AND = {
          ..._condition.AND,
          ..._subCondition
        };
      }
    }
  });
  if (filters.length === 1) {
    return {
      where: _condition.AND
    };
  } else {
    return {
      where: _condition
    };
  }
};
