import { Box, Container, Stack, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import gucci from "@/assets/footer/gucci.png";
import adidas from "@/assets/footer/adidas.png";
import chanel from "@/assets/footer/chanel.png";
import fila from "@/assets/footer/fila.png";
import hm from "@/assets/footer/hm (1).png";
import lacoste from "@/assets/footer/lacoste.png";
import tommy from "@/assets/footer/tommy.png";
import nike from "@/assets/footer/nike.png";
import authorised from "@/assets/footer/authorised.png";

const Footer = () => {
  return (
    <Box>
      <Box bgcolor={"lightgray"} py={2}>
        <Marquee direction="right">
          <Image
            src={gucci}
            height={50}
            width={50}
            alt="gucci"
            className="mx-14"
          />
          <Image
            src={lacoste}
            height={50}
            width={50}
            alt="lacoste"
            className="mx-14"
          />
          <Image
            src={chanel}
            height={50}
            width={50}
            alt="chanel"
            className="mx-14"
          />
          <Image
            src={nike}
            height={50}
            width={50}
            alt="nike"
            className="mx-14"
          />
          <Image
            src={fila}
            height={50}
            width={50}
            alt="fila"
            className="mx-14"
          />
          <Image
            src={adidas}
            height={50}
            width={50}
            alt="adidas"
            className="mx-14"
          />
          <Image
            src={authorised}
            height={50}
            width={50}
            alt="authorised"
            className="mx-14"
          />
          <Image src={hm} height={50} width={50} alt="hm" className="mx-14" />
          <Image
            src={gucci}
            height={50}
            width={50}
            alt="gucci"
            className="mx-14"
          />
          <Image
            src={tommy}
            height={50}
            width={50}
            alt="tommy"
            className="mx-14"
          />
        </Marquee>
      </Box>
      <Box bgcolor={"secondary.main"}>
        <Container>
          <Stack
            py={6}
            direction={{ md: "row" }}
            justifyContent={"space-between"}
          >
            <Box>
              <Typography component="p" fontWeight={600} color={"white"} py={4}>
                Products
              </Typography>

              <div className="space-y-4">
                <Typography component="p" color={"lightgray"}>
                  New Arrivals
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Best Sellers
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Clearance
                </Typography>
              </div>
            </Box>

            <Box>
              <Typography component="p" fontWeight={600} color={"white"} py={4}>
                Categories
              </Typography>

              <div className="space-y-4">
                <Typography component="p" color={"lightgray"}>
                  Mens Clothing
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Womens Clothing
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Kids Clothing
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Accessories
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Designer Brands
                </Typography>
              </div>
            </Box>

            <Box>
              <Typography component="p" fontWeight={600} color={"white"} py={4}>
                About Us
              </Typography>

              <div className="space-y-4">
                <Typography component="p" color={"lightgray"}>
                  Our Story
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Ethical Practices
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Sustainability Initiatives
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Quality Guarantee
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Community Involvement
                </Typography>
              </div>
            </Box>

            <Box>
              <Typography component="p" fontWeight={600} color={"white"} py={4}>
                Contact Us
              </Typography>

              <div className="space-y-4">
                <Typography component="p" color={"lightgray"}>
                  Email
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Phone Number
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Contact Form
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Live Chat
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Visit Us (Address)
                </Typography>
              </div>
            </Box>

            <Box>
              <Typography component="p" fontWeight={600} color={"white"} py={4}>
                Customer Care
              </Typography>

              <div className="space-y-4">
                <Typography component="p" color={"lightgray"}>
                  Size Guide
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Returns & Exchanges
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Shipping Information
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  Care Instructions
                </Typography>
                <Typography component="p" color={"lightgray"}>
                  FAQs
                </Typography>
              </div>
            </Box>
          </Stack>
        </Container>
        <div className="border border-dashed border-gray-500"></div>
        <Typography component="p" textAlign={"center"} color={"white"} py={4}>
          Copyright © 2024 Fabric finesse{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
