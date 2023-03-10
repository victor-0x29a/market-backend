import { z } from "zod";
export const EnterpriseNewSchema = z.object({
  name: z
    .string({
      required_error: "Requer um nome.",
      invalid_type_error: "Confira o nome.",
    })
    .min(4)
    .max(18),
  phone: z.number().min(4).max(99999999),
  cnpj: z.number().max(99999999999999),
  email: z.string().min(1).max(48).email(),
});
