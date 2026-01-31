"use client";

import { useGetAllOrdersQuery } from "@/redux/api/ordersApi";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import { useGetAllUsersQuery } from "@/redux/api/usersApi";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Skeleton,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { TextField } from "@mui/material";

// Icons
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TableChartIcon from "@mui/icons-material/TableChart";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

const ReportsPage = () => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState(0);
    const [reportType, setReportType] = useState<string>("sales");
    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
        start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
    });
    const [exportFormat, setExportFormat] = useState<string>("csv");

    const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery({});
    const { data: productsData, isLoading: productsLoading } = useGetAllProductsQuery({});
    const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery({});

    const isLoading = ordersLoading || productsLoading || usersLoading;

    // Process report data
    const reportData = useMemo(() => {
        const orders = ordersData?.data?.result || [];
        const products = productsData?.data?.result || [];
        const users = usersData?.data?.result || [];

        // Filter by date range
        const filteredOrders = orders.filter((order: any) => {
            const orderDate = new Date(order.createdAt || order.orderDate);
            const startDate = dateRange.start ? new Date(dateRange.start) : null;
            const endDate = dateRange.end ? new Date(dateRange.end) : null;
            if (startDate && orderDate < startDate) return false;
            if (endDate && orderDate > endDate) return false;
            return true;
        });

        // Sales Report
        const salesReport = {
            totalRevenue: filteredOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0),
            totalOrders: filteredOrders.length,
            averageOrderValue: filteredOrders.length > 0
                ? filteredOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0) / filteredOrders.length
                : 0,
            orders: filteredOrders.map((order: any) => ({
                id: order._id,
                date: new Date(order.createdAt || order.orderDate).toLocaleDateString(),
                customer: order.user?.name || order.customerName || "Guest",
                email: order.user?.email || order.email || "-",
                items: order.products?.length || 0,
                total: order.total || 0,
                status: order.status || "pending",
            })),
        };

        // Product Report
        const productReport = {
            totalProducts: products.length,
            lowStock: products.filter((p: any) => (p.stock || 0) < 10).length,
            outOfStock: products.filter((p: any) => (p.stock || 0) === 0).length,
            products: products.map((product: any) => ({
                id: product._id,
                name: product.name,
                category: product.category?.name || "Uncategorized",
                price: product.price,
                discountPrice: product.discountPrice,
                stock: product.stock || 0,
                status: (product.stock || 0) === 0 ? "out-of-stock" : (product.stock || 0) < 10 ? "low-stock" : "in-stock",
            })),
        };

        // Customer Report
        const customerReport = {
            totalCustomers: users.length,
            newCustomers: users.filter((u: any) => {
                const regDate = new Date(u.createdAt);
                const startDate = dateRange.start ? new Date(dateRange.start) : null;
                return startDate && regDate >= startDate;
            }).length,
            customers: users.map((user: any) => ({
                id: user._id,
                name: user.name || "Unknown",
                email: user.email,
                role: user.role || "user",
                joinDate: new Date(user.createdAt).toLocaleDateString(),
                orders: orders.filter((o: any) => o.user?._id === user._id || o.userId === user._id).length,
                totalSpent: orders
                    .filter((o: any) => o.user?._id === user._id || o.userId === user._id)
                    .reduce((sum: number, o: any) => sum + (o.total || 0), 0),
            })),
        };

        return { salesReport, productReport, customerReport };
    }, [ordersData, productsData, usersData, dateRange]);

    // Export functions
    const exportToCSV = (data: any[], filename: string) => {
        if (data.length === 0) return;

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(","),
            ...data.map(row =>
                headers.map(header => {
                    const value = row[header];
                    // Escape commas and quotes
                    if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    return value;
                }).join(",")
            )
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
        link.click();
    };

    const exportToPDF = (reportType: string) => {
        // Create printable content
        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        let content = "";
        let title = "";

        switch (reportType) {
            case "sales":
                title = "Sales Report";
                content = `
          <h2>Summary</h2>
          <p>Total Revenue: $${reportData.salesReport.totalRevenue.toLocaleString()}</p>
          <p>Total Orders: ${reportData.salesReport.totalOrders}</p>
          <p>Average Order Value: $${reportData.salesReport.averageOrderValue.toFixed(2)}</p>
          <h2>Orders</h2>
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
            <tr style="background-color: #f0f0f0;">
              <th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th>
            </tr>
            ${reportData.salesReport.orders.map((o: any) => `
              <tr>
                <td>${o.date}</td>
                <td>${o.customer}</td>
                <td>${o.items}</td>
                <td>$${o.total.toLocaleString()}</td>
                <td>${o.status}</td>
              </tr>
            `).join("")}
          </table>
        `;
                break;
            case "products":
                title = "Product Inventory Report";
                content = `
          <h2>Summary</h2>
          <p>Total Products: ${reportData.productReport.totalProducts}</p>
          <p>Low Stock: ${reportData.productReport.lowStock}</p>
          <p>Out of Stock: ${reportData.productReport.outOfStock}</p>
          <h2>Products</h2>
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
            <tr style="background-color: #f0f0f0;">
              <th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th>
            </tr>
            ${reportData.productReport.products.map((p: any) => `
              <tr>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>$${p.price}</td>
                <td>${p.stock}</td>
                <td>${p.status}</td>
              </tr>
            `).join("")}
          </table>
        `;
                break;
            case "customers":
                title = "Customer Report";
                content = `
          <h2>Summary</h2>
          <p>Total Customers: ${reportData.customerReport.totalCustomers}</p>
          <p>New Customers (Period): ${reportData.customerReport.newCustomers}</p>
          <h2>Customers</h2>
          <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
            <tr style="background-color: #f0f0f0;">
              <th>Name</th><th>Email</th><th>Join Date</th><th>Orders</th><th>Total Spent</th>
            </tr>
            ${reportData.customerReport.customers.map((c: any) => `
              <tr>
                <td>${c.name}</td>
                <td>${c.email}</td>
                <td>${c.joinDate}</td>
                <td>${c.orders}</td>
                <td>$${c.totalSpent.toLocaleString()}</td>
              </tr>
            `).join("")}
          </table>
        `;
                break;
        }

        printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title} - Fabric Finesse</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1976d2; }
            h2 { color: #333; border-bottom: 2px solid #1976d2; padding-bottom: 8px; }
            table { margin-top: 16px; font-size: 14px; }
            .header { display: flex; justify-content: space-between; align-items: center; }
            .date { color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Fabric Finesse - ${title}</h1>
            <p class="date">Generated: ${new Date().toLocaleString()}</p>
          </div>
          <p>Date Range: ${dateRange.start ? new Date(dateRange.start).toLocaleDateString() : "All time"} - ${dateRange.end ? new Date(dateRange.end).toLocaleDateString() : "Present"}</p>
          ${content}
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.print();
    };

    const handleExport = () => {
        switch (activeTab) {
            case 0:
                if (exportFormat === "csv") {
                    exportToCSV(reportData.salesReport.orders, "sales_report");
                } else {
                    exportToPDF("sales");
                }
                break;
            case 1:
                if (exportFormat === "csv") {
                    exportToCSV(reportData.productReport.products, "product_report");
                } else {
                    exportToPDF("products");
                }
                break;
            case 2:
                if (exportFormat === "csv") {
                    exportToCSV(reportData.customerReport.customers, "customer_report");
                } else {
                    exportToPDF("customers");
                }
                break;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
            case "delivered":
            case "in-stock":
                return "success";
            case "pending":
            case "processing":
            case "low-stock":
                return "warning";
            case "cancelled":
            case "out-of-stock":
                return "error";
            default:
                return "default";
        }
    };

    if (isLoading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Skeleton variant="rounded" height={60} sx={{ mb: 3 }} />
                <Skeleton variant="rounded" height={400} />
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Reports & Export
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Generate and export detailed business reports
                </Typography>
            </Box>

            {/* Filters */}
            <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="center">
                    <FilterListIcon color="action" />
                    <TextField
                        label="Start Date"
                        type="date"
                        size="small"
                        value={dateRange.start}
                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: 150 }}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        size="small"
                        value={dateRange.end}
                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                        InputLabelProps={{ shrink: true }}
                        sx={{ minWidth: 150 }}
                    />
                    <Divider orientation="vertical" flexItem />
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Export Format</InputLabel>
                        <Select
                            value={exportFormat}
                            label="Export Format"
                            onChange={(e) => setExportFormat(e.target.value)}
                        >
                            <MenuItem value="csv">
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <TableChartIcon fontSize="small" />
                                    <span>CSV</span>
                                </Stack>
                            </MenuItem>
                            <MenuItem value="pdf">
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <PictureAsPdfIcon fontSize="small" />
                                    <span>PDF</span>
                                </Stack>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={handleExport}
                        sx={{ ml: "auto" }}
                    >
                        Export Report
                    </Button>
                </Stack>
            </Paper>

            {/* Report Tabs */}
            <Paper sx={{ borderRadius: 2 }}>
                <Tabs
                    value={activeTab}
                    onChange={(_, v) => setActiveTab(v)}
                    sx={{ borderBottom: 1, borderColor: "divider", px: 2 }}
                >
                    <Tab icon={<ReceiptIcon />} iconPosition="start" label="Sales Report" />
                    <Tab icon={<InventoryIcon />} iconPosition="start" label="Product Report" />
                    <Tab icon={<PeopleIcon />} iconPosition="start" label="Customer Report" />
                </Tabs>

                {/* Sales Report Tab */}
                <TabPanel value={activeTab} index={0}>
                    <Box sx={{ px: 3 }}>
                        {/* Summary Cards */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} sm={4}>
                                <Card sx={{ bgcolor: theme.palette.primary.main, color: "white" }}>
                                    <CardContent>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Revenue</Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            ${reportData.salesReport.totalRevenue.toLocaleString()}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Card sx={{ bgcolor: theme.palette.success.main, color: "white" }}>
                                    <CardContent>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Orders</Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            {reportData.salesReport.totalOrders}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Card sx={{ bgcolor: theme.palette.info.main, color: "white" }}>
                                    <CardContent>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>Avg. Order Value</Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            ${reportData.salesReport.averageOrderValue.toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Orders Table */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Order ID</strong></TableCell>
                                        <TableCell><strong>Date</strong></TableCell>
                                        <TableCell><strong>Customer</strong></TableCell>
                                        <TableCell><strong>Email</strong></TableCell>
                                        <TableCell align="center"><strong>Items</strong></TableCell>
                                        <TableCell align="right"><strong>Total</strong></TableCell>
                                        <TableCell align="center"><strong>Status</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reportData.salesReport.orders.slice(0, 20).map((order: any) => (
                                        <TableRow key={order.id} hover>
                                            <TableCell>
                                                <Typography variant="body2" fontFamily="monospace">
                                                    {order.id?.slice(-8) || "-"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>{order.customer}</TableCell>
                                            <TableCell>{order.email}</TableCell>
                                            <TableCell align="center">{order.items}</TableCell>
                                            <TableCell align="right">${order.total.toLocaleString()}</TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={order.status}
                                                    color={getStatusColor(order.status) as any}
                                                    size="small"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {reportData.salesReport.orders.length > 20 && (
                            <Alert severity="info" sx={{ mt: 2 }}>
                                Showing 20 of {reportData.salesReport.orders.length} orders. Export to see all.
                            </Alert>
                        )}
                    </Box>
                </TabPanel>

                {/* Product Report Tab */}
                <TabPanel value={activeTab} index={1}>
                    <Box sx={{ px: 3 }}>
                        {/* Summary Cards */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} sm={4}>
                                <Card sx={{ bgcolor: theme.palette.primary.main, color: "white" }}>
                                    <CardContent>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Products</Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            {reportData.productReport.totalProducts}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Card sx={{ bgcolor: theme.palette.warning.main, color: "white" }}>
                                    <CardContent>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>Low Stock</Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            {reportData.productReport.lowStock}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Card sx={{ bgcolor: theme.palette.error.main, color: "white" }}>
                                    <CardContent>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>Out of Stock</Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            {reportData.productReport.outOfStock}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Products Table */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Product Name</strong></TableCell>
                                        <TableCell><strong>Category</strong></TableCell>
                                        <TableCell align="right"><strong>Price</strong></TableCell>
                                        <TableCell align="right"><strong>Sale Price</strong></TableCell>
                                        <TableCell align="center"><strong>Stock</strong></TableCell>
                                        <TableCell align="center"><strong>Status</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reportData.productReport.products.slice(0, 20).map((product: any) => (
                                        <TableRow key={product.id} hover>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell align="right">${product.price}</TableCell>
                                            <TableCell align="right">
                                                {product.discountPrice ? `$${product.discountPrice}` : "-"}
                                            </TableCell>
                                            <TableCell align="center">{product.stock}</TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={product.status.replace("-", " ")}
                                                    color={getStatusColor(product.status) as any}
                                                    size="small"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {reportData.productReport.products.length > 20 && (
                            <Alert severity="info" sx={{ mt: 2 }}>
                                Showing 20 of {reportData.productReport.products.length} products. Export to see all.
                            </Alert>
                        )}
                    </Box>
                </TabPanel>

                {/* Customer Report Tab */}
                <TabPanel value={activeTab} index={2}>
                    <Box sx={{ px: 3 }}>
                        {/* Summary Cards */}
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12} sm={6}>
                                <Card sx={{ bgcolor: theme.palette.primary.main, color: "white" }}>
                                    <CardContent>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Customers</Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            {reportData.customerReport.totalCustomers}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Card sx={{ bgcolor: theme.palette.success.main, color: "white" }}>
                                    <CardContent>
                                        <Typography variant="body2" sx={{ opacity: 0.8 }}>New Customers (Period)</Typography>
                                        <Typography variant="h4" fontWeight="bold">
                                            {reportData.customerReport.newCustomers}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Customers Table */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Name</strong></TableCell>
                                        <TableCell><strong>Email</strong></TableCell>
                                        <TableCell><strong>Role</strong></TableCell>
                                        <TableCell><strong>Join Date</strong></TableCell>
                                        <TableCell align="center"><strong>Orders</strong></TableCell>
                                        <TableCell align="right"><strong>Total Spent</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reportData.customerReport.customers.slice(0, 20).map((customer: any) => (
                                        <TableRow key={customer.id} hover>
                                            <TableCell>{customer.name}</TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={customer.role}
                                                    color={customer.role === "admin" ? "secondary" : "default"}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>{customer.joinDate}</TableCell>
                                            <TableCell align="center">{customer.orders}</TableCell>
                                            <TableCell align="right">${customer.totalSpent.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {reportData.customerReport.customers.length > 20 && (
                            <Alert severity="info" sx={{ mt: 2 }}>
                                Showing 20 of {reportData.customerReport.customers.length} customers. Export to see all.
                            </Alert>
                        )}
                    </Box>
                </TabPanel>
            </Paper>
        </Container>
    );
};

export default ReportsPage;
