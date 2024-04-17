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
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { FilterType } from "@/shared/filter-type";
import { Button } from "@/components/ui/button";

type PropsType = {
  filter: FilterType;
  onConditionChange: (value: string) => void;
};

export const DateCondition = ({ filter, onConditionChange }: PropsType) => {
  return (
    <div className="flex items-center gap-x-6">
      <Select defaultValue="is-after" onValueChange={onConditionChange}>
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !filter.value && "text-muted-foreground"
            )}
          >
            {filter.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
