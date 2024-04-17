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
} from "@/lib/filter-customer";
import { Button } from "../ui/button";
import { FilterType } from "@/shared/filter-type";
import { StringCondition } from "./condition-tags/string-condition";
import { SubscribedCondition } from "./condition-tags/subscribe-condition";
import { DateCondition } from "./condition-tags/date-condition";
import { TagsCondition } from "./condition-tags/tag-condition";

type PropsType = {
  filter: FilterType;
  onAttributeChange: (value: string) => void;
  onConditionChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onFilterDelete: () => void;
};

export const FilterBar = ({
  filter,
  onAttributeChange,
  onConditionChange,
  onValueChange,
  onFilterDelete
}: PropsType) => {
  return (
    <main className="w-full flex items-center justify-between px-6 py-4 border rounded-none">
      <div className="flex items-center gap-x-6">
        <Select value={filter.attribute} onValueChange={onAttributeChange}>
          <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
            <SelectValue placeholder="Select a filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Select a Key</SelectLabel> */}
              {filterAttributes.map((attribute, index) => (
                <SelectItem key={attribute.value} value={attribute.value}>
                  {attribute.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {isTypeOfSubscribed(filter.attribute) ? (
          <SubscribedCondition
            filter={filter}
            onConditionChange={onConditionChange}
            onValueChange={onValueChange}
          />
        ) : isTypeOfDate(filter.attribute) ? (
          <DateCondition
            filter={filter}
            onConditionChange={onConditionChange}
          />
        ) : isTypeOfTags(filter.attribute) ? (
          <TagsCondition
            filter={filter}
            onConditionChange={onConditionChange}
          />
        ) : isTypeOfString(filter.attribute) ? (
          <StringCondition
            filter={filter}
            onConditionChange={onConditionChange}
          />
        ) : null}
      </div>
      <Button variant="ghost">
        <p className="text-red-700 font-semibold" onClick={onFilterDelete}>
          Delete
        </p>
      </Button>
    </main>
  );
};
