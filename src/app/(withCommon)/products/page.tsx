import ClothCard from "@/components/ui/ClothCard";
import { TProduct } from "@/types/global";
import {
  Box,
  Checkbox,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const ProductsPage = async () => {
  const res = await fetch(
    `https://fabric-finesse-backend.vercel.app/api/v1/products`
  );
  const { data } = await res.json();
  return (
    <Box my={10}>
      <Container>
        <Stack
          direction={{
            md: "row",
          }}
          gap={{
            md: 5,
          }}
        >
          <Box>
            <Box
              sx={{
                border: "2px solid gray",
                padding: "40px 20px",
                borderRadius: 2,
                width: {
                  md: 250,
                },
              }}
            >
              <Typography
                component="p"
                fontSize={25}
                borderLeft="5px solid black"
                padding={"0 10px"}
              >
                Price range
              </Typography>
              <Stack direction={"row"} alignItems={"center"}>
                <Checkbox />
                <Typography>৳ 20.00 - ৳ 50.00</Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <Checkbox />
                <Typography>৳ 60.00 - ৳ 90.00</Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <Checkbox />
                <Typography>৳ 100.00 - ৳ 130.00</Typography>
              </Stack>
            </Box>

            <Box
              sx={{
                border: "2px solid gray",
                padding: "40px 20px",
                borderRadius: 2,
                mt: 3,
                width: {
                  md: 250,
                },
              }}
            >
              <Typography
                component="p"
                fontSize={25}
                borderLeft="5px solid black"
                padding={"0 10px"}
              >
                Ratings
              </Typography>
              <Stack direction={"row"} alignItems={"center"}>
                <Checkbox />
                <Typography>1 star</Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <Checkbox />
                <Typography>2 star</Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <Checkbox />
                <Typography>3 star</Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <Checkbox />
                <Typography>4 star</Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <Checkbox />
                <Typography>5 star</Typography>
              </Stack>
            </Box>
          </Box>

          <Box
            mt={{
              xs: 4,
              md: 0,
            }}
          >
            <Typography variant="h4" component="h1" fontWeight={600}>
              Our Collection Of Products
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
            <Box mt={5}>
              {/* <div className="grid md:grid-cols-3 gap-10 ">
               
              </div> */}

              <Grid container spacing={2}>
                {data?.map((product: TProduct) => (
                  <Grid item xs={6} md={4} key={product._id}>
                    <ClothCard key={product._id} product={product} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductsPage;
