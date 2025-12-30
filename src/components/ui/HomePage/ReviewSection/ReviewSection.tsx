
"use client";

import FFInput from "@/components/Forms/FFInput";
import FabricForm from "@/components/Forms/FabricForm";
import {
  useCreateReviewMutation,
  useGetReviewByProductIdQuery,
} from "@/redux/api/reviewApi";
import { TResponse } from "@/types/global";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const defaultValues = {
  review: "",
  userName: "",
};

type TReviewData = {
  _id?: string;
  productId: string;
  review: string;
  userName: string;
};

const ReviewSection = ({ productId }: { productId: string }) => {
  const [createReview] = useCreateReviewMutation();
  const { data } = useGetReviewByProductIdQuery(productId);

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
        toast.success(res?.data?.message, { id: toastId });
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box my={14}>
      <Divider
        sx={{
          mb: 4,
          fontSize: 30,
        }}
      >
        Give your review
      </Divider>
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

        <Stack
          mt={2}
          direction={"column"}
          gap={1}
          sx={{
            width: "100%",
          }}
        >
          {data?.data?.map((review: TReviewData) => (
            <Stack
              key={review?._id}
              direction={"row"}
              gap={2}
              sx={{
                bgcolor: "lightgray",
                padding: "10px 10px",
                borderRadius: 2,
                border: "2px solid gray",
              }}
            >
              <Avatar>{review.userName.slice(0, 1)}</Avatar>
              <Box>
                <Typography
                  sx={{
                    color: "primary.main",
                    fontWeight: 600,
                  }}
                >
                  {review?.userName ? review?.userName : "User"}
                </Typography>
                <Typography>{review?.review}</Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReviewSection;
