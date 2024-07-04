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
        direction={{
          md: "row",
        }}
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* login */}
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
          <Box
            sx={{
              bgcolor: "lightcyan",
              borderRadius: 2,
              mb: 2,
              padding: "10px 10px",
              textAlign: "start",
            }}
          >
            {/* admin credential */}
            <Typography component={"p"} fontSize={14}>
              Admin email:{" "}
              <Typography component={"span"} fontWeight={"600"} fontSize={14}>
                admin@gmail.com
              </Typography>{" "}
              / Pass:{" "}
              <Typography component={"span"} fontWeight={"600"} fontSize={14}>
                123456
              </Typography>{" "}
            </Typography>

            {/* user credential */}
            <Typography component={"p"} fontSize={14}>
              User email:{" "}
              <Typography component={"span"} fontWeight={"600"} fontSize={14}>
                test@gmail.com
              </Typography>{" "}
              / Pass:{" "}
              <Typography component={"span"} fontWeight={"600"} fontSize={14}>
                123456
              </Typography>{" "}
            </Typography>
          </Box>
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
              <Typography variant="h5" component={"h2"} fontWeight={600}>
                Login to your account
              </Typography>
              <Typography component={"p"} mt={1} fontSize={15}>
                Enter your email and password below to login or create an
                account
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
