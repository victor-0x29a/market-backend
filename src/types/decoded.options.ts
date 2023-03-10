import { Roles } from "./roles.options";

export interface jwtDecoded {
  id: number;
  role: Roles;
}
