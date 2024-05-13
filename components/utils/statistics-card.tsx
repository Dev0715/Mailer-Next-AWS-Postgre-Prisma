import { useMemo } from "react";
import { Card } from "../ui/card";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { Badge } from "../ui/badge";

type Props = {
  title: string;
  newValue: number;
  lastValue: number;
};

export const StatisticsCard = ({ title, newValue, lastValue }: Props) => {
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

  const isUp = useMemo(() => {
    return increasedPercent >= 0;
  }, [increasedPercent]);

  return (
    <Card className="w-[400px] flex items-center justify-between px-8 py-4">
      <div className="flex flex-col gap-y-2">
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-lg font-semibold">{newValue}</p>
        <p className="text-base text-gray-700">
          from {lastValue} (last 4 weeks)
        </p>
      </div>
      <Badge
        variant={isUp ? "default" : "secondary"}
        className="flex gap-x-1 py-1 rounded-full"
      >
        {isUp ? <FaArrowUp /> : <FaArrowDown />} {increasedPercent}%
      </Badge>
    </Card>
  );
};
