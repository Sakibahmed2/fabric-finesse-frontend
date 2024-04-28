"use client";

import FFInput from "@/components/Forms/FFInput";
import FabricForm from "@/components/Forms/FabricForm";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { TResponse } from "@/types/global";
import { Box, Button, Stack } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  review: "",
  userName: "",
};

const ReviewSection = ({ productId }: { productId: string }) => {
  const [createReview] = useCreateReviewMutation();

  const handleSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("Loading...");
    const reviewInfo = {
      review: values.review,
      userName: values?.userName,
      productId: productId,
    };

    try {
      const res: TResponse = await createReview(reviewInfo);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box my={10}>
      <Stack
        justifyContent={{
          md: "center",
        }}
        alignItems={{
          md: "center",
        }}
      >
        <Box>
          <FabricForm onSubmit={handleSubmit} defaultValues={defaultValues}>
            <Box
              width={{
                md: 600,
              }}
              mb={1}
            >
              <FFInput name="userName" label="Your name (optional)" fullWidth />
            </Box>
            <Box
              width={{
                md: 600,
              }}
            >
              <FFInput
                name="review"
                label="Your review"
                multiline
                rows={4}
                fullWidth
              />
            </Box>

            <Button
              type="submit"
              sx={{
                mt: 1,
              }}
            >
              Submit review
            </Button>
          </FabricForm>
        </Box>
      </Stack>
    </Box>
  );
};

export default ReviewSection;
