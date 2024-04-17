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
  storedTags: string[];
  onConditionChange: (value: string) => void;
  onValueChange: (value: string) => void;
};

export const TagsCondition = ({
  filter,
  storedTags,
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
            {/* <SelectLabel>Select a Condition</SelectLabel> */}
            <SelectItem value="contains">Contains</SelectItem>
            <SelectItem value="not-contains">Doesn't contain</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={filter.value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* <SelectLabel>Select a Condition</SelectLabel> */}
            {storedTags.map((tag) => (
              <SelectItem value={tag}>{tag}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
