import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ViajePuro} from "../modelo/ViajePuro";
import {Observable} from "rxjs";
import {PerfilPuro} from "../modelo/PerfilPuro";
import {Actividad} from "../modelo/Actividad";
import {EliminarParticipante} from "../modelo/EliminarParticipante";

@Injectable({
  providedIn: 'root'
})
export class ViajeService
{
  constructor(private _httpClient: HttpClient) {}


  // listarViajes -> idUsuario
  get_Viajes(id:number): Observable<ViajePuro[]>
  {
    return this._httpClient.get<ViajePuro[]>('/api/viaje?_usu='+id);
  }

  // darmeUno -> idViaje
  get_Viaje(id:number): Observable<ViajePuro>
  {
    return this._httpClient.get<ViajePuro>('/api/viaje/darmeUno?_viaje='+id);
  }

  // crearViaje -> json
  post_Viaje(_viaje:ViajePuro): Observable<ViajePuro>
  {
    return this._httpClient.post<ViajePuro>('/api/viaje/nuevo', _viaje);
  }

  // verParticipantesViajes idViaje
  get_Participantes(id:number): Observable<PerfilPuro[]>
  {
    return this._httpClient.get<PerfilPuro[]>('/api/viaje/participantes?_viaje='+id);
  }

  // verActividades -> idViaje
  get_Actividades(id:number): Observable<Actividad[]>
  {
    return this._httpClient.get<Actividad[]>('/api/viaje/actividad?_viaje='+id);
  }

  // votarActividad -> idActividad, idUsuario, voto
  post_Voto(_act:number, _usu:number, _voto:number): Observable<Actividad>
  {
    return this._httpClient.post<Actividad>(`/api/viaje/actividad/votar?_act=${_act}&_usu=${_usu}&_voto=${_voto}`, null);
  }

  // proponerActividad -> json
  post_Actividad(_act:Actividad): Observable<Actividad>
  {
    return this._httpClient.post<Actividad>('/api/viaje/actividad/nueva', _act);
  }

  // eliminarParticipante -> json
  eliminarParticipante(_eliminar:EliminarParticipante): Observable<PerfilPuro>
  {
    return this._httpClient.post<PerfilPuro>('/api/viaje/participantes/eliminar', _eliminar);
  }
}
