"use client";

import React from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
    clearCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    selectCartTotal,
    selectCartItemsCount
} from "@/redux/features/cartSlice";
import Link from "next/link";

interface NavCartModalProps {
    open: boolean;
    onClose: () => void;
}

const NavCartModal: React.FC<NavCartModalProps> = ({ open, onClose }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const carts = useAppSelector((state) => state.cart.carts);
    const total = useAppSelector(selectCartTotal);
    const itemsCount = useAppSelector(selectCartItemsCount);

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
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
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
                    <IconButton onClick={onClose} aria-label="close cart">
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
                                    onClose();
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
                                                <AddIcon fontSize="small" />
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
    );
};

export default NavCartModal;