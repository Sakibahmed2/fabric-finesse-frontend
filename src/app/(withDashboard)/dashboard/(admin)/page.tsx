"use client";

import { useGetAllOrdersQuery } from "@/redux/api/ordersApi";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

// mui icons
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LineChartStatistics from "@/components/Dashboard/LineChart/LineChartStatistics";
import { Gauge } from "@mui/x-charts/Gauge";

const AdminDashboardPage = () => {
  const { data, isLoading } = useGetAllOrdersQuery({});

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const orderData = data?.data;

  console.log(orderData);

  return (
    <div>
      <div className="border border-zinc-800 rounded-md py-10 px-10">
        <p className="text-2xl font-semibold">Statistics</p>

        <div className="mt-4 flex  items-center gap-48">
          <div className="flex items-center gap-4">
            <span className="bg-purple-500 text-purple-500 rounded-md bg-opacity-20 py-2 px-3">
              <BarChartIcon />
            </span>
            <div>
              <p className="text-xl">132k</p>
              <span className="text-gray-400 text-sm">Sale</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-sky-500 rounded-md bg-opacity-20 py-2 px-3 text-sky-500">
              <GroupIcon />
            </span>
            <div>
              <p className="text-xl">6.542k</p>
              <span className="text-gray-400 text-sm">Customers</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-rose-500 text-rose-500 rounded-md bg-opacity-20 py-2 px-3">
              <ShoppingCartIcon />
            </span>
            <div>
              <p className="text-xl">1.234k</p>
              <span className="text-gray-400 text-sm">Products</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-emerald-500 text-emerald-500 rounded-md bg-opacity-20 py-2 px-3">
              <BarChartIcon />
            </span>
            <div>
              <p className="text-xl">324.2k</p>
              <span className="text-gray-400 text-sm">Revenue</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="border border-zinc-800 rounded-md py-10 px-10 mt-4 w-full">
          <p className="text-2xl font-semibold">Revenue report</p>
          <LineChartStatistics />
        </div>

        <div>
          <div className="flex gap-4">
            <div className="border border-zinc-800 rounded-md p-5 mt-4 w-full">
              <div>
                <p className="text-xl">Profit</p>
                <span className="text-gray-400 text-sm">Last month</span>
              </div>
              <Box sx={{ flexGrow: 1 }}>
                <SparkLineChart
                  data={[1, 4, 2, 5, 7, 2, 4, 6]}
                  height={100}
                  width={200}
                />
              </Box>
              <p className="text-xl font-semibold">20k+</p>
            </div>

            <div className="border border-zinc-800 rounded-md px-5 py-2 mt-4 w-full">
              <div>
                <p className="text-xl">80k+</p>
                <span className="text-gray-400 text-sm">Expense</span>
              </div>
              <Box sx={{ flexGrow: 1 }}>
                <Gauge
                  width={100}
                  height={100}
                  value={60}
                  startAngle={-90}
                  endAngle={90}
                />
              </Box>
              <span className="text-gray-400 text-sm">
                30k expense more then last one month
              </span>
            </div>
          </div>

          <div className="border border-zinc-800 rounded-md px-5 py-2 mt-4 w-full flex justify-between items-center">
            <div>
              <p className="text-xl">Generated Leads</p>
              <span className="text-gray-400 text-sm">Monthly Report</span>
              <p className="text-xl font-semibold">3,432</p>
              <span className="text-green-500">12%</span>
            </div>
            <div>
              <Gauge width={100} height={100} value={132} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
