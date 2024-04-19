import ClothCard from "@/components/ui/ClothCard";
import CountdownTimer from "@/components/ui/Countdown";
import { TProduct } from "@/types/global";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

const FlashSalePage = async () => {
  const res = await fetch(
    `https://style-sync-backend.vercel.app/api/v1/products`
  );
  const { data } = await res.json();

  const flashSale = data?.filter((item: TProduct) => item.sale);

  return (
    <Box pt={15} mb={10}>
      <Container>
        <Box textAlign={"center"}>
          <CountdownTimer durationInMinutes={30} />
        </Box>
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
          <div className="grid md:grid-cols-4 gap-10 ">
            {flashSale?.map((product: TProduct) => (
              <ClothCard key={product._id} product={product} />
            ))}
          </div>
        </Box>
        <Box textAlign={"center"} mt={5}>
          <Button variant="outlined">Load more</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FlashSalePage;
