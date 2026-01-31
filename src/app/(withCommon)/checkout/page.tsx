"use client";

import FabricForm from "@/components/Forms/FabricForm";
import FFInput from "@/components/Forms/FFInput";
import { useCreateOrderMutation } from "@/redux/api/ordersApi";
import { useValidateCouponMutation } from "@/redux/api/couponApi";
import { deleteCart, applyCoupon, removeCoupon } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserInfo } from "@/services/authService";
import { Box, Button, Checkbox, Container, Stack, Typography, TextField, IconButton, Chip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import CloseIcon from "@mui/icons-material/Close";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

type TCartItem = {
  _id: string;
  title: string;
  image: string;
  price: number;
  discountPrice?: number | null;
  quantity?: number | undefined;
  color?: string;
  size?: string;
};

const CheckoutPage = () => {
  const [createOrder] = useCreateOrderMutation();
  const [validateCoupon, { isLoading: isValidating }] = useValidateCouponMutation();

  const data: any = useAppSelector((state) => state.cart.carts);
  const appliedCouponData = useAppSelector((state) => state.cart.appliedCoupon);
  const dispatch = useAppDispatch();

  const user: any = getUserInfo();
  const router = useRouter();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

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
      item.discountPrice !== undefined ? item.discountPrice : item.price;
    if (itemPrice !== null) {
      const itemTotal = itemPrice * (item.quantity || 1);
      return total + itemTotal;
    }

    return total;
  }, 0);

  const subtotal = totalAmount;
  // Shipping state: 60 for inside Dhaka, 120 for outside
  const [shipping, setShipping] = useState(60);

  // Calculate discount
  const discount = appliedCouponData?.discount || 0;
  const grandTotal = subtotal + shipping - discount;

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

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    if (!user?.userId) {
      toast.error("Please login to apply coupon");
      return;
    }

    const toastId = toast.loading("Validating coupon...");
    setCouponError("");

    try {
      const res = await validateCoupon({
        code: couponCode.trim(),
        userId: user.userId,
        orderAmount: subtotal,
      }).unwrap();

      if (res?.data?.isValid) {
        dispatch(applyCoupon({
          code: couponCode.trim().toUpperCase(),
          discount: res.data.discount || 0,
        }));
        toast.success("Coupon applied successfully!", { id: toastId });
        setCouponCode("");
      } else {
        setCouponError(res?.data?.message || "Invalid coupon");
        toast.error(res?.data?.message || "Invalid coupon", { id: toastId });
      }
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Failed to apply coupon";
      setCouponError(errorMessage);
      toast.error(errorMessage, { id: toastId });
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponCode("");
    setCouponError("");
    toast.success("Coupon removed");
  };

  const handleCreateOrder = async (formData?: any) => {
    const toastId = toast.loading("Creating...");

    // Generate a unique order_id (for demo, use timestamp)
    const order_id = `ORD-${Date.now()}`;
    // Use address from form or fallback
    const address = formData?.address;

    const newOrder = {
      order_id,
      user_id: user?.userId,
      items: cartData.map((item) => ({
        product_id: item._id,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
      })),
      subtotal,
      delivery_fee: shipping,
      discount: discount,
      coupon_code: appliedCouponData?.code || null,
      total: grandTotal.toFixed(2),
      status: "pending",
      address,
    };

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
      mb: 12,
      mt: 5
    }}>

      <Stack direction={'row'} justifyContent={'center'} mb={5}>
        <Typography variant="h4" fontWeight={600} mb={2} alignItems={'center'} sx={{
          color: 'black'
        }}>
          Place Your Order
        </Typography>
      </Stack>


      <Stack direction={{
        xs: 'column',
        md: 'row'
      }} spacing={4}>
        {/* Checkout form */}
        <Box sx={{
          width: {
            xs: '100%',
            md: '50%'
          },
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          p: 2,
        }} >
          <FabricForm onSubmit={handleCreateOrder} >
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

            <Button variant="contained" color="primary" sx={{ mt: 3 }} fullWidth type="submit">
              Place Order
            </Button>
          </FabricForm>
        </Box>

        {/* Order summary */}
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '50%'
            },
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            p: 2,
            borderRadius: 2,
            bgcolor: '#fff',
            height: 'fit-content',
          }}
        >

          {/* Coupon Section */}
          <Box sx={{ mb: 2 }}>
            {!appliedCouponData ? (
              <Box>
                <Typography variant="subtitle2" fontWeight={600} mb={1}>
                  Have a coupon?
                </Typography>
                <Stack direction="row" spacing={1}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      setCouponError("");
                    }}
                    error={!!couponError}
                    helperText={couponError}
                    disabled={isValidating}
                  />
                  <Button
                    variant="outlined"
                    onClick={handleApplyCoupon}
                    disabled={isValidating || !couponCode.trim()}
                    sx={{ minWidth: '100px' }}
                  >
                    Apply
                  </Button>
                </Stack>
              </Box>
            ) : (
              <Box>
                <Chip
                  icon={<LocalOfferIcon />}
                  label={`${appliedCouponData.code} - ৳${appliedCouponData.discount.toFixed(2)} OFF`}
                  onDelete={handleRemoveCoupon}
                  color="success"
                  sx={{ width: '100%', justifyContent: 'space-between' }}
                />
              </Box>
            )}
            <Box sx={{ borderTop: '1px solid #eee', my: 2 }} />
          </Box>

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
                        {(item.color || item.size) && (
                          <Typography variant="body2" color="text.secondary">
                            {item.color && <span>Color: <b style={{ textTransform: 'capitalize' }}>{item.color}</b></span>}
                            {item.color && item.size && <span> | </span>}
                            {item.size && <span>Size: <b style={{ textTransform: 'capitalize' }}>{item.size}</b></span>}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Typography fontWeight={600}>
                      ৳ {(item.discountPrice ?? item.price) * (item.quantity || 1)}
                    </Typography>
                  </Box>
                ))}
                <Box sx={{ borderTop: '1px solid #eee', my: 2 }} />
              </Box>
              <Box sx={{ flex: 1 }} />



              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>৳ {subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Shipping</Typography>
                  <Typography>৳ {shipping.toFixed(2)}</Typography>
                </Box>
                {discount > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: 'success.main' }}>
                    <Typography>Discount</Typography>
                    <Typography>- ৳ {discount.toFixed(2)}</Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, mt: 2 }}>
                  <Typography>Total</Typography>
                  <Typography>৳ {grandTotal.toFixed(2)}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Stack>

    </Container>
  );
};

export default CheckoutPage;
