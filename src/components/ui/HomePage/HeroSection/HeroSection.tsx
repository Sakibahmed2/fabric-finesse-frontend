"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Carousel from "./Carousel";
import { motion } from "framer-motion";
import Link from "next/link";

const textAnimation = {
  hidden: {
    scale: 0.2,
    y: -300,
  },
  visible: {
    y: 0,
    scale: 1,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 60,
    },
  },
};

const carouselAnimation = {
  hidden: {
    scale: 0.2,
    y: 300,
    opacity: 0,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.9,
      type: "spring",
      stiffness: 60,
    },
  },
};

const HeroSection = () => {
  return (
    <Box
      sx={{
        bgcolor: "#e1e1e6",
        height: "100vh",
      }}
    >
      <Container>
        <Stack
          pt={5}
        >
          <motion.div
            variants={textAnimation}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <Stack direction="column">
              <Typography
                component="h1"
                fontSize={{
                  md: 50,
                  xs: 30,
                }}
                fontWeight={600}
              >
                Find The Best Fashion Style{" "}
                <Typography
                  component="span"
                  color="primary.main"
                  fontSize={{
                    md: 50,
                    xs: 30,
                  }}
                  fontWeight={600}
                >
                  For You
                </Typography>
              </Typography>
            </Stack>
            <Typography
              component="p"
              width={{
                md: 600,
              }}
              mb={2}
              margin="0 auto"
            >
              Fabric finesse: Elevate your style effortlessly with curated
              fashion. Discover trendiness and affordability in our collection.
              Explore now for fashion that resonates.
            </Typography>
            <Button
              component={Link}
              href="/products"
              sx={{
                mt: 2,
              }}
            >
              Shop now
            </Button>
          </motion.div>

          {/* slider */}
          <motion.div
            variants={carouselAnimation}
            initial="hidden"
            animate="visible"
            className="mt-10"
          >
            <Carousel />
          </motion.div>
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;
