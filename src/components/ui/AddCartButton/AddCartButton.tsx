"use client";

import { Button, SxProps } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";
import { getUserInfo } from "@/services/authService";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type TAddToCartButton = {
  _id: string | undefined;
  title: string;
  image: string;
  price: number;
  salePrice?: number | null;
  color?: string;
  size?: string;
  fullWidthButton?: boolean;
  sx?: SxProps;
  onBeforeAdd?: (cartProps: any) => any;
};

const AddCartButton = ({
  _id,
  title,
  image,
  price,
  salePrice,
  color,
  size,
  fullWidthButton = false,
  sx,
  onBeforeAdd,
}: TAddToCartButton) => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const user: any = getUserInfo();

  const handleAddToCart = () => {
    if (!_id) return;
    
    let cartProps = {
      _id,
      title,
      image,
      price,
      salePrice,
      color,
      size,
    };
    if (onBeforeAdd) {
      const result = onBeforeAdd(cartProps);
      if (!result) return;
      cartProps = result;
    }
    if (!user?.userId) {
      Swal.fire({
        title: "Please login",
        text: "You wan to login first to order this product",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          return router.push("/login");
        }
      });
    } else {
      dispatch(addToCart(cartProps));
    }
  };

  return (
    <Button
      onClick={() => handleAddToCart()}
      startIcon={<ShoppingCartIcon />}
      sx={{
        mt: 2,
        ...sx,
        borderRadius: "2px",
      }}
      fullWidth={fullWidthButton}
    >
      {" "}
      Add to cart
    </Button>
  );
};

export default AddCartButton;
