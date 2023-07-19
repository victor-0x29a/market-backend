import { z } from "zod";
export const EnterpriseNewSchema = z.object({
  name: z
    .string({
      required_error: "Requer um nome.",
      invalid_type_error: "Confira o nome.",
    })
    .min(4)
    .max(18),
  phone: z
    .string({
      required_error: "Requer um telefone.",
      invalid_type_error: "Confira o telefone, modelo: estado+numero",
    })
    .min(11)
    .max(11),
  cnpj: z.number().max(99999999999999),
  email: z.string().min(1).max(48).email(),
});
