import { Roles } from "./roles.options";

export interface UserEdit {
  firstName: string;
  role: Roles;
  phone: number;
}
