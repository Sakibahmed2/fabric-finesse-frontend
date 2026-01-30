import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import ClothCard from "../../ClothCard";

const FlashSale = async () => {
  const res = await fetch(
    `http://localhost:5000/api/v1/products`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await res.json();

  const saleProducts = data?.result?.filter((product: any) => product.discountPrice);

  return (
    <Box sx={{
      mb: 20,
      mt: 10
    }}>
      <Container>
        <Box>
          <Stack
            direction={{
              md: "row",
            }}
            justifyContent="space-between">
            <Box>
              <Typography variant="h4" component="h1" fontWeight={600} fontSize={{
                xs: 30,
                md: 40
              }}>
                Sale Products
              </Typography>
              <Typography
                component="p"
                width={{
                  md: "50%",
                }}
                mt={2}
                fontSize={{
                  xs: 14,
                  md: 16
                }}
              >
                Don&apos;t miss out on our exclusive flash sale! Enjoy limited-time
                discounts on a curated selection of fashion essentials.
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 2,
                }}
                component={Link}
                href="/flash-sale"
              >
                See All <ArrowCircleRightOutlinedIcon />
              </Button>
            </Box>

          </Stack>
        </Box>
        <Box mt={4}>
          <Grid container spacing={2}>
            {saleProducts?.slice(0, 4)?.map((product: any) => (
              <Grid item xs={6} md={3} key={product._id}>
                <ClothCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FlashSale;
