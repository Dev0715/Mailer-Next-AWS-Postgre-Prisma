import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { filterAttributes } from "@/lib/filter-customer";

export const FilterBar = () => {
  return (
    <main className="w-full flex items-center gap-x-6 px-6 py-4 border rounded-none">
      <Select>
        <SelectTrigger className="w-[240px] px-4 bg-gray-200 rounded-full">
          <SelectValue placeholder="Select or search a filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a Key</SelectLabel>
            {filterAttributes.map((attribute, index) => (
              <SelectItem key={attribute.value} value={attribute.value}>
                {attribute.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </main>
  );
};
