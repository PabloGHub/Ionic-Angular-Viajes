import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ViajePuro} from "../modelo/ViajePuro";
import {Observable} from "rxjs";
import {PerfilPuro} from "../modelo/PerfilPuro";

@Injectable({
  providedIn: 'root'
})
export class PerfilService
{
  constructor(private _httpClient: HttpClient) {}

  get_Perfiles(_perfil:PerfilPuro): Observable<PerfilPuro>
  {
    return this._httpClient.post<any>('/api/perfil/encuentra', _perfil);
  }


  annaParticipante(_viaje:number, _usu:number): Observable<PerfilPuro>
  {
    return this._httpClient.post<PerfilPuro>(`/api/viaje/participantes/nuevo?_viaje=${_viaje}&_perfil=${_usu}`, null);
  }


  listarAmigos(_perfil:number): Observable<PerfilPuro[]>
  {
    return this._httpClient.get<PerfilPuro[]>(`/api/amigos?_perfil=${_perfil}`);
  }


  darmeUno(_perfil:number): Observable<PerfilPuro>
  {
    return this._httpClient.get<PerfilPuro>(`/api/perfil/darmeUno?_perfil=${_perfil}`);
  }
}
