"use client";

import { useGetAllOrdersQuery } from "@/redux/api/ordersApi";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Paper,
  Skeleton,
  Chip
} from "@mui/material";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

// mui icons
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LineChartStatistics from "@/components/Dashboard/LineChart/LineChartStatistics";
import { useMemo } from "react";

const AdminDashboardPage = () => {

  // Fetch orders, products, and users
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery({});
  const { data: productsData, isLoading: productsLoading } = useGetAllProductsQuery({});
  const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery({});

  const isLoading = ordersLoading || productsLoading || usersLoading;

  // Calculate real statistics
  const statistics = useMemo(() => {
    const orders = ordersData?.data?.result || [];
    const products = productsData?.data?.result || [];

    // Total counts
    const orderCount = ordersData?.data?.pagination?.total || 0;
    const productCount = productsData?.data?.pagination?.total || 0;
    const userCount = usersData?.data?.pagination?.total || 0;

    // Calculate total revenue
    const totalRevenue = orders.reduce((sum: number, order: any) =>
      sum + (order.total || 0), 0
    );

    // Calculate average order value
    const averageOrderValue = orderCount > 0 ? totalRevenue / orderCount : 0;

    // Get current month and last month data
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthOrders = orders.filter((order: any) => {
      const orderDate = new Date(order.createdAt || order.orderDate);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });

    const lastMonthOrders = orders.filter((order: any) => {
      const orderDate = new Date(order.createdAt || order.orderDate);
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return orderDate.getMonth() === lastMonth && orderDate.getFullYear() === lastYear;
    });

    const currentMonthRevenue = currentMonthOrders.reduce((sum: number, order: any) =>
      sum + (order.total || 0), 0
    );

    const lastMonthRevenue = lastMonthOrders.reduce((sum: number, order: any) =>
      sum + (order.total || 0), 0
    );

    // Calculate profit (assuming 30% margin)
    const profitMargin = 0.30;
    const currentMonthProfit = currentMonthRevenue * profitMargin;
    const lastMonthProfit = lastMonthRevenue * profitMargin;

    // Calculate expense (revenue - profit)
    const currentMonthExpense = currentMonthRevenue - currentMonthProfit;

    // Calculate growth percentages
    const revenueGrowth = lastMonthRevenue > 0
      ? ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1)
      : 0;

    const profitGrowth = lastMonthProfit > 0
      ? ((currentMonthProfit - lastMonthProfit) / lastMonthProfit * 100).toFixed(1)
      : 0;

    // Calculate expense growth/change
    const lastMonthExpense = lastMonthRevenue - lastMonthProfit;
    const expenseChange = lastMonthExpense > 0
      ? ((currentMonthExpense - lastMonthExpense) / lastMonthExpense * 100).toFixed(1)
      : 0;

    // Low stock products
    const lowStockProducts = products.filter((product: any) =>
      (product.stock || 0) < 10
    ).length;

    // Generate sparkline data for last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    const dailyRevenue = last7Days.map(date => {
      const dayOrders = orders.filter((order: any) => {
        const orderDate = new Date(order.createdAt || order.orderDate);
        return orderDate.toDateString() === date.toDateString();
      });
      return dayOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
    });

    // Generate monthly revenue data for last 12 months
    const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
      const targetMonth = (currentMonth - (11 - i) + 12) % 12;
      const targetYear = currentMonth - (11 - i) < 0 ? currentYear - 1 : currentYear;

      const monthOrders = orders.filter((order: any) => {
        const orderDate = new Date(order.createdAt || order.orderDate);
        return orderDate.getMonth() === targetMonth && orderDate.getFullYear() === targetYear;
      });

      return monthOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);
    });

    // Generate month labels
    const monthLabels = Array.from({ length: 12 }, (_, i) => {
      const monthIndex = (currentMonth - (11 - i) + 12) % 12;
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][monthIndex];
    });

    return {
      orderCount,
      productCount,
      userCount,
      totalRevenue,
      averageOrderValue,
      currentMonthRevenue,
      currentMonthProfit,
      currentMonthExpense,
      revenueGrowth: Number(revenueGrowth),
      profitGrowth: Number(profitGrowth),
      expenseChange: Number(expenseChange),
      lowStockProducts,
      dailyRevenue,
      monthlyRevenue,
      monthLabels,
    };
  }, [ordersData, productsData, usersData]);

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${statistics.totalRevenue.toLocaleString()}`,
      icon: <AttachMoneyIcon sx={{ fontSize: 40 }} />,
      color: "#10b981",
      bgColor: "#d1fae5",
      growth: statistics.revenueGrowth,
      subtitle: "All time"
    },
    {
      title: "Orders",
      value: statistics.orderCount.toLocaleString(),
      icon: <ReceiptLongIcon sx={{ fontSize: 40 }} />,
      color: "#3b82f6",
      bgColor: "#dbeafe",
      growth: null,
      subtitle: `Avg: $${statistics.averageOrderValue.toFixed(2)}`
    },
    {
      title: "Users",
      value: statistics.userCount.toLocaleString(),
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      color: "#8b5cf6",
      bgColor: "#ede9fe",
      growth: null,
      subtitle: "Total registered"
    },
    {
      title: "Products",
      value: statistics.productCount.toLocaleString(),
      icon: <InventoryIcon sx={{ fontSize: 40 }} />,
      color: "#f59e0b",
      bgColor: "#fef3c7",
      growth: null,
      subtitle: `${statistics.lowStockProducts} low stock`
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back! Here&rsquo;s what&rsquo;s happening with your store today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: card.bgColor,
                      color: card.color,
                    }}
                  >
                    {card.icon}
                  </Box>
                  {card.growth !== null && (
                    <Chip
                      icon={card.growth >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      label={`${card.growth >= 0 ? '+' : ''}${card.growth}%`}
                      size="small"
                      color={card.growth >= 0 ? "success" : "error"}
                      sx={{ fontWeight: 600 }}
                    />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {card.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {card.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              height: '100%',
              minHeight: 500,
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Revenue Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track your revenue performance over the last 12 months
              </Typography>
            </Box>
            <Box sx={{ width: '100%', height: 400 }}>
              <LineChartStatistics
                data={statistics.monthlyRevenue}
                labels={statistics.monthLabels}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Right Column Cards */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Monthly Profit */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                      Monthly Profit
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                      ${statistics.currentMonthProfit.toLocaleString()}
                    </Typography>
                  </Box>
                  <Chip
                    icon={statistics.profitGrowth >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    label={`${statistics.profitGrowth >= 0 ? '+' : ''}${statistics.profitGrowth}%`}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600
                    }}
                  />
                </Box>
                <Box sx={{ mt: 3, mb: 2 }}>
                  <SparkLineChart
                    data={statistics.dailyRevenue.map(v => v * 0.3)}
                    height={80}
                    colors={['#ffffff']}
                    curve="natural"
                    showTooltip
                  />
                </Box>
                <Typography variant="caption" sx={{ opacity: 0.8, mt: 1, display: 'block' }}>
                  Compared to last month
                </Typography>
              </Paper>
            </Grid>


            {/* This Month Revenue */}
            <Grid item xs={12}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white',
                }}
              >
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                  This Month Revenue
                </Typography>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  ${statistics.currentMonthRevenue.toLocaleString()}
                </Typography>
                <Box sx={{ mt: 3, mb: 2 }}>
                  <SparkLineChart
                    data={statistics.dailyRevenue}
                    height={80}
                    colors={['#ffffff']}
                    curve="natural"
                    showTooltip
                  />
                </Box>
                <Typography variant="caption" sx={{ opacity: 0.8, mt: 1, display: 'block' }}>
                  Last 7 days performance
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage;
