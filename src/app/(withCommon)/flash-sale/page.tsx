import ClothCard from "@/components/ui/ClothCard";
import { TProduct } from "@/types/global";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

const FlashSalePage = async () => {
  const res = await fetch(
    `http://localhost:5000/api/v1/products`
  );
  const { data } = await res.json();

  const flashSale = data?.result?.filter((item: any) => item.discountPrice);

  console.log({ flashSale })

  return (
    <Box pt={15} mb={10}>
      <Container>
        {/* <Box textAlign={"center"}>
          <CountdownTimer durationInMinutes={30} />
        </Box> */}
        <Box>
          <Box>
            <Typography variant="h4" component="h1" fontWeight={600}>
              Flash sale
            </Typography>
            <Typography component="p" fontWeight={600} mt={2}>
              Show 1-12 of {data?.length} item(s)
            </Typography>
            <Typography
              component="p"
              width={{
                md: "70%",
              }}
            >
              A flash sale is a brief, high-energy promotion offering steep
              discounts on select items for a limited time. Its a rapid-fire
              shopping spree, enticing consumers with fleeting bargains and a
              sense of urgency.
            </Typography>
          </Box>
        </Box>
        <Box mt={5}>
          <Grid container spacing={2}>
            {flashSale?.map((product: TProduct) => (
              <Grid item xs={6} md={3} key={product._id}>
                <ClothCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box textAlign={"center"} mt={5}>
          <Button variant="outlined">Load more</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FlashSalePage;
