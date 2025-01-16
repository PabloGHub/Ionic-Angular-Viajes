import {Fecha} from "./Fecha";

export class ActividadPuro
{
  _idActividad?: number;
  _titulo?: string;
  _descripcion?: string;
  _precio: number = 0.00;
  _fecha?: Fecha;
}
