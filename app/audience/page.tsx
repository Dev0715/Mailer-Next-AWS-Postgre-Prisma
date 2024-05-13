"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AreaChartPlot, { ChartItem } from "@/components/utils/areachart-plot";
import { StatisticsCard } from "@/components/utils/statistics-card";
import { getNumbersOfSubscribersByCondition } from "@/data/audience/count-subscribers-condition";
import { getAllCampaignsForStatistics } from "@/data/campaign/campaigns-for-statistics";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getFirstDateOfMonthsAgo } from "@/shared/functions/get-date-months-ago";
import { getMonthYearStr } from "@/shared/functions/get-month-year-str";
import { useEffect, useState } from "react";

const Blue = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-blue-700">{children}</span>;
};

const Strong = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-semibold">{children}</span>;
};

const AudiencePage = () => {
  const user = useCurrentUser();

  const [validatedNumber, setValidatedNumber] = useState<number>(0);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const [lastNumber, setLastNumber] = useState<number>(0);
  const [chartData, setChartData] = useState<ChartItem[]>([]);

  useEffect(() => {
    getNumbersOfSubscribersByCondition().then((numbers) => {
      setTotalNumber(numbers || 0);
    });
    getNumbersOf4WeeksAgo().then((numbers) => {
      setLastNumber(numbers || 0);
    });
    getNumbersOfValidated().then((numbers) => {
      setValidatedNumber(numbers || 0);
    });
    getStatisticsForCampaigns();
  }, []);

  const getStatisticsForCampaigns = () => {
    const _chartData: ChartItem[] = [];
    [4, 3, 2, 1, 0].map((i) => {
      const _monthYear = getMonthYearStr(getFirstDateOfMonthsAgo(i));
      _chartData.push({
        month: _monthYear,
        Sent: 0,
        Opened: 0
      });
    });

    getAllCampaignsForStatistics(user?.email as string).then((campaigns) => {
      if (!campaigns) {
        return;
      }

      const _rate_last = {
        sent: 0,
        opened: 0,
        unsubscribed: 0
      };

      const _rate_new = {
        sent: 0,
        opened: 0,
        unsubscribed: 0
      };

      const date4WeeksAgo = new Date(new Date().getDate() - 7 * 4);

      campaigns.map((campaign) => {
        const _monthYear = getMonthYearStr(campaign.lastUpdated);

        const index = _chartData.findIndex((item) => item.month === _monthYear);
        if (index !== -1) {
          _chartData[index].Sent +=
            (campaign.to as { totalNumber?: number }).totalNumber || 0;
          _chartData[index].Opened += campaign.openedNumber || 0;
        }

        _rate_new.sent +=
          (campaign.to as { totalNumber?: number }).totalNumber || 0;
        _rate_new.opened += campaign.openedNumber || 0;
        _rate_new.unsubscribed += campaign.unsubedNumber || 0;

        if ((campaign.lastUpdated as Date) > date4WeeksAgo) {
          _rate_last.sent +=
            (campaign.to as { totalNumber?: number }).totalNumber || 0;
          _rate_last.opened += campaign.openedNumber || 0;
          _rate_last.unsubscribed += campaign.unsubedNumber || 0;
        }
      });

      setChartData(_chartData);
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
            <AreaChartPlot data={chartData} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default AudiencePage;
