import { z } from "zod";

export const ID = z
  .string({
    invalid_type_error: "Confira o ID!",
    required_error: "Requer o ID!",
    description: "ID (Identificacão)",
  })
  .max(999999);

export const Numerico = z
  .number({
    invalid_type_error: "Confira o valor indicado!",
    required_error: "Requer o valor!",
    description: "VALOR NUMERICO",
  })
  .max(999999);

export const Method = z.string().min(2).max(8);
