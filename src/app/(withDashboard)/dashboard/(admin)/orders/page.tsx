"use client";

import EmptyOrder from "@/components/ui/EmptyOrder/EmptyOrder";
import FFLoading from "@/components/ui/Loading/FFLoading";
import OrderDetailsModal from "@/components/Dashboard/Orders/OrderDetailsModal";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/ordersApi";
import { Box, Button, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, TextField, Typography, IconButton, Chip, Menu } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelIcon from "@mui/icons-material/Cancel";

const OrdersPage = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState<null | HTMLElement>(null);
  const [currentStatusUpdate, setCurrentStatusUpdate] = useState<{ orderId: string, currentStatus: string } | null>(null);

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
        setStatusMenuAnchor(null);
        setCurrentStatusUpdate(null);
      }
    } catch (err) {
      toast.error("Failed to update status.", { id: toastId });
      console.log(err);
    }
  };

  const handleStatusMenuClick = (event: React.MouseEvent<HTMLElement>, orderId: string, currentStatus: string) => {
    setStatusMenuAnchor(event.currentTarget);
    setCurrentStatusUpdate({ orderId, currentStatus });
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchor(null);
    setCurrentStatusUpdate(null);
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: {
        color: 'warning' as const,
        icon: <PendingIcon sx={{ fontSize: 16 }} />,
        label: 'Pending',
        bgColor: '#fff3cd',
        textColor: '#856404'
      },
      confirmed: {
        color: 'info' as const,
        icon: <LocalShippingIcon sx={{ fontSize: 16 }} />,
        label: 'Confirmed',
        bgColor: '#d1ecf1',
        textColor: '#0c5460'
      },
      delivered: {
        color: 'success' as const,
        icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
        label: 'Delivered',
        bgColor: '#d4edda',
        textColor: '#155724'
      },
      cancelled: {
        color: 'error' as const,
        icon: <CancelIcon sx={{ fontSize: 16 }} />,
        label: 'Cancelled',
        bgColor: '#f8d7da',
        textColor: '#721c24'
      }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
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
          { value: "pending", label: "Pending", disabled: false },
          { value: "confirmed", label: "Confirmed", disabled: row.status === 'cancelled' },
          { value: "delivered", label: "Delivered", disabled: row.status === 'cancelled' },
          { value: "cancelled", label: "Cancelled", disabled: row.status === 'delivered' },
        ];

        const statusConfig = getStatusConfig(row.status);

        return (
          <Box>
            <Chip
              icon={statusConfig.icon}
              label={statusConfig.label}
              size="small"
              onClick={(event) => handleStatusMenuClick(event, row._id, row.status)}
              onDelete={() => { }} // This makes the chip clickable with arrow
              deleteIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: statusConfig.bgColor,
                color: statusConfig.textColor,
                border: `1px solid ${statusConfig.textColor}20`,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: statusConfig.textColor + '10',
                },
                '& .MuiChip-deleteIcon': {
                  color: statusConfig.textColor,
                  '&:hover': {
                    color: statusConfig.textColor,
                  }
                }
              }}
            />
            <Menu
              anchorEl={statusMenuAnchor}
              open={Boolean(statusMenuAnchor) && currentStatusUpdate?.orderId === row._id}
              onClose={handleStatusMenuClose}
              PaperProps={{
                elevation: 8,
                sx: {
                  mt: 1,
                  minWidth: 160,
                  '& .MuiMenuItem-root': {
                    px: 2,
                    py: 1,
                  }
                }
              }}
            >
              {ORDER_STATUSES.map((status) => {
                const config = getStatusConfig(status.value);
                return (
                  <MenuItem
                    key={status.value}
                    onClick={() => handleUpdateStatus(row._id, status.value)}
                    disabled={status.disabled || status.value === row.status}
                    sx={{
                      opacity: status.disabled ? 0.5 : 1,
                      backgroundColor: status.value === row.status ? config.bgColor : 'transparent',
                      '&:hover': {
                        backgroundColor: status.value === row.status ? config.bgColor : config.bgColor + '30',
                      }
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      {config.icon}
                      <Typography
                        sx={{
                          color: config.textColor,
                          fontWeight: status.value === row.status ? 600 : 400
                        }}
                      >
                        {config.label}
                        {status.value === row.status && ' (Current)'}
                      </Typography>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        );
      },
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography>৳ {row.total.toFixed(2)}</Typography>
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
    {
      field: "action",
      headerName: "Action",
      flex: 0.7,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <IconButton
          color="primary"
          onClick={() => handleViewDetails(row)}
          title="View Details"
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
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

      {/* Order Details Modal */}
      <OrderDetailsModal open={detailsOpen} setOpen={setDetailsOpen} order={selectedOrder} />

    </Box>
  );
};

export default OrdersPage;
