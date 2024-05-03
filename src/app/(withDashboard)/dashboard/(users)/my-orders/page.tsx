"use client";

import EmptyOrder from "@/components/ui/EmptyOrder/EmptyOrder";
import FFLoading from "@/components/ui/Loading/FFLoading";
import { useGetUserOrderQuery } from "@/redux/api/ordersApi";
import { getUserInfo } from "@/services/authService";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const MyOrderPage = () => {
  const user: any = getUserInfo();

  const { data, isLoading } = useGetUserOrderQuery(user?.userId);

  const myOrder = data?.data || [];

  // console.log(!!myOrder.length);
  console.log(myOrder);

  const columns: GridColDef[] = [
    {
      field: "items",
      headerName: "Order items",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Stack my={1.5}>
            <Typography>{row.items.length}</Typography>
          </Stack>
        );
      },
    },
    { field: "userEmail", headerName: "User Email", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Typography
            sx={{
              color: row?.status === "pending" ? "red" : "green",
              my: 1.5,
            }}
            fontWeight={600}
          >
            {row?.status}
          </Typography>
        );
      },
    },
    { field: "totalAmount", headerName: "Total Amount", flex: 1 },
  ];

  return (
    <Box>
      {!!myOrder?.length ? (
        <Box>
          {!isLoading ? (
            <DataGrid
              rows={myOrder}
              columns={columns}
              getRowId={(row) => row._id}
              hideFooter
            />
          ) : (
            <FFLoading />
          )}
        </Box>
      ) : (
        <EmptyOrder />
      )}
    </Box>
  );
};

export default MyOrderPage;
