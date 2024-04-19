import { FaCheck, FaFilter, FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { FilterBar } from "./filter-bar";
import { useEffect, useState } from "react";
import { getUserByEmail } from "@/data/user/user-by-email";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FilterType } from "@/shared/filter-type";
import { FormError } from "../utils/form-error";
import { Input } from "../ui/input";
import { Segment, SegmentAddition } from "@/shared/segment-type";

type Props = {
  segment: Segment;
};

const MonitorSegment = ({ segment }: Props) => {
  const user = useCurrentUser();

  const [filters, setFilters] = useState<FilterType[]>(segment.filters);
  const [title, setTitle] = useState<string>(segment.title);
  const [description, setDescription] = useState<string>(segment.description);

  return (
    <main className="w-full flex flex-col gap-y-4">
      <p className="text-xl font-semibold">Edit Segment: {title}</p>
      <div className="flex items-center gap-2">
        <FaFilter />
        Segment Filters
      </div>
      <div className="flex flex-col gap-y-4">
        {filters.map((filter, index) => (
          <FilterBar filter={filter} storedTags={storedTags} />
        ))}
      </div>
      <FormError message={error} />
      <div className="flex items-center justify-between mt-2">
        <Button
          variant={"outline"}
          className="w-48 flex items-center gap-x-2 border-green-700"
        >
          <FaPlus />
          Add Filter
        </Button>
        <div className="flex items-center gap-x-4">
          <p>Title</p>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <p>Description</p>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <Button
            onClick={onSaveSegment}
            className="min-w-48 flex items-center gap-x-2 border-green-700"
          >
            <FaCheck />
            Save
          </Button>
        </div>
      </div>
    </main>
  );
};

export default MonitorSegment;
