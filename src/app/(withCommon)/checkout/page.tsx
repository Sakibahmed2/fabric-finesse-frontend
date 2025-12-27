"use client";

import FabricForm from "@/components/Forms/FabricForm";
import FFInput from "@/components/Forms/FFInput";
import { useCreateOrderMutation } from "@/redux/api/ordersApi";
import { deleteCart } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserInfo } from "@/services/authService";
import { Box, Button, Checkbox, Container, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type TCartItem = {
  _id: string;
  title: string;
  image: string;
  price: number;
  salePrice?: number | null;
  quantity?: number | undefined;
};

const CheckoutPage = () => {
  const [createOrder] = useCreateOrderMutation();

  const data: any = useAppSelector((state) => state.cart.carts);
  const dispatch = useAppDispatch();

  const user: any = getUserInfo();

  const router = useRouter();

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

  const totalAmount = cartData.reduce((total, item) => {
    const itemPrice =
      item.salePrice !== undefined ? item.salePrice : item.price;
    if (itemPrice !== null) {
      const itemTotal = itemPrice * (item.quantity || 1);
      return total + itemTotal;
    }

    return total;
  }, 0);

  const subtotal = totalAmount;
  // Shipping state: 60 for inside Dhaka, 120 for outside
  const [shipping, setShipping] = useState(60);
  const grandTotal = subtotal + shipping;

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

  const handleCreateOrder = async () => {
    const toastId = toast.loading("Creating...");

    const newOrder = {
      userId: user?.userId,
      userEmail: user?.email,
      items: cartData.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.salePrice || item.price,
      })),
      totalAmount: subtotal + 15,
      status: "pending",
    };

    console.log(newOrder);

    try {
      const res: any = await createOrder(newOrder);
      if (res?.data?.success) {
        toast.success(res.data?.message, { id: toastId });
        dispatch(deleteCart());
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container sx={{
      my: 12
    }}>
      <Stack direction={'row'} justifyContent={'center'} mb={5}>
        <Typography variant="h4" fontWeight={600} mb={2} alignItems={'center'} sx={{
          color: 'black'
        }}>
          Place Your Order
        </Typography>
      </Stack>
      <Stack direction={'row'}>
        {/* Checkout form */}
        <Box sx={{
          width: "50%",
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          p: 2,
        }} >
          <FabricForm onSubmit={() => { }} >
            {/* Form fields can be added here if needed */}
            <Stack direction={'column'} gap={2}>
              <FFInput label="Full Name" name="fullName" required fullWidth />
              <FFInput label="Email" name="email" required fullWidth />
              <FFInput label="Address" name="address" required fullWidth multiline rows={5} />
            </Stack>

            <Stack direction={'row'} alignItems={'center'}>
              <Checkbox
                color="default"
                checked={shipping === 60}
                onChange={() => setShipping(60)}
              />
              <span className="text-[16px] text-black">Inside Dhaka-60TK</span>
            </Stack>

            <Stack direction={'row'} alignItems={'center'} sx={{ mt: -2 }}>
              <Checkbox
                color="default"
                checked={shipping === 120}
                onChange={() => setShipping(120)}
              />
              <span className="text-[16px] text-black">Outside Dhaka-120TK</span>
            </Stack>

            <Button variant="contained" color="primary" sx={{ mt: 3 }} fullWidth onClick={handleCreateOrder}>
              Place Order
            </Button>

          </FabricForm>
        </Box>

        {/* Order summary */}
        <Box
          sx={{
            width: "50%",
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            p: 2,
            ml: 4,
            borderRadius: 2,
            bgcolor: '#fff',
            height: 'fit-content',
          }}
        >
          <Typography variant="h6" fontWeight={600} mb={2}>
            Order Summary
          </Typography>
          {cartData.length === 0 ? (
            <Typography color="text.secondary">Your cart is empty.</Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box>
                {cartData.map((item) => (
                  <Box key={item._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Image src={item.image} width={40} height={40} alt={item.title} style={{ borderRadius: 4, objectFit: 'cover' }} />
                      <Box>
                        <Typography fontWeight={500}>{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantity: {item.quantity}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography fontWeight={600}>
                      ৳ {(item.salePrice ?? item.price) * (item.quantity || 1)}
                    </Typography>
                  </Box>
                ))}
                <Box sx={{ borderTop: '1px solid #eee', my: 2 }} />
              </Box>
              <Box sx={{ flex: 1 }} />
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>৳ {subtotal}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Shipping</Typography>
                  <Typography>৳ {shipping}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, mt: 2 }}>
                  <Typography>Total</Typography>
                  <Typography>৳ {grandTotal}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Stack>
    </Container >
  );
};

export default CheckoutPage;
