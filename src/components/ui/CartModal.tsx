'use client'

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, Drawer, IconButton, useMediaQuery, Button, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { deleteCart } from "@/redux/features/cartSlice";


const CartModal = () => {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');
    const carts = useAppSelector((state) => state.cart.carts);
    const dispatch = useAppDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleClearCart = () => dispatch(deleteCart());
    const handleCheckout = () => {
        // Implement navigation to checkout page if needed
        window.location.href = '/checkout';
    };

    const total = carts.reduce((sum, item) => sum + (item.salePrice ?? item.price), 0);

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
                        width: isMobile ? '100vw' : 400,
                        maxWidth: '100vw',
                    }
                }}
            >
                <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <span style={{ fontWeight: 600, fontSize: 20 }}>Your Cart</span>
                        <IconButton onClick={handleClose} aria-label="close">
                            <span style={{ fontSize: 24 }}>&times;</span>
                        </IconButton>
                    </Box>
                    <Divider />
                    <Box sx={{ flex: 1, overflowY: 'auto', mt: 2 }}>
                        {carts.length === 0 ? (
                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                                Cart is empty
                            </Box>
                        ) : (
                            <>
                                {carts.map((item) => (
                                    <Box key={item._id || item.title} sx={{ mb: 2, p: 1, borderRadius: 2, bgcolor: '#f5f5f5', display: 'flex', alignItems: 'center', gap: 2 }}>
                                        {/* Product Image */}
                                        <Box sx={{ minWidth: 60, minHeight: 60, mr: 1, display: 'flex', alignItems: 'center' }}>
                                            {item.image && (
                                                <Image src={item.image} alt={item.title} width={60} height={60} style={{ objectFit: 'cover', borderRadius: 8 }} />
                                            )}
                                        </Box>
                                        {/* Product Info */}
                                        <Box sx={{ flex: 1 }}>
                                            <Typography fontWeight={500}>{item.title}</Typography>
                                            <Typography color="text.secondary" fontSize={14}>
                                                Price: ${item.salePrice ?? item.price}
                                            </Typography>
                                            {/* Color and Size */}
                                            {(item.color || item.size) && (
                                                <Typography fontSize={13} color="text.secondary" mt={0.5}>
                                                    {item.color && <span>Color: <b style={{ textTransform: 'capitalize' }}>{item.color}</b></span>}
                                                    {item.color && item.size && <span> | </span>}
                                                    {item.size && <span>Size: <b style={{ textTransform: 'capitalize' }}>{item.size}</b></span>}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Typography fontWeight={600}>
                                            ${item.salePrice ?? item.price}
                                        </Typography>
                                    </Box>
                                ))}
                                <Divider />
                                <Box sx={{ mt: 2, fontWeight: 600, fontSize: 18, textAlign: 'right' }}>
                                    Total: ${total}
                                </Box>
                            </>
                        )}
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="contained" color="primary" fullWidth onClick={handleCheckout} disabled={carts.length === 0}>
                            Checkout
                        </Button>
                        <Button variant="outlined" color="error" fullWidth onClick={handleClearCart} disabled={carts.length === 0}>
                            Clear Cart
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}

export default CartModal