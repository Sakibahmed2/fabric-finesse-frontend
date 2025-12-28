"use client";

import { TProduct } from "@/types/global";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Link from "next/link";
import AddCartButton from "./AddCartButton/AddCartButton";

const ClothCard = ({ product }: { product: TProduct }) => {
  return (
    <Box
      sx={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        p: 1
      }}
    >
      <Box position="relative">
        <Typography
          position="absolute"
          top={10}
          right={10}
          component="span"
          hidden={!product.sale}
          sx={{
            bgcolor: "black",
            color: "white",
            padding: "2px 10px",
            borderRadius: "5px",
          }}
        >
          Sale
        </Typography>
      </Box>
      <Box component={Link} href={`/products/${product._id}`}>
        <Image
          className="rounded-sm"
          src={product.image}
          width={300}
          height={300}
          alt="products"
        />
      </Box>
      <Box mt={1}>
        <Typography component="p" fontSize={20}>
          {product.title.length > 20
            ? product.title.substring(0, 20) + "..."
            : product.title}
        </Typography>
        <Stack direction={"row"} justifyContent="space-between">
          {product.sale ? (
            <Stack direction={"row"} gap={1}>
              <Typography
                fontWeight={600}
                sx={{
                  textDecoration: "line-through",
                  color: "red",
                }}
              >
                ৳ {product.price}{" "}
              </Typography>
              <Typography fontWeight={600}>৳ {product.salePrice} </Typography>
            </Stack>
          ) : (
            <Typography fontWeight={600}>৳ {product.price}</Typography>
          )}


        </Stack>
        <Box>
          <AddCartButton
            _id={product._id}
            title={product.title}
            image={product?.image}
            price={product.price}
            salePrice={product.salePrice}
            fullWidthButton
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ClothCard;
