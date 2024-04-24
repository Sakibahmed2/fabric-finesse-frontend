"use client";

import { Button } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch } from "@/redux/hooks";
import { TCart, addToCart } from "@/redux/features/cartSlice";

const AddCartButton = ({ _id, title, price, salePrice }: TCart) => {
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
      }}
    >
      {" "}
      Add to cart
    </Button>
  );
};

export default AddCartButton;
