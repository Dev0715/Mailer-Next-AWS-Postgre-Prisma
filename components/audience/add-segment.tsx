import { FaFilter, FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { FilterBar } from "./filter-bar";

const AddSement = () => {
  return (
    <main className="w-full">
      <p className="text-xl font-semibold">Regular Segment Builder</p>
      <div className="flex items-center gap-2">
        <FaFilter />
        Segment Filters
      </div>
      <FilterBar />
      <Button className="flex items-center gap-2">
        <FaPlus />
        Add Filter
      </Button>
    </main>
  );
};

export default AddSement;
