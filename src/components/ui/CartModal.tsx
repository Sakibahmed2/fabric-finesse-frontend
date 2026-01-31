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
import NavCartModal from "../Sheard/NavV2/NavCartModal";


const CartModal = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const carts = useAppSelector((state) => state.cart.carts);
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

            <NavCartModal open={open} onClose={handleClose} />
        </>
    )
}

export default CartModal