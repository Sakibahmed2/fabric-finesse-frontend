'use client'

import {
    clearCart,
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
    selectCartItemsCount,
    selectCartTotal
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, Button, Divider, Drawer, IconButton, Typography, useMediaQuery } from "@mui/material";
import { GridAddIcon } from "@mui/x-data-grid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const CartModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const router = useRouter();
    const dispatch = useAppDispatch();
    const carts = useAppSelector((state) => state.cart.carts);
    const itemsCount = useAppSelector(selectCartItemsCount);

    const total = useAppSelector(selectCartTotal);
    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleIncrement = (item: { _id: string; color?: string; size?: string }) => {
        dispatch(incrementQuantity({ _id: item._id, color: item.color, size: item.size }));
    };

    const handleDecrement = (item: { _id: string; color?: string; size?: string }) => {
        dispatch(decrementQuantity({ _id: item._id, color: item.color, size: item.size }));
    };

    const handleRemove = (item: { _id: string; color?: string; size?: string }) => {
        dispatch(removeFromCart({ _id: item._id, color: item.color, size: item.size }));
    };


    return (
        <>
            <div className="fixed bottom-5 right-5 z-50">
                <Box>
                    <IconButton
                        aria-label="cart"
                        sx={{
                            bgcolor: "black",
                            padding: "10px",
                            ":hover": {
                                bgcolor: "black"
                            }
                        }}
                        onClick={handleOpen}
                    >
                        <Badge badgeContent={carts.length} color="primary">
                            <ShoppingCartIcon sx={{
                                color: 'white'
                            }} />
                        </Badge>
                    </IconButton>
                </Box>
            </div>

            <Drawer
                anchor="right"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: { xs: "100vw", sm: 400 },
                        maxWidth: "100vw",
                    },
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography variant="h6" fontWeight={600}>
                            Shopping Cart {itemsCount > 0 && `(${itemsCount})`}
                        </Typography>
                        <IconButton onClick={handleClose} aria-label="close cart">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider />

                    {/* Cart Items */}
                    <Box sx={{ flex: 1, overflowY: "auto", mt: 2 }}>
                        {carts.length === 0 ? (
                            <Box
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "text.secondary",
                                }}
                            >
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    Your cart is empty
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        router.push("/products");
                                        handleClose();
                                    }}
                                >
                                    Continue Shopping
                                </Button>
                            </Box>
                        ) : (
                            <>
                                {carts.map((item, index) => (
                                    <Box
                                        key={`${item._id}-${item.color}-${item.size}-${index}`}
                                        sx={{
                                            mb: 2,
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: "#f5f5f5",
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 2,
                                        }}
                                    >
                                        {/* Product Image */}
                                        {item.image && (
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    width: 70,
                                                    height: 70,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    style={{
                                                        objectFit: "cover",
                                                        borderRadius: 8,
                                                    }}
                                                />
                                            </Box>
                                        )}

                                        {/* Product Info */}
                                        <Box sx={{ flex: 1 }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                                <Typography
                                                    variant="body1"
                                                    fontWeight={500}
                                                    sx={{ mb: 0.5, flex: 1 }}
                                                >
                                                    {item.title}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleRemove(item)}
                                                    sx={{ ml: 1, color: "error.main" }}
                                                >
                                                    <DeleteOutlineIcon fontSize="small" />
                                                </IconButton>
                                            </Box>

                                            {/* Color and Size */}
                                            {(item.color || item.size) && (
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{ display: "block", mb: 0.5 }}
                                                >
                                                    {item.color && (
                                                        <span>
                                                            Color:{" "}
                                                            <strong style={{ textTransform: "capitalize" }}>
                                                                {item.color}
                                                            </strong>
                                                        </span>
                                                    )}
                                                    {item.color && item.size && " | "}
                                                    {item.size && (
                                                        <span>
                                                            Size:{" "}
                                                            <strong style={{ textTransform: "uppercase" }}>
                                                                {item.size}
                                                            </strong>
                                                        </span>
                                                    )}
                                                </Typography>
                                            )}

                                            {/* Price */}
                                            <Typography
                                                variant="body2"
                                                color="primary.main"
                                                fontWeight={600}
                                                sx={{ mb: 1 }}
                                            >
                                                ${(item.salePrice ?? item.price).toFixed(2)}
                                            </Typography>

                                            {/* Quantity Controls */}
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDecrement(item)}
                                                    sx={{
                                                        border: "1px solid",
                                                        borderColor: "divider",
                                                        width: 28,
                                                        height: 28,
                                                    }}
                                                >
                                                    <RemoveIcon fontSize="small" />
                                                </IconButton>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        minWidth: 32,
                                                        textAlign: "center",
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {item.quantity}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleIncrement(item)}
                                                    sx={{
                                                        border: "1px solid",
                                                        borderColor: "divider",
                                                        width: 28,
                                                        height: 28,
                                                    }}
                                                >
                                                    <GridAddIcon fontSize="small" />
                                                </IconButton>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{ ml: 1 }}
                                                >
                                                    = ${((item.salePrice ?? item.price) * item.quantity).toFixed(2)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                ))}

                                {/* Total */}
                                <Divider sx={{ my: 2 }} />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography variant="h6" fontWeight={600}>
                                        Total:
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        fontWeight={600}
                                        color="primary.main"
                                    >
                                        ${total.toFixed(2)}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>

                    {/* Footer Actions */}
                    {carts.length > 0 && (
                        <>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    LinkComponent={Link}
                                    href="/checkout"
                                >
                                    Proceed to Checkout
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    fullWidth
                                    onClick={handleClearCart}
                                >
                                    Clear Cart
                                </Button>
                            </Box>
                        </>
                    )}
                </Box>
            </Drawer>
        </>
    )
}

export default CartModal