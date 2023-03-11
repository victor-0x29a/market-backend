import { z } from "zod";

/*
nome completo
idade em numero (int)
telefone
cpf
endereco
complemento de endereco
*/

export const ClienteSchema = z.object({
  name: z.string().min(4).max(48),
  age: z.number().min(18).max(70),
  phone: z.number().min(1).max(99999999),
  cpf: z.string().min(10).max(11),
  sex: z.union([
    z.literal("feminino"),
    z.literal("masculino"),
    z.literal("outro"),
  ]),
  address: z.string().min(4).max(24),
  complementAddress: z.string().min(4).max(24).optional(),
});
