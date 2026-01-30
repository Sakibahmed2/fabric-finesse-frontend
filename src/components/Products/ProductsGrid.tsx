"use client";

import { Box, Grid, Typography } from "@mui/material";
import ClothCard from "@/components/ui/ClothCard";
import { TProduct } from "@/types/global";
import { ProductGridSkeleton } from "@/components/ui/Skeletons/Skeletons";

export interface ProductsGridProps {
    products: TProduct[];
    isLoading?: boolean;
    emptyMessage?: string;
}

const ProductsGrid = ({
    products,
    isLoading = false,
    emptyMessage = "No products found matching your criteria"
}: ProductsGridProps) => {
    if (isLoading) {
        return <ProductGridSkeleton count={8} />;
    }

    if (!products || products.length === 0) {
        return (
            <Box
                sx={{
                    py: 8,
                    textAlign: 'center',
                    bgcolor: '#f9f9f9',
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    {emptyMessage}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters or search terms
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid item xs={6} sm={4} md={4} lg={3} key={product._id}>
                    <ClothCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductsGrid;
