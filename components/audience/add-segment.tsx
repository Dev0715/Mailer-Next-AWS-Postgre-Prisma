import { FaFilter } from "react-icons/fa";

const AddSement = () => {
  return (
    <main className="w-full">
      <p className="text-xl font-semibold">Regular Segment Builder</p>
      <div className="flex items-center gap-2">
        <FaFilter />
        Segment Filters
      </div>
    </main>
  );
};

export default AddSement;
