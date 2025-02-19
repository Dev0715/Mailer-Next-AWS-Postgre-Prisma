import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  filterAttributes,
  isTypeOfDate,
  isTypeOfString,
  isTypeOfSubscribed,
  isTypeOfTags
} from "@/shared/functions/filter-customer";
import { Button } from "../ui/button";
import { Filter } from "@/shared/types/filter";
import { StringCondition } from "./condition-tags/string-condition";
import { SubscribedCondition } from "./condition-tags/subscribe-condition";
import { DateCondition } from "./condition-tags/date-condition";
import { TagsCondition } from "./condition-tags/tag-condition";

type PropsType = {
  disabled?: boolean;
  filter: Filter;
  storedTags: string[];
  onAttributeChange?: (value: string) => void;
  onConditionChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
  onFilterDelete?: () => void;
};

export const FilterBar = ({
  disabled,
  filter,
  storedTags,
  onAttributeChange,
  onConditionChange,
  onValueChange,
  onFilterDelete
}: PropsType) => {
  return (
    <main className="w-full flex items-center justify-between px-6 py-4 border rounded-none">
      <div className="w-full flex items-center gap-x-6">
        <Select
          disabled={disabled}
          value={filter.attribute}
          onValueChange={onAttributeChange}
        >
          <SelectTrigger className="min-w-[240px] w-60 px-4 bg-gray-200 rounded-full">
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Select a Key</SelectLabel> */}
              {filterAttributes.map((attribute) => (
                <SelectItem key={attribute.value} value={attribute.value}>
                  {attribute.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {isTypeOfTags(filter.attribute) ? (
          <TagsCondition
            disabled={disabled}
            filter={filter}
            storedTags={storedTags}
            onConditionChange={onConditionChange}
            onValueChange={onValueChange}
          />
        ) : isTypeOfSubscribed(filter.attribute) ? (
          <SubscribedCondition
            disabled={disabled}
            filter={filter}
            onConditionChange={onConditionChange}
            onValueChange={onValueChange}
          />
        ) : isTypeOfDate(filter.attribute) ? (
          <DateCondition
            disabled={disabled}
            filter={filter}
            onConditionChange={onConditionChange}
            onValueChange={onValueChange}
          />
        ) : isTypeOfString(filter.attribute) ? (
          <StringCondition
            disabled={disabled}
            filter={filter}
            onConditionChange={onConditionChange}
            onValueChange={onValueChange}
          />
        ) : null}
      </div>
      {!disabled ? (
        <Button variant="ghost">
          <p className="text-red-700 font-semibold" onClick={onFilterDelete}>
            Delete
          </p>
        </Button>
      ) : null}
    </main>
  );
};
