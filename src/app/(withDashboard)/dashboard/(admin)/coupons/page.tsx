"use client";

import AddCouponModal from "@/components/Dashboard/Coupons/AddCouponModal";
import EditCouponModal from "@/components/Dashboard/Coupons/EditCouponModal";
import FFLoading from "@/components/ui/Loading/FFLoading";
import { useDeleteCouponMutation, useGetAllCouponsQuery } from "@/redux/api/couponApi";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    Chip,
    Tooltip
} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "sonner";
import { TCoupon } from "@/types/global";

const CouponPage = () => {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [couponId, setCouponId] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [typeFilter, setTypeFilter] = useState("");

    const { data, isLoading } = useGetAllCouponsQuery({
        search: searchTerm,
        page,
        limit,
        type: typeFilter || undefined,
    });
    const [deleteCoupon] = useDeleteCouponMutation();

    const coupons = data?.data?.result || [];

    const handleDelete = async (id: string) => {
        const toastId = toast.loading("Deleting coupon...");
        try {
            const res = await deleteCoupon(id).unwrap();
            if (res?.success) {
                toast.success("Coupon deleted successfully!", { id: toastId });
            } else {
                toast.error("Failed to delete coupon.", { id: toastId });
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong!", { id: toastId });
            console.log(err);
        }
    };

    const handleEditModal = (id: string) => {
        setEditOpen(true);
        setCouponId(id);
    };

    const columns: GridColDef[] = [
        {
            field: "code",
            headerName: "Code",
            flex: 1,
            minWidth: 120,
            align: "center",
            headerAlign: "center",
            renderCell: ({ row }) => (
                <Chip
                    label={row.code}
                    color="primary"
                    variant="outlined"
                    size="small"
                />
            )
        },
        {
            field: "type",
            headerName: "Type",
            flex: 0.7,
            minWidth: 100,
            align: "center",
            headerAlign: "center",
            renderCell: ({ row }) => (
                <Chip
                    label={row.type === "percentage" ? "Percentage" : "Fixed"}
                    color={row.type === "percentage" ? "success" : "info"}
                    size="small"
                />
            ),
        },
        {
            field: "value",
            headerName: "Value",
            flex: 0.7,
            minWidth: 100,
            align: "center",
            headerAlign: "center",
            renderCell: ({ row }: { row: TCoupon }) => (
                <Typography variant="body2" fontWeight={600}>
                    {row.type === "percentage" ? `${row.value}%` : `$${row.value}`}
                </Typography>
            ),
        },
        {
            field: "minOrder",
            headerName: "Min Order",
            flex: 0.8,
            minWidth: 100,
            renderCell: ({ row }) => (
                <Typography variant="body2" sx={{ textAlign: 'center' }}>${row.minOrder}</Typography>
            ),
        },
        {
            field: "usage",
            headerName: "Usage",
            flex: 1,
            minWidth: 150,
            renderCell: ({ row }: { row: TCoupon }) => {
                const used = row.redemptions?.length || 0;
                const total = row.totalCoupon;
                const percentage = total > 0 ? ((used / total) * 100).toFixed(0) : 0;

                return (
                    <Tooltip title={`${used} used out of ${total} available`}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                {used}/{total} ({percentage}%)
                            </Typography>
                        </Box>
                    </Tooltip>
                );
            },
        },
        {
            field: "perUserLimit",
            headerName: "User Limit",
            flex: 0.7,
            minWidth: 100,
            align: "center",
            headerAlign: "center",
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1.5,
            minWidth: 250,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={'center'}>
                        <Button
                            onClick={() => handleEditModal(row._id)}
                            variant="outlined"
                            color="success"
                            size="small"
                            startIcon={<CreateIcon />}
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => handleDelete(row._id)}
                            variant="outlined"
                            color="warning"
                            size="small"
                            startIcon={<DeleteIcon />}
                        >
                            Delete
                        </Button>
                    </Stack>
                );
            },
        },
    ];

    return (
        <Box sx={{ px: { xs: 1, sm: 2, md: 4 }, py: { xs: 1, sm: 2 } }}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                mb={3}
                gap={2}
            >
                <Box>
                    <Typography variant="h5" fontWeight={600} sx={{ fontSize: { xs: 22, sm: 28, md: 32 } }}>
                        Coupons
                    </Typography>
                    <Typography component={'p'} sx={{ fontSize: { xs: 14, sm: 16 } }}>
                        Manage all of your coupons here
                        {coupons?.length ? ` (${coupons.length})` : ""}
                    </Typography>
                </Box>
                <Button
                    onClick={() => setOpen(true)}
                    startIcon={<CreateIcon />}
                    sx={{ width: { xs: '100%', sm: 'auto' }, fontSize: { xs: 14, sm: 16 } }}
                >
                    Create Coupon
                </Button>
            </Stack>

            {/* Coupons table */}
            <Box>
                {!isLoading ? (
                    <Box
                        sx={{
                            border: "1px solid lightgray",
                            borderRadius: "6px",
                            overflowX: "auto",
                            width: "100%",
                            maxWidth: '100vw',
                            minWidth: 0,
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            justifyContent={{ xs: "flex-start", sm: "space-between" }}
                            alignItems={{ xs: "stretch", sm: "center" }}
                            sx={{
                                pt: 3,
                                px: 2,
                                gap: { xs: 2, sm: 2 },
                                minWidth: 0,
                            }}
                        >
                            <Box sx={{ width: { xs: '100%', sm: '300px' }, minWidth: 0 }}>
                                <TextField
                                    label="Search by code"
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
                                    <InputLabel>Filter by type</InputLabel>
                                    <Select
                                        value={typeFilter}
                                        label="Filter by type"
                                        onChange={(e) => {
                                            setTypeFilter(e.target.value);
                                            setPage(1);
                                        }}
                                    >
                                        <MenuItem value="">All Types</MenuItem>
                                        <MenuItem value="percentage">Percentage</MenuItem>
                                        <MenuItem value="fixed">Fixed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Stack>

                        <Box
                            my={2}
                            sx={{
                                width: '100%',
                                minWidth: 0,
                                overflowX: 'auto',
                                WebkitOverflowScrolling: 'touch',
                            }}
                        >
                            <Box sx={{ minWidth: 900, width: { xs: 900, md: '100%' } }}>
                                <DataGrid
                                    rows={coupons}
                                    columns={columns}
                                    getRowId={(row) => row._id}
                                    hideFooter
                                    autoHeight
                                    sx={{
                                        fontSize: { xs: 12, sm: 14 },
                                        width: '100%',
                                    }}
                                />
                                {/* Pagination */}
                                {data?.data?.pagination?.total && data.data.pagination.total > limit && (
                                    <Box display="flex" justifyContent="center" mt={3} mb={2}>
                                        <Pagination
                                            count={Math.ceil(data.data.pagination.total / limit)}
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
                        </Box>
                    </Box>
                ) : (
                    <FFLoading />
                )}
            </Box>

            {/* Create coupon modal */}
            <AddCouponModal open={open} setOpen={setOpen} />

            {/* Edit coupon modal */}
            <EditCouponModal open={editOpen} setOpen={setEditOpen} id={couponId} />
        </Box>
    );
};

export default CouponPage;