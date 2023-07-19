import { z } from "zod";

export const ProductNewSchema = z.object({
  name: z.string().min(2).max(24),
  barchar: z.string().min(12).max(13),
  stock: z.number().optional(),
  replacement: z.boolean(),
  enterprise: z.number().max(9999999),
  price: z.number(),
});
