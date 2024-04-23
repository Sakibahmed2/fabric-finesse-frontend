"use client";

import FFInput from "@/components/Forms/FFInput";
import FabricForm from "@/components/Forms/FabricForm";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import storeIcon from "@/assets/icons/store.png";
import Image from "next/image";
import { useCreateProductMutation } from "@/redux/api/productsApi";
import { toast } from "sonner";

const defaultValues = {
  image: "",
  title: "",
  description: "",
  price: "",
  brand: "",
};

const CreateProduct = () => {
  const [addProduct] = useCreateProductMutation();

  const handleSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("Creating....");

    (values.rating = 5),
      (values.sale = false),
      (values.salePrice = ""),
      console.log(values);

    try {
      const res: any = await addProduct(values);
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: toastId });
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 600,
            boxShadow: 1,
            borderRadius: 2,
            p: 6,
            textAlign: "center",
          }}
        >
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box>
              <Image src={storeIcon} height={60} width={60} alt="storeIcon" />
            </Box>
            <Box my={2}>
              <Typography variant="h5" fontWeight={600}>
                Create product
              </Typography>
            </Box>
          </Stack>

          <Box>
            <FabricForm onSubmit={handleSubmit} defaultValues={defaultValues}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <FFInput name="image" label="Image url" fullWidth={true} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FFInput name="title" label="Name" fullWidth={true} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FFInput name="price" label="Price" fullWidth={true} />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FFInput name="brand" label="Brand" fullWidth={true} />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FFInput
                    name="description"
                    label="Description"
                    fullWidth={true}
                    multiline
                    rows={4}
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                sx={{
                  my: 2,
                }}
              >
                Create product
              </Button>
            </FabricForm>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreateProduct;
