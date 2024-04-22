"use client";

import { Box, CircularProgress } from "@mui/material";
import React from "react";

const FFLoading = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"90vh"}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default FFLoading;
