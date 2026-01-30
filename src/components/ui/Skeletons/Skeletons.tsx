"use client";

import React from "react";
import { Box, Skeleton, Grid, Card, CardContent } from "@mui/material";

// Product Card Skeleton
export const ProductCardSkeleton = () => (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Skeleton
            variant="rectangular"
            sx={{ paddingTop: "100%", width: "100%" }}
            animation="wave"
        />
        <CardContent sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width="80%" height={24} animation="wave" />
            <Skeleton variant="text" width="60%" height={20} animation="wave" />
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Skeleton variant="text" width="30%" height={28} animation="wave" />
                <Skeleton variant="text" width="30%" height={28} animation="wave" />
            </Box>
        </CardContent>
    </Card>
);

// Product Grid Skeleton - for products listing page
export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
    <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductCardSkeleton />
            </Grid>
        ))}
    </Grid>
);

// Product Details Skeleton
export const ProductDetailsSkeleton = () => (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
            {/* Image Gallery Skeleton */}
            <Grid item xs={12} md={6}>
                <Skeleton
                    variant="rectangular"
                    sx={{ width: "100%", paddingTop: "100%", borderRadius: 2 }}
                    animation="wave"
                />
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            variant="rectangular"
                            width={80}
                            height={80}
                            animation="wave"
                            sx={{ borderRadius: 1 }}
                        />
                    ))}
                </Box>
            </Grid>

            {/* Product Info Skeleton */}
            <Grid item xs={12} md={6}>
                <Skeleton variant="text" width="80%" height={40} animation="wave" />
                <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} animation="wave" />
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Skeleton variant="text" width={100} height={36} animation="wave" />
                    <Skeleton variant="text" width={80} height={36} animation="wave" />
                </Box>
                <Skeleton variant="text" width="100%" height={100} sx={{ mt: 2 }} animation="wave" />
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} variant="circular" width={32} height={32} animation="wave" />
                    ))}
                </Box>
                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} variant="rectangular" width={48} height={36} sx={{ borderRadius: 1 }} animation="wave" />
                    ))}
                </Box>
                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                    <Skeleton variant="rectangular" width={150} height={48} sx={{ borderRadius: 2 }} animation="wave" />
                    <Skeleton variant="rectangular" width={150} height={48} sx={{ borderRadius: 2 }} animation="wave" />
                </Box>
            </Grid>
        </Grid>
    </Box>
);

// Category Card Skeleton
export const CategoryCardSkeleton = () => (
    <Card sx={{ height: "100%", p: 2, textAlign: "center" }}>
        <Skeleton variant="circular" width={80} height={80} sx={{ mx: "auto" }} animation="wave" />
        <Skeleton variant="text" width="60%" height={24} sx={{ mx: "auto", mt: 2 }} animation="wave" />
    </Card>
);

// Categories Grid Skeleton
export const CategoriesGridSkeleton = ({ count = 6 }: { count?: number }) => (
    <Grid container spacing={2}>
        {Array.from({ length: count }).map((_, index) => (
            <Grid item xs={6} sm={4} md={2} key={index}>
                <CategoryCardSkeleton />
            </Grid>
        ))}
    </Grid>
);

// Table Row Skeleton - for dashboard tables
export const TableRowSkeleton = ({ columns = 5 }: { columns?: number }) => (
    <Box sx={{ display: "flex", gap: 2, py: 1.5, borderBottom: "1px solid #eee" }}>
        {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} variant="text" sx={{ flex: 1 }} height={24} animation="wave" />
        ))}
    </Box>
);

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) => (
    <Box>
        {/* Header */}
        <Box sx={{ display: "flex", gap: 2, py: 2, borderBottom: "2px solid #ddd" }}>
            {Array.from({ length: columns }).map((_, index) => (
                <Skeleton key={index} variant="text" sx={{ flex: 1 }} height={24} animation="wave" />
            ))}
        </Box>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, index) => (
            <TableRowSkeleton key={index} columns={columns} />
        ))}
    </Box>
);

