'use client'

import AddCartButton from "@/components/ui/AddCartButton/AddCartButton";
import ImageAnimation from "@/components/ui/SingleProductAnimation/ImageAnimation";
import { TProduct } from "@/types/global";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box, Chip, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const ProductDetails = ({ product }: { product: TProduct }) => {
    const { _id, images, price, description, name, discountPrice, category, stock } = product || {};
    const savings = discountPrice ? price - discountPrice : 0;
    const savingsPercent = discountPrice && price ? ((savings / price) * 100) : 0;


    const [mainImg, setMainImg] = useState(
        images && images.length > 0 ? images[0] : "/placeholder.png"
    );

    return (
        <Box my={15}>
            <Container>
                <Stack direction={{ md: "row" }} gap={5} sx={{
                    borderBottom: '2px solid lightgray',
                    pb: 2
                }}>
                    {/* image gallery + main image */}
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        gap={2}
                        alignItems={{ xs: "center", md: "flex-start" }}
                    >
                        {/* Responsive layout: Thumbnails left on desktop, bottom on mobile */}
                        <Box
                            sx={{
                                display: { xs: "none", md: "block" },
                                mr: 2,
                            }}
                        >
                            <Stack
                                direction="column"
                                gap={1}
                                sx={{ alignItems: "flex-start", justifyContent: "flex-start" }}
                            >
                                {Array.isArray(images) && images.length > 0 ? (
                                    images.map((img: string, idx: number) => (
                                        <Box
                                            key={idx}
                                            sx={{
                                                border: mainImg === img ? "2px solid #1976d2" : "1px solid #ccc",
                                                borderRadius: 2,
                                                overflow: "hidden",
                                                cursor: "pointer",
                                                mb: 1,
                                            }}
                                            onClick={() => setMainImg(img)}
                                        >
                                            <Image
                                                src={img}
                                                alt={`product-thumb-${idx}`}
                                                width={70}
                                                height={70}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </Box>
                                    ))
                                ) : null}
                            </Stack>
                        </Box>
                        <Box>
                            <ImageAnimation
                                img={mainImg}
                                width={500}
                                height={500}
                                alt="product image"
                            />
                            {/* Thumbnails below main image on mobile */}
                            <Box
                                sx={{
                                    display: { xs: "block", md: "none" },
                                    mt: 2,
                                }}
                            >
                                <Stack
                                    direction="row"
                                    gap={1}
                                    sx={{ alignItems: "center", justifyContent: "center" }}
                                >
                                    {Array.isArray(images) && images.length > 0 ? (
                                        images.map((img: string, idx: number) => (
                                            <Box
                                                key={idx}
                                                sx={{
                                                    border: mainImg === img ? "2px solid #1976d2" : "1px solid #ccc",
                                                    borderRadius: 2,
                                                    overflow: "hidden",
                                                    cursor: "pointer",
                                                    mr: 1,
                                                }}
                                                onClick={() => setMainImg(img)}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`product-thumb-${idx}`}
                                                    width={70}
                                                    height={70}
                                                    style={{ objectFit: "cover" }}
                                                />
                                            </Box>
                                        ))
                                    ) : null}
                                </Stack>
                            </Box>
                        </Box>
                    </Stack>

                    {/* product info */}

                    <Box
                        width={{
                            md: 500,
                        }}
                    >
                        <Stack>
                            <Box>
                                <Box>
                                    <Typography component="h2" fontSize={30} fontWeight={600}>
                                        {name}
                                    </Typography>
                                </Box>
                                <Stack direction={"row"} gap={1} alignItems="center">
                                    <Box >
                                        {discountPrice ? (
                                            <Stack direction={"row"} gap={1} alignItems="center">
                                                <Typography
                                                    sx={{
                                                        textDecoration: "line-through",
                                                        color: "red",
                                                    }}
                                                    fontSize={25}
                                                    component={"p"}
                                                >
                                                    ৳ {price}{" "}
                                                </Typography>
                                                <Typography component={"p"} fontSize={25}>
                                                    ৳ {discountPrice}{" "}
                                                </Typography>
                                                {/* Savings */}
                                                <Chip label={`${((price - discountPrice) / price * 100).toFixed(0)}% OFF`} color="primary" size="small" sx={{
                                                    borderRadius: 1
                                                }} />

                                            </Stack>
                                        ) : (
                                            <Typography component={"p"} fontSize={25}>
                                                ৳ {price}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box>
                                        {/* <Rating name="simple-controlled" value={rating} /> */}
                                    </Box>
                                </Stack>
                                {/* Category */}
                                {category && (
                                    <Typography component="p" fontSize={16} color="text.secondary" mt={1}>
                                        Category: <span className="font-semibold">{category.name}</span>
                                    </Typography>
                                )}
                                {/* Stock */}
                                <Typography component="p" fontSize={16} fontWeight={600} color={stock > 0 ? "success.main" : "error.main"} mt={1}>
                                    In stock {stock > 0 ? `(${stock + " Available"})` : "Out of stock"}
                                </Typography>
                            </Box>
                            <Box mt={5}>
                                <Typography component={"p"} mt={4} fontSize={14}>
                                    <LocalShippingIcon /> Delivery inside dhaka ৳ 45 / outside
                                    dhaka ৳ 120
                                </Typography>
                                <Typography component={"p"} mt={1} fontSize={14}>
                                    <HomeRepairServiceIcon /> Delivers in: 3-7 Working Days
                                    Shipping & Return
                                </Typography>

                                <AddCartButton
                                    _id={_id}
                                    price={price}
                                    salePrice={discountPrice}
                                    title={name}
                                    image={images && images.length > 0 ? images[0] : "/placeholder.png"}
                                />
                            </Box>
                        </Stack>
                    </Box>
                </Stack>


                <Typography component={"p"} mt={2} fontWeight={600}>
                    Product Description
                </Typography>
                <Typography component={"p"} fontSize={14}>
                    {description}
                </Typography>

            </Container>
        </Box>
    )
}

export default ProductDetails