"use client";

import ClothCard from "@/components/ui/ClothCard";
import FFLoading from "@/components/ui/Loading/FFLoading";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import { TProduct } from "@/types/global";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 12;

const FlashSalePage = () => {
  const [page, setPage] = useState(1);

  // Fetch all products (large limit to get them all for client-side filtering)
  const { data: products, isLoading } = useGetAllProductsQuery({
    limit: 9999,
  });

  // Filter only discounted products
  const discountedProducts: TProduct[] = useMemo(() => {
    const allProducts: TProduct[] = products?.data?.result || [];
    return allProducts.filter(
      (product) => product.discountPrice && product.discountPrice > 0
    );
  }, [products]);

  // Pagination logic
  const totalItems = discountedProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = discountedProducts.slice(startIndex, endIndex);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return <FFLoading />;
  }

  return (
    <Container sx={{
      mt: 2,
      mb: 10,

    }}>
      <Box>
        <Typography variant="h4" component="h1" fontWeight={600}>
          Flash Sale
        </Typography>
        <Typography
          component="p"
          width={{
            md: "70%",
          }}
          mt={1}
        >
          A flash sale is a brief, high-energy promotion offering steep
          discounts on select items for a limited time. It&apos;s a rapid-fire
          shopping spree, enticing consumers with fleeting bargains and a
          sense of urgency.
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography component="p" sx={{
          textAlign: "end",
          my: 1,
          color: 'text.secondary',
          fontSize: {
            xs: 14, md: 16
          }
        }}>
          Show {totalItems > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, totalItems)} of {totalItems} item(s)
        </Typography>

        {paginatedProducts.length > 0 ? (
          <Grid container spacing={2} sx={{ width: "100%" }}>
            {paginatedProducts.map((product: TProduct) => (
              <Grid item xs={6} md={4} lg={3} key={product._id} display="flex" justifyContent="center">
                <ClothCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ width: '100%', textAlign: 'center', py: 5 }}>
            <Typography variant="h6">No discounted products available right now.</Typography>
          </Box>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default FlashSalePage;
