import { FaCheck } from "react-icons/fa";
import { Button } from "../ui/button";
import { FilterBar } from "./filter-bar";
import { useEffect, useState } from "react";
import { getUserByEmail } from "@/data/user/user-by-email";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Segment } from "@/shared/segment-type";
import { getAllCustomersByEmail } from "@/data/audience/all-customers";
import { isFiltered } from "@/lib/segment";
import { Customer } from "@/shared/customer-type";

type Props = {
  segment: Segment;
  onFinish: () => void;
};

const MonitorSegment = ({ segment, onFinish }: Props) => {
  const user = useCurrentUser();
  const [storedTags, setStoredTags] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    getUserByEmail(user?.email as string).then((res) => {
      if (res && res.tags) {
        setStoredTags(res.tags);
      }
    });
    getAllCustomersByEmail(user?.email as string).then((res) => {
      if (res) {
        res.map((customer) => {
          if (isFiltered(customer, segment.filters)) {
            setCount((prev) => prev + 1);
          }
        });
      }
    });
  }, []);

  return (
    <main className="w-full flex flex-col gap-y-4">
      <p className="text-xl font-semibold">{segment.title}</p>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">{segment.description}</div>
        <p className="px-4">
          Total members in this segment:{" "}
          <span className="text-xl font-semibold">{count}</span>
        </p>
      </div>
      <div className="flex flex-col gap-y-4">
        {segment.filters.map((filter, index) => (
          <FilterBar disabled filter={filter} storedTags={storedTags} />
        ))}
      </div>
      <Button
        onClick={onFinish}
        className="w-48 flex items-center self-end gap-x-2 border-green-700"
      >
        <FaCheck />
        OK
      </Button>
    </main>
  );
};

export default MonitorSegment;
