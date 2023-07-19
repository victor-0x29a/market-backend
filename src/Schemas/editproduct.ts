import { z } from "zod";
export const EditProductSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(24),
  hasReplacement: z.boolean(),
  enterprise: z.number().min(1).max(9999999),
  price: z.number(),
});
