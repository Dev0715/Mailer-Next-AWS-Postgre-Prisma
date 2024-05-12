import { FaCheck } from "react-icons/fa";
import { Button } from "../ui/button";
import { FilterBar } from "./filter-bar";
import { useEffect, useState } from "react";
import { getUserByEmail } from "@/data/user/user-by-email";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Spinner } from "@nextui-org/spinner";
import { Segment } from "@/shared/types/segment";
import { getNumbersOfSubscribersByCondition } from "@/data/audience/count-subscribers-condition";
import { getConditionFromFilters } from "@/shared/functions/condition-from-filters";

type Props = {
  segment: Segment;
  onFinish: () => void;
};

const MonitorSegment = ({ segment, onFinish }: Props) => {
  const user = useCurrentUser();
  const [storedTags, setStoredTags] = useState<string[]>([]);
  const [count, setCount] = useState<number>(-1);

  useEffect(() => {
    getUserByEmail(user?.email as string).then((res) => {
      if (res && res.tags) {
        setStoredTags(res.tags);
      }
    });

    const condition = getConditionFromFilters(segment.filters);
    getNumbersOfSubscribersByCondition(condition).then((_count) => {
      setCount(_count || 0);
    });
  }, []);

  return (
    <main className="w-full flex flex-col gap-y-4">
      <p className="text-xl font-semibold">{segment.title}</p>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">{segment.description}</div>
        <div className="flex items-center gap-x-2">
          <p>Total members in this segment: </p>
          {count === -1 ? (
            <Spinner size="sm" />
          ) : (
            <span className="text-xl font-semibold">{count}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        {segment.filters.map((filter) => (
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
