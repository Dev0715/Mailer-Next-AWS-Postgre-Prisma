import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { FilterType } from "@/shared/filter-type";

type PropsType = {
  filter: FilterType;
  onConditionChange: (value: string) => void;
  onValueChange: (value: string) => void;
};

export const SubscribedCondition = ({
  filter,
  onConditionChange,
  onValueChange
}: PropsType) => {
  return (
    <div className="flex items-center gap-x-6">
      <Select value={filter.condition} onValueChange={onConditionChange}>
        <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
          <SelectValue placeholder="Select a condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="is">is</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={filter.value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="subscribed">true</SelectItem>
            <SelectItem value="unsubscribed">false</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
