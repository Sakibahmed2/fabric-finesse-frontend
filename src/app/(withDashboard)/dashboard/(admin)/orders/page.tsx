"use client";

import EmptyOrder from "@/components/ui/EmptyOrder/EmptyOrder";
import FFLoading from "@/components/ui/Loading/FFLoading";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/ordersApi";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";

const OrdersPage = () => {
  const router = useRouter();

  const { data, isLoading, refetch } = useGetAllOrdersQuery({});
  const [updateStatus] = useUpdateOrderStatusMutation();

  const orders = data?.data || [];

  const handleUpdateStatus = async (id: string) => {
    try {
      const res: any = await updateStatus(id);
      if (res?.data?.success) {
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

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
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      renderCell: ({ row }) => {
        const date = row?.createdAt.slice(0, 10);

        return <Typography my={1.5}>{date}</Typography>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        const disable = row?.status === "delivered";

        return (
          <Box>
            <Button
              onClick={() => handleUpdateStatus(row._id)}
              disabled={disable}
            >
              {" "}
              Delivered
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      {!!orders?.length ? (
        <Box>
          {!isLoading ? (
            <DataGrid
              rows={orders}
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

export default OrdersPage;
