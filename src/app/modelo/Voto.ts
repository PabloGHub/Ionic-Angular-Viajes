import {PerfilPuro} from "./PerfilPuro";
import {ActividadPuro} from "./ActividadPuro";

export class Voto
{
  _idVoto: number|null = null;
  _perfil: PerfilPuro = new PerfilPuro();
  _Actividad: ActividadPuro = new ActividadPuro();
  _voto: number|null = null;
}
