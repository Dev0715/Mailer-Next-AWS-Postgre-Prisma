"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AreaChartPlot from "@/components/utils/areachart-plot";
import { StatisticsCard } from "@/components/utils/statistics-card";
import { getNumbersOfSubscribersByCondition } from "@/data/audience/count-subscribers-condition";
import { getAllCampaignsForStatistics } from "@/data/campaign/campaigns-for-statistics";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

const Blue = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-blue-700">{children}</span>;
};

const Strong = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-semibold">{children}</span>;
};

const AudiencePage = () => {
  const user = useCurrentUser();

  const [totalNumber, setTotalNumber] = useState<number>(0);
  const [lastNumber, setLastNumber] = useState<number>(0);
  const [validatedNumber, setValidatedNumber] = useState<number>(0);

  useEffect(() => {
    // getNumbersOfSubscribersByCondition().then((numbers) => {
    //   setTotalNumber(numbers || 0);
    // });
    // getNumbersOf4WeeksAgo().then((numbers) => {
    //   setLastNumber(numbers || 0);
    // });
    // getNumbersOfValidated().then((numbers) => {
    //   setValidatedNumber(numbers || 0);
    // });
  }, []);

  const getStatistics = async () => {
    getAllCampaignsForStatistics(user?.email as string).then((campaigns) => {
      console.log(campaigns);
    });
  };

  const getNumbersOf4WeeksAgo = async () => {
    const conditionDate = new Date();
    conditionDate.setDate(conditionDate.getDate() - 7 * 4);

    const condition = {
      where: {
        created: { lt: conditionDate }
      }
    };

    const lastNumber = await getNumbersOfSubscribersByCondition(condition);
    return lastNumber || 0;
  };

  const getNumbersOfValidated = async () => {
    const condition = {
      where: {
        validated: true
      }
    };

    const validatedNumber = await getNumbersOfSubscribersByCondition(condition);
    return validatedNumber || 0;
  };

  return (
    <main className="w-5/6 flex flex-col gap-y-6 py-6">
      <div className="flex flex-col gap-y-2">
        <p className="text-3xl text-green-700 font-semibold">
          Audience Dashboard
        </p>
        <p className="text-xl">
          Your audience has{" "}
          <Blue>
            <Strong>{totalNumber}</Strong>{" "}
          </Blue>{" "}
          contacts.{" "}
          <Blue>
            <Strong>{validatedNumber}</Strong>
          </Blue>{" "}
          of these are validated.
        </p>
      </div>

      <div className="w-full flex gap-x-6">
        <StatisticsCard
          title="Subscribers"
          newValue={totalNumber}
          lastValue={lastNumber}
        />
        <StatisticsCard
          title="Open Rate"
          newValue={totalNumber}
          lastValue={lastNumber}
        />
        <StatisticsCard
          title="Unsubscribe Rate"
          newValue={totalNumber}
          lastValue={lastNumber}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Recent Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[480px]">
            <AreaChartPlot />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default AudiencePage;
