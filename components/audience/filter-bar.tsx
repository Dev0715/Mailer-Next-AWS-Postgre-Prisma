import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { filterKeyNames, filterKeys } from "@/lib/filter-customer";

export const FilterBar = () => {
  return (
    <main className="w-full flex items-center gap-x-6 px-6 py-4 border rounded-full">
      <Select>
        <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
          <SelectValue placeholder="Select or search a filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a Key</SelectLabel>
            {filterKeys.map((key, index) => (
              <SelectItem key={key} value={key}>
                {filterKeyNames[index]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </main>
  );
};
