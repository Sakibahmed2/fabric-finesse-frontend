import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useTheme } from "@mui/material/styles";

interface LineChartStatisticsProps {
  data?: number[];
  labels?: string[];
}

export default function LineChartStatistics({ data, labels }: LineChartStatisticsProps) {
  const theme = useTheme();

  // Default data if none provided
  const chartData = data || [2, 5.5, 2, 8.5, 1.5, 5, 7, 9, 11, 8, 12, 10];
  const chartLabels = labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <LineChart
      xAxis={[{
        data: chartLabels,
        scaleType: 'point',
        label: 'Month'
      }]}
      series={[
        {
          data: chartData,
          area: true,
          color: theme.palette.primary.main,
          label: 'Revenue ($)',
          showMark: true,
        },
      ]}
      height={400}
      margin={{ left: 80, right: 20, top: 20, bottom: 40 }}
      grid={{ vertical: true, horizontal: true }}
      sx={{
        '& .MuiAreaElement-root': {
          fill: `url(#gradient)`,
        },
      }}
    >
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
          <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity={0.05} />
        </linearGradient>
      </defs>
    </LineChart>
  );
}
