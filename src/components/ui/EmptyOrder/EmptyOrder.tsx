import emptyBox from "@/assets/icons/emptyBox.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const EmptyOrder = () => {
  return (
    <Stack
      direction={"column"}
      gap={2}
      height={"80vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box>
        <Typography
          variant="h3"
          component={"p"}
          sx={{
            textAlign: "center",
            fontWeight: 600,
            color: "lightslategray",
          }}
        >
          Empty
        </Typography>
        <Typography
          component={"p"}
          sx={{
            fontSize: 20,
            textAlign: "center",
          }}
        >
          {" "}
          You have no order now!
        </Typography>
      </Box>
      <Image src={emptyBox} width={200} height={200} alt="emptyBox" />
      <Box>
        <Button
          component={Link}
          href="/products"
          endIcon={<ArrowRightAltIcon />}
        >
          Go to discover
        </Button>
      </Box>
    </Stack>
  );
};

export default EmptyOrder;
