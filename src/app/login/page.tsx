"use client";

import storeIcon from "@/assets/icons/store.png";
import FFInput from "@/components/Forms/FFInput";
import FabricForm from "@/components/Forms/FabricForm";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/authService";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [loginUser] = useLoginUserMutation();
  const router = useRouter();

  const handleSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("loading....");

    try {
      const res: any = await loginUser(values);
      if (res.data.success) {
        storeUserInfo({ accessToken: res?.data?.token });
        toast.success(res.data.message, { id: toastId });
        router.push("/");
      }
      console.log(res);
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
                User login
              </Typography>
            </Box>
          </Stack>

          <FabricForm onSubmit={handleSubmit} defaultValues={defaultValues}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FFInput name="email" label="Email" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <FFInput
                  name="password"
                  label="Password"
                  fullWidth
                  type="password"
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
              Login
            </Button>

            <Typography component={"p"}>
              Don&#8217;t have an account ?{" "}
              <Link href={"/register"} className="text-blue-500 underline">
                Register here
              </Link>
            </Typography>
          </FabricForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
