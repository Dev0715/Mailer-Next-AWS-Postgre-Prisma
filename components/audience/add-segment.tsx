import { FaFilter, FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { FilterBar } from "./filter-bar";
import { useEffect, useState } from "react";
import { getUserByEmail } from "@/data/user/user-by-email";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FilterType } from "@/shared/filter-type";

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

  const onFilterAttributeChange = (index: number) => {};

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
            onAttributeChange={() => onFilterAttributeChange(index)}
            onFilterDelete={() => onFilterDelete(index)}
          />
        ))}
      </div>
      <Button onClick={onAddFilter} className="w-48 flex items-center gap-2">
        <FaPlus />
        Add Filter
      </Button>
    </main>
  );
};

export default AddSement;
