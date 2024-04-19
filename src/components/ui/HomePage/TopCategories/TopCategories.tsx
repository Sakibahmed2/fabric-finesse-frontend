import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import kidsShorts from "@/assets/kidsShorts.jpg";
import kidsTshirt from "@/assets/kidsTshairt.jpg";
import mensPolo from "@/assets/mensPolo.jpg";
import womansKurti from "@/assets/womensKurti.jpg";
import mansJacket from "@/assets/mensJacket.jpg";
import Image from "next/image";

const TopCategories = () => {
  return (
    <Box my={20}>
      <Container>
        <Stack direction={"column"}>
          <Box textAlign={"center"}>
            <Typography variant="h4" component="h1" fontWeight={600}>
              Top Categories
            </Typography>
            <Typography
              component="p"
              width={{
                md: 700,
              }}
              margin={"0 auto"}
            >
              Discover Fashion Essentials: Dive into our top categories and
              explore essential pieces that define your wardrobe. From versatile
              basics to statement pieces.
            </Typography>
          </Box>
          <Box>
            <div className="md:grid grid-cols-12 grid-rows-2 grid-flow-col gap-8 mt-10 space-y-5 md:space-y-0">
              <div className=" h-[513px] rounded-2xl col-span-4 lg:col-span-4 row-span-2">
                <Image
                  src={mensPolo}
                  height={513}
                  width={300}
                  alt="mensPolo"
                  className="object-cover h-full w-full rounded-lg"
                />
                <Typography
                  component="p"
                  sx={{
                    mt: -6,
                    ml: 2,
                    fontSize: 30,
                  }}
                >
                  Mens polo
                </Typography>
              </div>

              <div className=" h-[240px] rounded-2xl col-span-4 lg:col-span-4 row-span-1">
                <Image
                  src={womansKurti}
                  height={513}
                  width={300}
                  alt="mensPolo"
                  className="object-cover h-full w-full rounded-lg"
                />
                <Typography
                  component="p"
                  sx={{
                    mt: -6,
                    ml: 2,
                    fontSize: 30,
                  }}
                >
                  Women kurti
                </Typography>
              </div>
              <div className=" h-[240px] rounded-2xl col-span-4 lg:col-span-4 row-span-1">
                <Image
                  src={kidsTshirt}
                  height={513}
                  width={300}
                  alt="mensPolo"
                  className="object-cover h-full w-full rounded-lg"
                />
                <Typography
                  component="p"
                  sx={{
                    mt: -6,
                    ml: 2,
                    fontSize: 30,
                    color: "gray",
                  }}
                >
                  Kids t-shirt
                </Typography>
              </div>

              <div className=" h-[513px] rounded-2xl col-span-4 lg:col-span-4 row-span-2">
                <Image
                  src={mansJacket}
                  height={513}
                  width={300}
                  alt="mens"
                  className="object-cover h-full w-full rounded-lg"
                />
                <Typography
                  component="p"
                  sx={{
                    mt: -6,
                    ml: 2,
                    fontSize: 30,
                  }}
                >
                  Mans jacket
                </Typography>
              </div>
            </div>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default TopCategories;
