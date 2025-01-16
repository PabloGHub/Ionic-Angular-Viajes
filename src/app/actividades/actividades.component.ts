import { Component, OnInit } from '@angular/core';
import {CampoComponent} from "../campo/campo.component";
import {EncabezadoComponent} from "../encabezado/encabezado.component";
import {EnpiesadoComponent} from "../enpiesado/enpiesado.component";
import {IonButton, IonContent, IonImg} from "@ionic/angular/standalone";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {BotonTarjetaComponent} from "../boton-tarjeta/boton-tarjeta.component";
import {Actividad} from "../modelo/Actividad";
import {ViajeService} from "../servicio/viaje.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss'],
  standalone: true,
  imports: [
    CampoComponent,
    EncabezadoComponent,
    EnpiesadoComponent,
    IonButton,
    IonContent,
    IonImg,
    RouterLink,
    BotonTarjetaComponent,
    NgForOf
  ]
})
export class ActividadesComponent implements OnInit
{
  _idViaje: number = Number(localStorage.getItem('idViaje'));
  _actividades: Actividad[] = [];

  constructor(private _viajeService: ViajeService) { }

  ngOnInit()
  {
    this._viajeService.get_Actividades(this._idViaje).subscribe
    ({
      next: (datos) => this._actividades = datos,
      error: (error) => console.log('Error: ', error),
      complete: () => console.log('Actividades completada')
    });
  }

  protected readonly JSON = JSON;
}
