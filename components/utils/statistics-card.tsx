import { useMemo } from "react";
import { Card } from "../ui/card";

type Props = {
  newValue: number;
  lastValue: number;
};

export const StatisticsCard = ({ newValue, lastValue }: Props) => {
  const increasedPercent = useMemo(() => {
    if (lastValue === 0) {
      if (newValue === 0) {
        return 0;
      } else {
        return 100;
      }
    }

    return ((newValue - lastValue) * 100) / lastValue;
  }, [newValue, lastValue]);

  return (
    <Card className="w-[400px] flex items-center justify-between px-8 py-4">
      <div className="flex flex-col gap-y-2">
        <p className="text-xl font-semibold">Subscribers</p>
        <p className="text-lg font-semibold">{newValue}</p>
        <p className="text-base text-gray-700">
          from {lastValue} (last 4 weeks)
        </p>
      </div>
      <Badge variant="default" className="flex gap-x-1 py-1 rounded-full">
        <FaArrowUp /> {increasedPercent}%
      </Badge>
    </Card>
  );
};
