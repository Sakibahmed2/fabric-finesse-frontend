"use client";

import EmptyOrder from "@/components/ui/EmptyOrder/EmptyOrder";
import FFLoading from "@/components/ui/Loading/FFLoading";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/ordersApi";
import { Box, Button, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const OrdersPage = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, refetch } = useGetAllOrdersQuery({
    search: searchTerm,
    page,
    limit,
  });
  const [updateStatus] = useUpdateOrderStatusMutation();

  // Use the correct path for orders array from backend response
  const orders = data?.data?.result || [];
  const total = data?.data?.pagination?.total || 0;

  const handleUpdateStatus = async (id: string, status: string) => {
    const toastId = toast.loading("Updating status...");
    try {
      const res: any = await updateStatus({ id, status }).unwrap();

      if (res?.success) {
        refetch();
        toast.success("Order status updated!", { id: toastId });
      }
    } catch (err) {
      toast.error("Failed to update status.", { id: toastId });
      console.log(err);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "order_id",
      headerName: "Order ID",
      flex: 1,
    },
    {
      field: "user_id",
      headerName: "User",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography>{row.user_id?.name} <br /> <span style={{ fontSize: 12, color: '#888' }}>{row.user_id?.email}</span></Typography>
      ),
    },
    {
      field: "items",
      headerName: "Items",
      flex: 2,
      renderCell: ({ row }) => (
        <Stack>
          {row.items.map((item: any, idx: number) => (
            <Box key={item._id || idx} sx={{ mb: 0.5 }}>
              <Typography fontWeight={500}>{item.product_id?.name}</Typography>
              <Typography fontSize={13} color="text.secondary">
                Qty: {item.quantity}
                {item.color && <span> | Color: <b style={{ textTransform: 'capitalize' }}>{item.color}</b></span>}
                {item.size && <span> | Size: <b style={{ textTransform: 'capitalize' }}>{item.size}</b></span>}
              </Typography>
            </Box>
          ))}
        </Stack>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => {
        const ORDER_STATUSES = [
          "pending",
          "confirmed",
          "delivered",
          "cancelled",
        ];
        return (
          <FormControl size="small" fullWidth>
            <Select
              value={row.status}
              onChange={(e) => handleUpdateStatus(row._id, e.target.value)}
              sx={{ fontWeight: 600, color: row.status === 'pending' ? 'orange' : row.status === 'delivered' ? 'green' : row.status === 'cancelled' ? 'red' : 'primary.main', mt: 0.5 }}
              size="small"
            >
              {ORDER_STATUSES.map((status) => (
                <MenuItem key={status} value={status} sx={{ textTransform: 'capitalize' }}>{status.charAt(0).toUpperCase() + status.slice(1)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography>৳ {row.total}</Typography>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      renderCell: ({ row }) => {
        const date = row?.createdAt?.slice(0, 10);
        return <Typography my={1.5}>{date}</Typography>;
      },
    },
    // Action column removed
  ];

  return (
    <Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={3}
        gap={2}
      >
        <Box>
          <Typography variant="h5" fontWeight={600} sx={{ fontSize: { xs: 22, sm: 28, md: 32 } }}>
            Orders
          </Typography>
          <Typography component={'p'} sx={{ fontSize: { xs: 14, sm: 16 } }}>
            Manage all of your orders here
            {orders?.length ? ` (${orders.length})` : ""}
          </Typography>
        </Box>

      </Stack>


      <Box sx={{
        border: '2px solid lightgray',
        borderRadius: 2
      }}>
        {!isLoading ? (
          <Box>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "flex-start", sm: "space-between" }}
              alignItems={{ xs: "stretch", sm: "center" }}
              sx={{
                py: 3,
                px: 2,
                gap: { xs: 2, sm: 0 },
                minWidth: 0,
              }}
            >
              <Box sx={{ width: { xs: '100%', sm: '400px' }, minWidth: 0, mb: { xs: 2, sm: 0 } }}>
                <TextField
                  label="Search here"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  fullWidth
                  size="small"
                  sx={{ fontSize: { xs: 12, sm: 14 } }}
                />
              </Box>

              <Box sx={{ width: { xs: '100%', sm: '170px' }, minWidth: 0 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort by date</InputLabel>
                  <Select
                    // value={sortBy}
                    label="Sort by date"
                  // onChange={(e) => setSortBy(e.target.value)}
                  >
                    <MenuItem value={"createdAt"}>Oldest First</MenuItem>
                    <MenuItem value={"-createdAt"}>Newest First</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>

            <DataGrid
              rows={orders}
              columns={columns}
              getRowId={(row) => row._id}
              hideFooter
              autoHeight
              sx={{ fontSize: { xs: 12, sm: 14 }, width: '100%' }}
            />
            {/* Pagination */}
            {total > limit && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Pagination
                  count={Math.ceil(total / limit)}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  shape="rounded"
                  showFirstButton
                  showLastButton
                />
                <FormControl size="small" sx={{ minWidth: 80, ml: 2 }}>
                  <Select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          </Box>
        ) : (
          <FFLoading />
        )}
      </Box>

    </Box>
  );
};

export default OrdersPage;
