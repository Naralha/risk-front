export interface Permission {
  id?: number;
  name: string;
  path: string;
  children?: Permission[];
}