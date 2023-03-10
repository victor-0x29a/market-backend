import { z } from "zod";

export const userAccountSchema = z.object({
  firstName: z.string(),
  role: z.union([
    z.literal("administrador"),
    z.literal("financeiro"),
    z.literal("operador"),
  ]),
  password: z.string(),
  phone: z.number().min(9).max(9),
});
