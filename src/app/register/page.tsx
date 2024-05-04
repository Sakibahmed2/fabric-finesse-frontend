"use client";

import storeIcon from "@/assets/icons/store.png";
import FFInput from "@/components/Forms/FFInput";
import FabricForm from "@/components/Forms/FabricForm";
import { useRegisterUserMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 character"),
});

// type TUserRegister = {
//   name: string;
//   email: string;
//   password: string;
// };

const defaultValues = {
  name: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("Loading..");
    try {
      const res: any = await registerUser(values);
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
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
            maxWidth: 500,
            width: "100%",
            boxShadow: 1,
            borderRadius: 2,
            p: 6,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              mb: 4,
            }}
          >
            <Box>
              <Image src={storeIcon} height={60} width={60} alt="icon" />
            </Box>
            <Box>
              <Typography variant="h4" component={"h2"}>
                User register
              </Typography>
            </Box>
          </Stack>

          <FabricForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(userValidationSchema)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <FFInput name="name" label="Name" fullWidth={true} />
              </Grid>
              <Grid item xs={12} md={6}>
                <FFInput name="email" label="Email" fullWidth />
              </Grid>
              <Grid item xs={12} md={6}>
                <FFInput name="password" label="Password" fullWidth />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              sx={{
                my: 2,
              }}
            >
              Register
            </Button>

            <Typography component={"p"}>
              Do you have an account ?{" "}
              <Link href={"/login"} className="text-blue-500 underline">
                Login
              </Link>
            </Typography>
          </FabricForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
