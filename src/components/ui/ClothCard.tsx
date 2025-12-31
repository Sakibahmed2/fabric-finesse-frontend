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
        p: 1,
        height: "auto",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box position="relative">
        <Typography
          position="absolute"
          top={10}
          right={10}
          component="span"
          hidden={!product.discountPrice}
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
          src={Array.isArray(product.images) && product.images.length > 0 && product.images[0] ? product.images[0] : "/placeholder.png"}
          width={300}
          height={300}
          alt="products"
        />
      </Box>
      <Box mt={1} sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography component="p" fontSize={20}>
          {
            product?.name
          }
        </Typography>
        <Stack direction={"row"} justifyContent="space-between">
          {product.discountPrice ? (
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
              <Typography fontWeight={600}>৳ {product.discountPrice} </Typography>
            </Stack>
          ) : (
            <Typography fontWeight={600}>৳ {product.price}</Typography>
          )}


        </Stack>
        <Box sx={{ mt: 'auto' }}>
          <AddCartButton
            _id={product._id}
            title={product.name}
            image={product?.images[0]}
            price={product.price}
            salePrice={product.discountPrice}
            fullWidthButton
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ClothCard;
