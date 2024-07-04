"use client";

import kidsTshirt from "@/assets/kidsTshairt.jpg";
import mansJacket from "@/assets/mensJacket.jpg";
import mensPolo from "@/assets/mensPolo.jpg";
import womansKurti from "@/assets/womensKurti.jpg";
import useScrollGrow from "@/hooks/useScrollGrow";
import { Box, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const TopCategories = () => {
  const { style, componentRef } = useScrollGrow({
    x: -200,
    y: 100,
    scale: 0.5,
    opacity: 0.7,
    time: 1.1,
  });

  const { style: secondDivStyle, componentRef: secondDivRef } = useScrollGrow({
    x: 0,
    y: 0,
    scale: 0.5,
    opacity: 0.5,
    time: 1.7,
  });

  const { style: thirdDivStyle, componentRef: thirdDivRef } = useScrollGrow({
    x: 0,
    y: 0,
    scale: 0.5,
    opacity: 0.5,
    time: 1,
  });

  const { style: lastDivStyle, componentRef: lastDivRef } = useScrollGrow({
    x: 200,
    y: 100,
    scale: 0.5,
    opacity: 0.7,
    time: 1.1,
  });

  return (
    <Box
      my={20}
      sx={{
        overflow: "hidden",
      }}
    >
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
              {/* first div */}
              <motion.div
                ref={componentRef}
                style={style}
                className=" h-[513px] rounded-2xl col-span-4 lg:col-span-4 row-span-2"
              >
                <Link href={"/products"}>
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
                </Link>
              </motion.div>

              {/* second div */}
              <motion.div
                ref={secondDivRef}
                style={secondDivStyle}
                className=" h-[240px] rounded-2xl col-span-4 lg:col-span-4 row-span-1"
              >
                <Link href={"/products"}>
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
                </Link>
              </motion.div>

              {/* third div */}
              <motion.div
                ref={thirdDivRef}
                style={thirdDivStyle}
                className=" h-[240px] rounded-2xl col-span-4 lg:col-span-4 row-span-1"
              >
                <Link href={"/products"}>
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
                </Link>
              </motion.div>

              {/* last div */}
              <motion.div
                ref={lastDivRef}
                style={lastDivStyle}
                className=" h-[513px] rounded-2xl col-span-4 lg:col-span-4 row-span-2"
              >
                <Link href={"/products"}>
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
                </Link>
              </motion.div>
            </div>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default TopCategories;
