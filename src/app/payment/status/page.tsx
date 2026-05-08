"use client";

import { Alert, Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PaymentStatusRouterPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const status = (searchParams.get("status") || "").toLowerCase();
        const query = searchParams.toString();

        if (status === "success") {
            router.replace(`/payment/success${query ? `?${query}` : ""}`);
            return;
        }

        if (status === "failed" || status === "fail") {
            router.replace(`/payment/fail${query ? `?${query}` : ""}`);
            return;
        }

        if (status === "cancelled" || status === "cancel") {
            router.replace(`/payment/cancel${query ? `?${query}` : ""}`);
        }
    }, [router, searchParams]);

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Stack spacing={2}>
                <Typography variant="h5" fontWeight={700}>
                    Resolving Payment Status
                </Typography>
                <Alert severity="info">
                    We are determining your payment result. If this does not redirect automatically, use one of the links below.
                </Alert>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button component={Link} href="/payment/success" variant="outlined">
                        Success Page
                    </Button>
                    <Button component={Link} href="/payment/fail" variant="outlined">
                        Fail Page
                    </Button>
                    <Button component={Link} href="/payment/cancel" variant="outlined">
                        Cancel Page
                    </Button>
                </Box>
            </Stack>
        </Container>
    );
};

export default PaymentStatusRouterPage;
