import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction={"column"} textAlign={"center"}>
        <Typography variant="h3" component="p" color="red">
          Opps!
        </Typography>
        <Typography variant="h1" component="p" color="gray" fontWeight={600}>
          404
        </Typography>
        <Typography variant="h4" component="p" color="primary.main">
          Route not found
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          href="/"
          sx={{
            mt: 2,
          }}
        >
          Go back to home
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFound;
