import { sexo } from "./sex.options";
export interface ClienteFace {
  id?: number;
  name: string;
  age: number;
  phone: number;
  cpf: string;
  sex: sexo;
  address: string;
  complementAddress?: string;
}
