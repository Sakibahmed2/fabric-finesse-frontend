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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { deleteCart } from "@/redux/features/cartSlice";

interface NavCartModalProps {
    open: boolean;
    onClose: () => void;
}

const NavCartModal: React.FC<NavCartModalProps> = ({ open, onClose }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const carts = useAppSelector((state) => state.cart.carts);

    // Calculate total price
    const total = carts.reduce(
        (sum, item) => sum + (item.salePrice ?? item.price),
        0
    );

    const handleClearCart = () => {
        dispatch(deleteCart());
    };

    const handleCheckout = () => {
        router.push("/checkout");
        onClose();
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
                        Shopping Cart
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
                                    key={item._id || `${item.title}-${index}`}
                                    sx={{
                                        mb: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: "#f5f5f5",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    {/* Product Image */}
                                    {item.image && (
                                        <Box
                                            sx={{
                                                position: "relative",
                                                width: 60,
                                                height: 60,
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
                                        <Typography
                                            variant="body1"
                                            fontWeight={500}
                                            sx={{ mb: 0.5 }}
                                        >
                                            {item.title}
                                        </Typography>

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
                                                        <strong
                                                            style={{
                                                                textTransform: "capitalize",
                                                            }}
                                                        >
                                                            {item.color}
                                                        </strong>
                                                    </span>
                                                )}
                                                {item.color && item.size && " | "}
                                                {item.size && (
                                                    <span>
                                                        Size:{" "}
                                                        <strong
                                                            style={{
                                                                textTransform: "uppercase",
                                                            }}
                                                        >
                                                            {item.size}
                                                        </strong>
                                                    </span>
                                                )}
                                            </Typography>
                                        )}

                                        <Typography
                                            variant="body2"
                                            color="primary.main"
                                            fontWeight={600}
                                        >
                                            ${item.salePrice ?? item.price}
                                        </Typography>
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
                                onClick={handleCheckout}
                                size="large"
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
