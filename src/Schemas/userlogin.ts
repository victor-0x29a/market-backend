import { z } from "zod";

export const userAccountLoginSchema = z.object({
  firstName: z.string({
    invalid_type_error: "Confira seu nome...",
    required_error: "Confira seu nome!",
  }),
  password: z
    .string({
      invalid_type_error: "Confira sua senha...",
      required_error: "Confira sua senha!",
    })
    .min(6)
    .max(48),
});
