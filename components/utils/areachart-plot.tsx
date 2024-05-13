import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const AreaChartPlot = () => {
  const data = [
    {
      month: "03",
      Sent: 400,
      Opened: 250
    },
    {
      month: "04",
      Sent: 0,
      Opened: 0
    },
    {
      month: "05",
      Sent: 400,
      Opened: 370
    },
    {
      month: "06",
      Sent: 200,
      Opened: 100
    },
    {
      month: "07",
      Sent: 350,
      Opened: 250
    }
  ];

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Sent"
            stroke="#ffc658"
            fill="#ffc658"
          />
          <Area
            type="monotone"
            dataKey="Opened"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default AreaChartPlot;
