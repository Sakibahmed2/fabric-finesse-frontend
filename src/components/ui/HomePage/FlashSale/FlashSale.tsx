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