// Dashboard Stats Card Skeleton
export const StatsCardSkeleton = () => (
    <Card sx={{ p: 3, height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={20} animation="wave" />
                <Skeleton variant="text" width="40%" height={36} sx={{ mt: 1 }} animation="wave" />
                <Skeleton variant="text" width="50%" height={16} sx={{ mt: 1 }} animation="wave" />
            </Box>
            <Skeleton variant="circular" width={48} height={48} animation="wave" />
        </Box>
    </Card>
);

// Dashboard Stats Grid Skeleton
export const StatsGridSkeleton = ({ count = 4 }: { count?: number }) => (
    <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
                <StatsCardSkeleton />
            </Grid>
        ))}
    </Grid>
);

// Profile Info Skeleton
export const ProfileSkeleton = () => (
    <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 4 }}>
            <Skeleton variant="circular" width={100} height={100} animation="wave" />
            <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="40%" height={32} animation="wave" />
                <Skeleton variant="text" width="60%" height={24} sx={{ mt: 1 }} animation="wave" />
            </Box>
        </Box>
        <Grid container spacing={2}>
            {Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={12} sm={6} key={index}>
                    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} animation="wave" />
                </Grid>
            ))}
        </Grid>
    </Box>
);

// Hero Section Skeleton
export const HeroSkeleton = () => (
    <Box sx={{ position: "relative", width: "100%", height: { xs: 300, md: 500 } }}>
        <Skeleton variant="rectangular" sx={{ width: "100%", height: "100%" }} animation="wave" />
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                width: "80%"
            }}
        >
            <Skeleton variant="text" width="60%" height={48} sx={{ mx: "auto" }} animation="wave" />
            <Skeleton variant="text" width="40%" height={24} sx={{ mx: "auto", mt: 2 }} animation="wave" />
            <Skeleton variant="rectangular" width={150} height={48} sx={{ mx: "auto", mt: 3, borderRadius: 2 }} animation="wave" />
        </Box>
    </Box>
);

// Order Card Skeleton
export const OrderCardSkeleton = () => (
    <Card sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Skeleton variant="text" width={120} height={24} animation="wave" />
            <Skeleton variant="rectangular" width={80} height={28} sx={{ borderRadius: 1 }} animation="wave" />
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Skeleton variant="rectangular" width={80} height={80} sx={{ borderRadius: 1 }} animation="wave" />
            <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="70%" height={24} animation="wave" />
                <Skeleton variant="text" width="40%" height={20} animation="wave" />
                <Skeleton variant="text" width="30%" height={20} animation="wave" />
            </Box>
        </Box>
    </Card>
);

// Orders List Skeleton
export const OrdersListSkeleton = ({ count = 3 }: { count?: number }) => (
    <Box>
        {Array.from({ length: count }).map((_, index) => (
            <OrderCardSkeleton key={index} />
        ))}
    </Box>
);

// Flash Sale Item Skeleton
export const FlashSaleItemSkeleton = () => (
    <Card sx={{ width: 200, flexShrink: 0 }}>
        <Skeleton variant="rectangular" sx={{ paddingTop: "100%" }} animation="wave" />
        <CardContent>
            <Skeleton variant="text" width="80%" height={20} animation="wave" />
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Skeleton variant="text" width="40%" height={24} animation="wave" />
                <Skeleton variant="text" width="30%" height={24} animation="wave" />
            </Box>
        </CardContent>
    </Card>
);

// Flash Sale Section Skeleton
export const FlashSaleSkeleton = () => (
    <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Skeleton variant="text" width={200} height={36} animation="wave" />
            <Box sx={{ display: "flex", gap: 1 }}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} variant="rectangular" width={50} height={50} sx={{ borderRadius: 1 }} animation="wave" />
                ))}
            </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, overflow: "hidden" }}>
            {Array.from({ length: 5 }).map((_, index) => (
                <FlashSaleItemSkeleton key={index} />
            ))}
        </Box>
    </Box>
);

export default {
    ProductCardSkeleton,
    ProductGridSkeleton,
    ProductDetailsSkeleton,
    CategoryCardSkeleton,
    CategoriesGridSkeleton,
    TableRowSkeleton,
    TableSkeleton,
    StatsCardSkeleton,
    StatsGridSkeleton,
    ProfileSkeleton,
    HeroSkeleton,
    OrderCardSkeleton,
    OrdersListSkeleton,
    FlashSaleItemSkeleton,
    FlashSaleSkeleton,
};
