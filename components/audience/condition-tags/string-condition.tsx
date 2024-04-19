import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Filter } from "@/shared/filter-type";

type PropsType = {
  disabled?: boolean;
  filter: Filter;
  onConditionChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
};

export const StringCondition = ({
  disabled,
  filter,
  onConditionChange,
  onValueChange
}: PropsType) => {
  return (
    <div className="flex items-center gap-x-6">
      <Select
        disabled={disabled}
        value={filter.condition}
        onValueChange={onConditionChange}
      >
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
      <Input
        disabled={disabled}
        placeholder="Enter a value"
        className="w-[240px] px-4 rounded-full"
        value={filter.value}
        onChange={
          onValueChange
            ? (event) => onValueChange(event.target.value)
            : undefined
        }
      />
    </div>
  );
};
