import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  filterAttributes,
  isTypeOfDate,
  isTypeOfSubscribed,
  isTypeOfTags
} from "@/lib/filter-customer";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaClosedCaptioning } from "react-icons/fa";

const TagsCondition = () => {
  return (
    <div className="flex gap-x-6">
      <Select>
        <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
          <SelectValue placeholder="Select a condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Select a Condition</SelectLabel> */}
            <SelectItem value="contains">Contains</SelectItem>
            <SelectItem value="not-contains">Doesn't contain</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input />
    </div>
  );
};

const StringCondition = () => {
  return (
    <Select>
      <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
        <SelectValue placeholder="Select a condition" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Select a Condition</SelectLabel> */}
          <SelectItem value="contains">Contains</SelectItem>
          <SelectItem value="not-contains">Doesn't contain</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const DateCondition = () => {
  return (
    <Select>
      <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
        <SelectValue placeholder="Select a condition" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Select a Condition</SelectLabel> */}
          <SelectItem value="is-after">Is After</SelectItem>
          <SelectItem value="is-before">Is Before</SelectItem>
          <SelectItem value="is">Is</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const SubscribedCondition = () => {
  return (
    <Select>
      <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
        <SelectValue placeholder="Select a condition" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Select a Condition</SelectLabel> */}
          <SelectItem value="is">Subscribed</SelectItem>
          <SelectItem value="is-not">Unsubscribed</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const FilterBar = () => {
  const [attribute, setAttribute] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const onAttributeChange = (value: string) => {
    setAttribute(value);
  };

  return (
    <main className="w-full flex items-center justify-between px-6 py-4 border rounded-none">
      <div className="flex items-center gap-x-6">
        <Select onValueChange={onAttributeChange}>
          <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
            <SelectValue placeholder="Select or search a filter" />
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
        {isTypeOfSubscribed(attribute) ? (
          <SubscribedCondition />
        ) : isTypeOfDate(attribute) ? (
          <DateCondition />
        ) : isTypeOfTags(attribute) ? (
          <TagsCondition />
        ) : (
          <StringCondition />
        )}
      </div>
      <Button variant="ghost">
        <p className="text-red-700 font-semibold">Delete</p>
      </Button>
    </main>
  );
};
