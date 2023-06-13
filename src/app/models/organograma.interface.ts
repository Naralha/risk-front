import { Empresa } from "./empresa.interface";

export interface Organograma {
  id?: number;
  name: string;
  empresa?: Empresa;
  children?: Organograma[];
}