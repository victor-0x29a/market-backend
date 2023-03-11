import { z } from "zod";

export const MethodsStock = z.union([
  z.literal("sub"),
  z.literal("add"),
  z.literal("break"),
]);

// Sub = Diminuir estque
// Add = Adicionar mais
// Break = Remover estoque por avaria
