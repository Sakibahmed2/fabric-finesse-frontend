"use client";

import { Button } from "@mui/material";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center mt-10  text-center">
      <p className="text-4xl bg-red-200 border-2 border-red-400 p-5 w-[50%] mx-auto rounded-xl">
        Something went wrong!!!
      </p>
      <p className="text-4xl bg-red-200 border-2 border-red-400 p-5 w-[50%] mx-auto rounded-xl mt-2">
        {error.message}
      </p>
      <Button
        onClick={() => reset()}
        sx={{
          mt: 2,
        }}
      >
        Try Again
      </Button>
    </div>
  );
};

export default ErrorPage;
