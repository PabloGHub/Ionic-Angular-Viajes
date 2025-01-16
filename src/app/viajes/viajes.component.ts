import { Component, OnInit } from '@angular/core';
import {EncabezadoComponent} from "../encabezado/encabezado.component";
import {EnpiesadoComponent} from "../enpiesado/enpiesado.component";
import {IonicModule} from "@ionic/angular";
import {addIcons} from "ionicons";
import {arrowForwardOutline} from "ionicons/icons";
import {BotonTarjetaComponent} from "../boton-tarjeta/boton-tarjeta.component";
import {Router, RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {ViajePuro} from "../modelo/ViajePuro";
import {ViajeService} from "../servicio/viaje.service";

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.scss'],
  imports: [EncabezadoComponent, EnpiesadoComponent, IonicModule, BotonTarjetaComponent, RouterLink, NgForOf],
  standalone: true
})
export class ViajesComponent implements OnInit
{
  _accion: String = 'crear';
  _viajes: ViajePuro[] = [];

  constructor(private _viajeService: ViajeService, private _ruter:Router)
  {
    addIcons({ arrowForwardOutline });


  }

  ngOnInit(): void
  {
    let _idUsuario = Number(localStorage.getItem('miId'));
    console.log('_idUsuario: ', _idUsuario);
    this._viajeService.get_Viajes(_idUsuario).subscribe
    ({
      next: (datos) => this._viajes = datos,
      error: (error) => console.log('Error: ', error),
      complete: () => console.log('Viajes completada')
    });
  }


  irViaje(idViaje: number)
  {
    console.log('idViaje: ', idViaje);
    if (idViaje < 0)
      return;

    localStorage.setItem('idViaje', idViaje.toString());
    this._ruter.navigate(['/viaje-individual']);
  }


}
