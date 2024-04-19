import { Box, CircularProgress } from "@mui/material";

const RootLoadingPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default RootLoadingPage;
