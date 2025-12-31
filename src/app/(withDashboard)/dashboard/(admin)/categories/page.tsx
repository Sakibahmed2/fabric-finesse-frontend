"use client";

import AddCategoriesModal from "@/components/Dashboard/Categories/AddCategoriesModal";
import EditCategoriesModal from "@/components/Dashboard/Categories/EditCategoriesModal";
import AddProductModal from "@/components/Dashboard/Products/AddProductModal";
import EditProductModal from "@/components/Dashboard/Products/EditProductModal";
import FFLoading from "@/components/ui/Loading/FFLoading";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "@/redux/api/categoriesApi";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, FormControl, InputLabel, MenuItem, Rating, Select, Stack, TextField, Typography } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "sonner";

const CategoryPage = () => {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [categoryId, setCategoryId] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data, isLoading } = useGetAllCategoriesQuery({
        search: searchTerm,
        page,
        limit,
    });
    const [deleteCategory] = useDeleteCategoryMutation();

    const categories = data?.data?.result || [];

    const handleDelete = async (id: string) => {
        const toastId = toast.loading("Deleting category...");
        try {
            const res = await deleteCategory(id).unwrap();
            if (res?.success) {
                toast.success("Category deleted successfully!", { id: toastId });
            } else {
                toast.error("Failed to delete category.", { id: toastId });
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleEditModal = (id: string) => {
        setEditOpen(true);
        setCategoryId(id);
    }

    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <Stack direction={"row"} gap={2} alignItems={"center"} justifyContent={'center'}>
                        <Button
                            onClick={() => handleEditModal(row._id)}
                            variant="outlined"
                            color="success"
                            startIcon={<CreateIcon />}
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => handleDelete(row._id)}
                            variant="outlined"
                            color="warning"
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
                        Categories
                    </Typography>
                    <Typography component={'p'} sx={{ fontSize: { xs: 14, sm: 16 } }}>
                        Manage all of your categories here
                        {categories?.length ? ` (${categories.length})` : ""}
                    </Typography>
                </Box>
                <Button
                    onClick={() => setOpen(true)}
                    startIcon={<CreateIcon />}
                    sx={{ width: { xs: '100%', sm: 'auto' }, fontSize: { xs: 14, sm: 16 } }}
                >
                    Create categories
                </Button>
            </Stack>

            {/* Products table */}
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

                        <Box
                            my={2}
                            sx={{
                                width: '100%',
                                minWidth: 0,
                                overflowX: 'auto',
                                WebkitOverflowScrolling: 'touch',
                            }}
                        >
                            <Box sx={{ minWidth: 600, width: { xs: 600, sm: '100%' } }}>
                                <DataGrid
                                    rows={categories}
                                    columns={columns}
                                    getRowId={(row) => row._id}
                                    hideFooter
                                    autoHeight
                                    sx={{
                                        fontSize: { xs: 12, sm: 14 },
                                        width: '100%',
                                    }}
                                />
                                {/* MUI Pagination like home products page */}
                                {data?.data?.pagination?.total && data.data.pagination.total > limit && (
                                    <Box display="flex" justifyContent="center" mt={3}>
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

            {/* Create product modal */}
            <AddCategoriesModal open={open} setOpen={setOpen} />

            {/* Edit category modal */}
            <EditCategoriesModal open={editOpen} setOpen={setEditOpen} id={categoryId} />
        </Box>
    );
};

export default CategoryPage;
