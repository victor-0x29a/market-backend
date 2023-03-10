import { z } from "zod";

export const ID = z
  .number({
    invalid_type_error: "Confira o ID!",
    required_error: "Requer o ID!",
    description: "ID (Identificacao)",
  })
  .max(999999);
