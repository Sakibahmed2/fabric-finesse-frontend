"use client";

import AddProductModal from "@/components/Dashboard/Products/AddProductModal";
import EditProductModal from "@/components/Dashboard/Products/EditProductModal";
import FFLoading from "@/components/ui/Loading/FFLoading";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, FormControl, InputLabel, MenuItem, Rating, Select, Stack, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

const AllProductsPage = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [productId, setProductId] = useState<string>("");
  const { data, isLoading } = useGetAllProductsQuery({});

  const products = data?.data;

  const handleDelete = (id: string) => {
    console.log(id);
  };

  const handleEditModal = (id: string) => {
    setEditOpen(true);
    setProductId(id);
  }

  const columns: GridColDef[] = [
    { field: "title", headerName: "Name", flex: 1 },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            {row.sale ? (
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Typography
                  fontWeight={600}
                  sx={{
                    textDecoration: "line-through",
                    color: "red",
                  }}
                >
                  ৳ {row.price}{" "}
                </Typography>
                <Typography fontWeight={600}>৳ {row.salePrice} </Typography>
              </Stack>
            ) : (
              <Typography fontWeight={600}>৳ {row.price}</Typography>
            )}
          </Box>
        );
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Rating value={row.rating} readOnly size="small" />
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Button
              onClick={() => setEditOpen(true)}
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
                  // onChange={(e) => setSearchTerm(e.target.value)}
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
                  rows={products}
                  columns={columns}
                  getRowId={(row) => row._id}
                  hideFooter
                  autoHeight
                  sx={{
                    fontSize: { xs: 12, sm: 14 },
                    width: '100%',
                  }}
                />
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
