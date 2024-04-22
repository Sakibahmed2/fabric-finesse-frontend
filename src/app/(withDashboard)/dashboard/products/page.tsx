"use client";

import FFLoading from "@/components/ui/Loading/FFLoading";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import { Button, Rating, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

// brand: "Levi's";
// category: "men";
// description: "A comfortable and stylish casual shirt for men.";
// image: "https://fabrilife.com/image-gallery/638741f4d7304-square.jpg";
// price: 29.99;
// rating: 4.5;
// title: "Men's Casual Shirt";
// _id: "65fc117eb17aaf65c99e9b12";

const AllProductsPage = () => {
  const { data, isLoading } = useGetAllProductsQuery({});

  const products = data?.data;

  const handleDelete = (id: string) => {
    console.log(id);
  };

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
              onClick={() => handleDelete(row._id)}
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
    <Box>
      <Box>
        <Button startIcon={<CreateIcon />}>Create products</Button>
      </Box>

      {/* Products table */}
      <Box>
        {!isLoading ? (
          <Box my={2}>
            <DataGrid
              rows={products}
              columns={columns}
              getRowId={(row) => row._id}
              hideFooter
            />
          </Box>
        ) : (
          <FFLoading />
        )}
      </Box>
    </Box>
  );
};

export default AllProductsPage;
