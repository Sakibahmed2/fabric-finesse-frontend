"use client";

import AddProductModal from "@/components/Dashboard/Products/AddProductModal";
import EditProductModal from "@/components/Dashboard/Products/EditProductModal";
import FFLoading from "@/components/ui/Loading/FFLoading";
import { useDeleteProductMutation, useGetAllProductsQuery } from "@/redux/api/productsApi";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, FormControl, InputLabel, MenuItem, Rating, Select, Stack, TextField, Typography } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const AllProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [productId, setProductId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");


  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data, isLoading } = useGetAllProductsQuery({
    search: searchTerm,
    sortBy,
    sortOrder,
    page,
    limit,
  });
  const [deleteProduct] = useDeleteProductMutation();


  const products = data?.data?.result

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting product...");
    try {
      const res = await deleteProduct(id).unwrap();
      if (res?.success) {
        toast.success("Product deleted successfully!", { id: toastId });
      } else {
        toast.error("Failed to delete product.", { id: toastId });
      }
    } catch (err) {
      console.log(err)
    }
  };

  const handleEditModal = (id: string) => {
    setEditOpen(true);
    setProductId(id);
  }

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          {row.images && row.images.length > 0 ? (
            <Image src={row.images[0]} alt={row.name} width={50} height={50} style={{ objectFit: "cover", borderRadius: 4 }} />
          ) : (
            <Typography variant="body2" color="text.secondary">No Image</Typography>
          )}
        </Box>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <Typography fontWeight={600}>৳ {row.price}</Typography>
        </Box>
      ),
    },
    {
      field: "discountPrice",
      headerName: "Discount Price",
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          {row.discountPrice ? (
            <Typography fontWeight={600} color="primary">৳ {row.discountPrice}</Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">-</Typography>
          )}
        </Box>
      ),
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography fontWeight={600}>{row.stock ?? '-'}</Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <Stack direction={"row"} gap={2} alignItems={"center"}>
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
      ),
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
            All Products
          </Typography>
          <Typography component={'p'} sx={{ fontSize: { xs: 14, sm: 16 } }}>
            Manage all of your products here
            {products?.length ? ` (${products.length})` : ""}
          </Typography>
        </Box>
        <Button
          onClick={() => setOpen(true)}
          startIcon={<CreateIcon />}
          sx={{ width: { xs: '100%', sm: 'auto' }, fontSize: { xs: 14, sm: 16 } }}
        >
          Create products
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ fontSize: { xs: 12, sm: 14 } }}

                />
              </Box>

              <Box sx={{ width: { xs: '100%', sm: '170px' }, minWidth: 0 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort by date</InputLabel>
                  <Select
                    value={`${sortBy}-${sortOrder}`}
                    label="Sort by date"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "createdAt-asc") {
                        setSortBy("createdAt");
                        setSortOrder("asc");
                      } else {
                        setSortBy("createdAt");
                        setSortOrder("desc");
                      }
                    }}
                  >
                    <MenuItem value="createdAt-desc">Newest First</MenuItem>
                    <MenuItem value="createdAt-asc">Oldest First</MenuItem>
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
                  rows={products}
                  columns={columns}
                  hideFooter
                  getRowId={(row) => row._id}
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
      <AddProductModal open={open} setOpen={setOpen} />

      {/* Edit product modal */}
      <EditProductModal open={editOpen} setOpen={setEditOpen} id={productId} />
    </Box>
  );
};

export default AllProductsPage;
