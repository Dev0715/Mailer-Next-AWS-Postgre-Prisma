import { FaFilter, FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { FilterBar } from "./filter-bar";
import { useEffect, useState } from "react";
import { getUserByEmail } from "@/data/user/user-by-email";
import { useCurrentUser } from "@/hooks/use-current-user";

type FilterType = {
  attribue: string;
  condition: string;
  value: string;
};

const AddSement = () => {
  const user = useCurrentUser();
  const [storedTags, setStoredTags] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterType[]>([]);

  useEffect(() => {
    getUserByEmail(user?.email as string).then((res) => {
      if (res && res.tags) {
        setStoredTags(res.tags);
      }
    });
  }, []);

  const onAddFilter = () => {
    setFilters((prev) => [...prev, { attribue: "", condition: "", value: "" }]);
  };

  return (
    <main className="w-full">
      <p className="text-xl font-semibold">Regular Segment Builder</p>
      <div className="flex items-center gap-2">
        <FaFilter />
        Segment Filters
      </div>

      <FilterBar />
      <Button onClick={onAddFilter} className="flex items-center gap-2">
        <FaPlus />
        Add Filter
      </Button>
    </main>
  );
};

export default AddSement;
