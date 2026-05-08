"use client";

import { deleteCart, removeCoupon } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { Alert, Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type PaymentVariant = "success" | "failed" | "cancelled";

type PaymentRedirectViewProps = {
    variant: PaymentVariant;
    title: string;
    message: string;
    clearCartOnMount?: boolean;
};

const severityByVariant: Record<PaymentVariant, "success" | "error" | "warning"> = {
    success: "success",
    failed: "error",
    cancelled: "warning",
};

const PaymentRedirectView = ({
    variant,
    title,
    message,
    clearCartOnMount = false,
}: PaymentRedirectViewProps) => {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();

    const transactionId =
        searchParams.get("transactionId") || searchParams.get("tran_id") || searchParams.get("tranId") || "";
    const orderId = searchParams.get("orderId") || searchParams.get("order_id") || "";

    useEffect(() => {
        if (!clearCartOnMount) return;
        dispatch(deleteCart());
        dispatch(removeCoupon());
    }, [clearCartOnMount, dispatch]);

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Stack spacing={2.5}>
                <Typography variant="h4" fontWeight={700}>
                    {title}
                </Typography>

                <Alert severity={severityByVariant[variant]}>{message}</Alert>

                <Box sx={{ p: 2, border: "1px solid #eee", borderRadius: 2, bgcolor: "#fff" }}>
                    <Stack spacing={1.5}>
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                            <Typography variant="body1">Redirect Status:</Typography>
                            <Chip
                                label={variant}
                                color={variant === "success" ? "success" : variant === "failed" ? "error" : "warning"}
                                size="small"
                            />
                        </Stack>

                        <Typography variant="body1">
                            Transaction ID: <strong>{transactionId || "N/A"}</strong>
                        </Typography>

                        <Typography variant="body1">
                            Order ID: <strong>{orderId || "N/A"}</strong>
                        </Typography>
                    </Stack>
                </Box>

                <Stack direction="row" spacing={1.5} flexWrap="wrap">
                    <Button component={Link} href="/profile" variant="contained">
                        View My Orders
                    </Button>
                    <Button component={Link} href="/" variant="outlined">
                        Back To Home
                    </Button>
                    <Button component={Link} href="/products" variant="text">
                        Continue Shopping
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};

export default PaymentRedirectView;
