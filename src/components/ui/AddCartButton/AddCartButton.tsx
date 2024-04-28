"use client";

import { Button, SxProps } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";

type TAddToCartButton = {
  _id: string | undefined;
  title: string;
  price: number;
  salePrice?: number | null;
  fullWidthButton?: boolean;
  sx?: SxProps;
};

const AddCartButton = ({
  _id,
  title,
  price,
  salePrice,
  fullWidthButton = false,
  sx,
}: TAddToCartButton) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    const product = {
      _id,
      title,
      price,
      salePrice,
    };

    dispatch(addToCart(product));
  };

  return (
    <Button
      onClick={() => handleAddToCart()}
      startIcon={<ShoppingCartIcon />}
      sx={{
        mt: 2,
        ...sx,
      }}
      fullWidth={fullWidthButton}
    >
      {" "}
      Add to cart
    </Button>
  );
};

export default AddCartButton;
