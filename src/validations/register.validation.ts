import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 character"),
});
