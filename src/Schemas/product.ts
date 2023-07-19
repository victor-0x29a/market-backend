import { z } from "zod";

export const ProductNewSchema = z.object({
  name: z.string().min(2).max(24),
  barchar: z.string().min(12).max(13),
  stock: z.number().optional(),
  hasReplacement: z.boolean(),
  enterprise: z.string(),
  price: z.number(),
});
