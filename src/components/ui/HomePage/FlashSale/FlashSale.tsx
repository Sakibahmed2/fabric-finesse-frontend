import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ClothCard from "../../ClothCard";
import { TProduct } from "@/types/global";
import Link from "next/link";

const FlashSale = async () => {
  const res = await fetch(`http://localhost:5000/api/v1/products`, {
    next: {
      revalidate: 30,
    },
  });
  const { data } = await res.json();

  const saleProducts = data?.filter((product: TProduct) => product.sale);

  return (
    <Box my={20}>
      <Container>
        <Box>
          <Stack direction={"row"} justifyContent="space-between">
            <Typography variant="h4" component="h1" fontWeight={600}>
              Flash sale
            </Typography>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              component={Link}
              href="/flash-sale"
            >
              See All <ArrowCircleRightOutlinedIcon />
            </Button>
          </Stack>
        </Box>
        <Box mt={4}>
          <Stack
            direction={{
              md: "row",
            }}
            gap={3}
            sx={{
              margin: "0 auto",
            }}
          >
            {saleProducts?.slice(0, 4)?.map((product: TProduct) => (
              <ClothCard key={product._id} product={product} />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default FlashSale;
