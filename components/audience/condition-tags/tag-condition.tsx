import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Filter } from "@/shared/types/filter";

type PropsType = {
  disabled?: boolean;
  filter: Filter;
  storedTags: string[];
  onConditionChange?: (value: string) => void;
  onValueChange?: (value: string) => void;
};

export const TagsCondition = ({
  disabled,
  filter,
  storedTags,
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
            <SelectItem value="contains">Contains</SelectItem>
            <SelectItem value="not-contains">Doesn't contain</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        disabled={disabled}
        value={filter.value}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {storedTags.map((tag) => (
              <SelectItem value={tag}>{tag}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
