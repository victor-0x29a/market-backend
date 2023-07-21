import { z } from "zod";

export const userAccountSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: "Confira seu nome...",
      required_error: "Confira seu nome!",
    })
    .min(4)
    .max(18),
  role: z.union(
    [
      z.literal("administrador"),
      z.literal("financeiro"),
      z.literal("operador"),
      z.literal("empresa"),
    ],
    {
      required_error: "Confira seu cargo!",
      invalid_type_error: "Opa, confira seu cargo!",
    }
  ),
  password: z
    .string({
      invalid_type_error: "Confira sua senha...",
      required_error: "Confira sua senha!",
    })
    .min(6)
    .max(48),
  phone: z
    .number({
      invalid_type_error: "Apenas numeros para o telefone...",
      required_error: "Confira o numero de telefone...",
    })
    .min(1)
    .max(99999999),
});
