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
};

export const DateCondition = ({ filter, onConditionChange }: PropsType) => {
  return (
    <Select onValueChange={onConditionChange}>
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
