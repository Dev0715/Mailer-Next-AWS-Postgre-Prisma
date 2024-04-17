import { FaCheck, FaFilter, FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { FilterBar } from "./filter-bar";
import { useEffect, useState } from "react";
import { getUserByEmail } from "@/data/user/user-by-email";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FilterType } from "@/shared/filter-type";
import { defaultConditionOfAttribute } from "@/lib/filter-customer";

const AddSement = () => {
  const user = useCurrentUser();
  const [storedTags, setStoredTags] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterType[]>([
    { attribute: "", condition: "", value: "" }
  ]);

  useEffect(() => {
    getUserByEmail(user?.email as string).then((res) => {
      if (res && res.tags) {
        setStoredTags(res.tags);
      }
    });
  }, []);

  const onAddFilter = () => {
    setFilters((prev) => [
      ...prev,
      { attribute: "", condition: "", value: "" }
    ]);
  };

  const onFilterAttributeChange = (index: number, value: string) => {
    const newFilters = [...filters];
    const condition = defaultConditionOfAttribute(value);
    newFilters[index] = { attribute: value, condition, value: "" };
    setFilters(newFilters);
  };

  const onFilterConditionChange = (index: number, value: string) => {
    const newFilters = [...filters];
    newFilters[index].condition = value;
    setFilters(newFilters);
  };

  const onFilterValueChange = (index: number, value: string) => {
    const newFilters = [...filters];
    newFilters[index].value = value;
    setFilters(newFilters);
  };

  const onFilterDelete = (index: number) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  return (
    <main className="w-full flex flex-col gap-y-4">
      <p className="text-xl font-semibold">Regular Segment Builder</p>
      <div className="flex items-center gap-2">
        <FaFilter />
        Segment Filters
      </div>
      <div className="flex flex-col gap-y-4">
        {filters.map((filter, index) => (
          <FilterBar
            filter={filter}
            storedTags={storedTags}
            onAttributeChange={(value: string) =>
              onFilterAttributeChange(index, value)
            }
            onConditionChange={(value: string) =>
              onFilterConditionChange(index, value)
            }
            onValueChange={(value: string) => onFilterValueChange(index, value)}
            onFilterDelete={() => onFilterDelete(index)}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Button
          onClick={onAddFilter}
          variant={"outline"}
          className="w-48 flex items-center gap-x-2 border-green-700"
        >
          <FaPlus />
          Add Filter
        </Button>
        <Button
          onClick={onAddFilter}
          className="w-48 flex items-center gap-x-2 border-green-700"
        >
          <FaCheck />
          Register
        </Button>
      </div>
    </main>
  );
};

export default AddSement;
