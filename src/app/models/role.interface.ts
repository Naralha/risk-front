import { Permission } from "./permission.interface";

export interface Role {
  id?: number;
  nome: string,
  permissions: Permission[];
}