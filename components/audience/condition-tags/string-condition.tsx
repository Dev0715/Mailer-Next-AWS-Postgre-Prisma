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
  onCondtionChange: (value: string) => void;
};

export const StringCondition = () => {
  return (
    <Select onValueChange={}>
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
