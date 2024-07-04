import AddCartButton from "@/components/ui/AddCartButton/AddCartButton";
import ReviewSection from "@/components/ui/HomePage/ReviewSection/ReviewSection";
import ImageAnimation from "@/components/ui/SingleProductAnimation/ImageAnimation";
import { TProduct } from "@/types/global";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Box, Container, Rating, Stack, Typography } from "@mui/material";
import Image from "next/image";

type TProps = {
  params: {
    productId: string;
  };
};

export const generateStaticParams = async () => {
  const res = await fetch(
    "https://fabric-finesse-backend.vercel.app/api/v1/products"
  );
  const { data } = await res.json();
  return data.slice(0, 10).map((product: TProduct) => ({
    productId: product._id,
  }));
};

const SingleProductPage = async ({ params }: TProps) => {
  const res = await fetch(
    `https://fabric-finesse-backend.vercel.app/api/v1/products/${params.productId}`,
    {
      cache: "no-store",
    }
  );
  const { data } = await res.json();

  const { _id, image, price, description, rating, title, salePrice, sale } =
    data || [];

  return (
    <Box my={15}>
      <Container>
        <Stack
          direction={{
            md: "row",
          }}
          gap={5}
        >
          {/* image */}

          <Box>
            {/* <Image src={image} width={500} height={500} alt="product image" /> */}
            <ImageAnimation
              img={image}
              width={500}
              height={500}
              alt="product image"
            />
          </Box>

          {/* product info */}

          <Box
            width={{
              md: 500,
            }}
          >
            <Stack>
              <Box borderBottom={"2px solid gray"} pb={5}>
                <Box>
                  <Typography component="h2" fontSize={30} fontWeight={600}>
                    {title}
                  </Typography>
                </Box>
                <Stack direction={"row"} gap={1}>
                  <Box borderRight={"2px solid black"} pr={1}>
                    {sale ? (
                      <Stack direction={"row"} gap={1}>
                        <Typography
                          sx={{
                            textDecoration: "line-through",
                            color: "red",
                          }}
                          fontSize={25}
                          component={"p"}
                        >
                          ৳ {price}{" "}
                        </Typography>
                        <Typography component={"p"} fontSize={25}>
                          ৳ {salePrice}{" "}
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography component={"p"} fontSize={25}>
                        ৳ {price}
                      </Typography>
                    )}
                  </Box>
                  <Box>
                    <Rating name="simple-controlled" value={rating} />
                  </Box>
                </Stack>
              </Box>

              <Typography component={"p"} mt={4}>
                {description}
              </Typography>
              <Box mt={5}>
                <Typography component={"p"} mt={4}>
                  <LocalShippingIcon /> Delivery inside dhaka ৳ 45 / outside
                  dhaka ৳ 120
                </Typography>
                <Typography component={"p"} mt={4}>
                  <HomeRepairServiceIcon /> Delivers in: 3-7 Working Days
                  Shipping & Return
                </Typography>

                <AddCartButton
                  _id={_id}
                  price={price}
                  salePrice={salePrice}
                  title={title}
                  image={image}
                />
              </Box>
            </Stack>
          </Box>
        </Stack>
        <Box>
          <ReviewSection productId={_id} />
        </Box>
      </Container>
    </Box>
  );
};

export default SingleProductPage;
