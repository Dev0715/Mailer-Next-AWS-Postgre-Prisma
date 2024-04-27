import { FaCheck, FaFilter, FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import { FilterBar } from "./filter-bar";
import { useEffect, useState } from "react";
import { getUserByEmail } from "@/data/user/user-by-email";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Filter } from "@/shared/types/filter/";
import {
  checkFilters,
  defaultConditionOfAttribute
} from "@/shared/feature/filter-customer";
import { FormError } from "../utils/form-error";
import { Input } from "../ui/input";
import { Segment, SegmentAddition } from "@/shared/types/segment-type";

type Props = {
  onSegmentEdited: ({ title, description, filters }: SegmentAddition) => void;
  editingSegment: Segment;
};

const EditSegment = ({ onSegmentEdited, editingSegment }: Props) => {
  const user = useCurrentUser();

  const [error, setError] = useState("");
  const [storedTags, setStoredTags] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filter[]>(editingSegment.filters);
  const [title, setTitle] = useState<string>(editingSegment.title);
  const [description, setDescription] = useState<string>(
    editingSegment.description
  );

  useEffect(() => {
    getUserByEmail(user?.email as string).then((res) => {
      if (res && res.tags) {
        setStoredTags(res.tags);
      }
    });
  }, []);

  const onSaveSegment = () => {
    const error = checkFilters(filters, title, description);
    if (error === "") {
      onSegmentEdited({ title, description, filters });
    } else {
      setError(error);
    }
  };

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
      <p className="text-xl font-semibold">Edit Segment: {title}</p>
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
      <FormError message={error} />
      <div className="flex items-center justify-between mt-2">
        <Button
          onClick={onAddFilter}
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

export default EditSegment;
