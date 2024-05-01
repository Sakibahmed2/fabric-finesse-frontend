"use client";

import { useAppSelector } from "@/redux/hooks";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";

type TCartItem = {
  _id: string;
  title: string;
  image: string;
  price: number;
  salePrice?: number | null;
  quantity?: number | undefined;
};

const CheckoutPage = () => {
  const data: any = useAppSelector((state) => state.cart.carts);

  const cartData: TCartItem[] = data.reduce(
    (acc: TCartItem[], item: TCartItem) => {
      const existingItemIndex = acc.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        const existingItem = acc[existingItemIndex];
        if (existingItem.quantity !== undefined) {
          existingItem.quantity++;
        } else {
          existingItem.quantity = 2;
        }
      } else {
        acc.push({ ...item, quantity: 1 });
      }

      return acc;
    },
    []
  );

  const subtotal = cartData.reduce((total, item) => {
    const itemPrice =
      item.salePrice !== undefined ? item.salePrice : item.price;
    if (itemPrice !== null) {
      const itemTotal = itemPrice * (item.quantity || 1);
      return total + itemTotal;
    }
    return total;
  }, 0);

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      flex: 1,

      renderCell: ({ row }) => {
        return (
          <Box>
            <Image src={row.image} width={50} height={50} alt="product image" />
          </Box>
        );
      },
    },
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            {row.salePrice ? (
              <Typography fontWeight={600}>৳ {row.salePrice} </Typography>
            ) : (
              <Typography fontWeight={600}>৳ {row.price}</Typography>
            )}
          </Box>
        );
      },
    },
    { field: "quantity", headerName: "Quantity", flex: 1 },
  ];

  const handleCreateOrder = () => {
    const newOrder = {
      userId: "user123",
      items: cartData.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.salePrice || item.price,
      })),
      totalAmount: subtotal + 15,
      status: "pending",
    };

    console.log(newOrder);
  };

  return (
    <Container>
      <Box my={20}>
        <Box
          sx={{
            bgcolor: "lightcyan",
            padding: "20px 10px",
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" fontWeight={600} color="gray">
            Checkout
          </Typography>
        </Box>

        <Stack>
          <Box>
            <DataGrid
              rows={cartData.map((item: TCartItem, index: number) => ({
                ...item,
                id: index,
              }))}
              columns={columns}
              getRowId={(row) => row.id}
              hideFooter
            />
          </Box>

          <Box
            sx={{
              width: 400,
              mt: 2,
              position: {
                md: "fixed",
              },
              top: 100,
              right: 0,
              bgcolor: "#F5F5F5 ",
              padding: "20px 30px",
              borderRadius: 2,
              zIndex: 999,
            }}
          >
            <Typography
              variant="h5"
              component={"p"}
              textAlign={"center"}
              mb={2}
            >
              Order items
            </Typography>
            <Stack spacing={2}>
              {cartData?.map((items, index) => (
                <Stack
                  key={items._id}
                  direction={"row"}
                  justifyContent={"space-between"}
                  sx={{
                    bgcolor: "white",
                    padding: "10px 10px",
                    borderRadius: 1,
                  }}
                >
                  <Typography component={"span"}>
                    {index + 1}
                    {". "}{" "}
                  </Typography>
                  <Typography component={"p"} fontWeight={600}>
                    {items.title.slice(0, 10)}
                  </Typography>{" "}
                  {"="}{" "}
                  <Box>
                    {items.salePrice ? (
                      <Typography fontWeight={600}>
                        ৳ {items.salePrice}{" "}
                      </Typography>
                    ) : (
                      <Typography fontWeight={600}>৳ {items.price}</Typography>
                    )}
                  </Box>
                </Stack>
              ))}
            </Stack>
            <Box mt={2}>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography color={"gray"} fontSize={15}>
                  Delivery Charge{" "}
                </Typography>
                <Typography fontWeight={600} fontSize={15}>
                  15৳
                </Typography>
              </Stack>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography color={"gray"} fontSize={15}>
                  Subtotal{" "}
                </Typography>
                <Typography fontWeight={600} fontSize={15}>
                  {subtotal}৳
                </Typography>
              </Stack>
              <Stack direction={"row"} justifyContent={"space-between"} mt={1}>
                <Typography fontWeight={600}>Grand total </Typography>
                <Typography fontWeight={600}>{subtotal + 15}৳</Typography>
              </Stack>

              <Button
                fullWidth
                sx={{
                  my: 2,
                }}
                onClick={() => handleCreateOrder()}
              >
                Checkout
              </Button>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography color={"red"} fontSize={15} fontWeight={600}>
                  Payment method
                </Typography>
                <Typography fontSize={15} color={"red"} fontWeight={600}>
                  Cash On Delivery
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
