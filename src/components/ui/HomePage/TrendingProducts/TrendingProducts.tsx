import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { TProduct } from "@/types/global";
import ClothCard from "../../ClothCard";
import Link from "next/link";

const TrendingProducts = async () => {
  const res = await fetch(`http://localhost:5000/api/v1/products`, {
    next: {
      revalidate: 30,
    },
  });
  const { data } = await res.json();

  const trendingProducts = data.sort(
    (a: TProduct, b: TProduct) => b.rating - a.rating
  );

  return (
    <Box my={20}>
      <Container>
        <Box>
          <Stack
            direction={{
              md: "row",
            }}
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" component="h1" fontWeight={600}>
                Trending products
              </Typography>
              <Typography
                component="p"
                width={{
                  md: "50%",
                }}
                mt={2}
              >
                Explore our curated selection of trending products, featuring
                the latest in fashion-forward styles and seasonal favorites.
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
                href="/products"
              >
                See All <ArrowCircleRightOutlinedIcon />
              </Button>
            </Box>
          </Stack>
        </Box>

        <Box mt={5}>
          <div className="grid md:grid-cols-4 gap-10 ">
            {trendingProducts?.slice(0, 6)?.map((product: TProduct) => (
              <ClothCard key={product._id} product={product} />
            ))}
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default TrendingProducts;
