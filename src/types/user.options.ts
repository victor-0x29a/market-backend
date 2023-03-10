import { Roles } from "./roles.options";

export interface userAccount {
  id?: number;
  firstName: string;
  role: Roles;
  password: string;
  phone: number;
}

export default userAccount;
