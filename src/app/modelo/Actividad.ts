import {Fecha} from "./Fecha";
import {ViajePuro} from "./ViajePuro";
import {VotoPuro} from "./VotoPuro";

export class Actividad
{
  _idActividad?: number;
  _titulo?: string;
  _descripcion?: string;
  _precio: number = 0.00;
  _fecha?: Fecha;
  _Viaje?: ViajePuro;
  _Votos?: VotoPuro[];
}
