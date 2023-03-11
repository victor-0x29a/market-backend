import { z } from "zod";
export const EditProductSchema = z.object({
  id: z.number().min(1).max(999999999),
  name: z.string().min(2).max(24),
  replacement: z.boolean(),
  enterprise: z.number().min(1).max(9999999),
  price: z.number(),
});
