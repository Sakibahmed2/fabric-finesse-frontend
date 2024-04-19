"use client";

import FFInput from "@/components/Forms/FFInput";
import FabricForm from "@/components/Forms/FabricForm";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { FieldValues } from "react-hook-form";
import storeIcon from "@/assets/icons/store.png";

const defaultValues = {
  name: "",
};

const RegisterPage = () => {
  const handleSubmit = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 2,
            p: 6,
            textAlign: "center",
          }}
        >
          <FabricForm onSubmit={handleSubmit} defaultValues={defaultValues}>
            <Box
              sx={{
                mx: "auto",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" component={"h2"}>
                Register
              </Typography>
              <Image src={storeIcon} height={60} width={60} alt="icon" />
            </Box>

            <Grid container spacing={2}>
              <Grid item md={12}>
                <FFInput name="name" label="Name" fullWidth />
              </Grid>
              <Grid item md={6}>
                <FFInput name="email" label="Email" fullWidth />
              </Grid>
              <Grid item md={6}>
                <FFInput name="password" label="Password" fullWidth />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="outlined"
              sx={{
                mt: 2,
              }}
            >
              Register
            </Button>
          </FabricForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
