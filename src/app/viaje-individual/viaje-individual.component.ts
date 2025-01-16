import {Component, Input, OnInit} from '@angular/core';
import {BotonTarjetaComponent} from "../boton-tarjeta/boton-tarjeta.component";
import {EncabezadoComponent} from "../encabezado/encabezado.component";
import {EnpiesadoComponent} from "../enpiesado/enpiesado.component";
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
import {ViajeService} from "../servicio/viaje.service";
import {PerfilPuro} from "../modelo/PerfilPuro";
import {NgForOf} from "@angular/common";
import {LabelComponent} from "../label/label.component";

@Component({
  selector: 'app-viaje-individual',
  templateUrl: './viaje-individual.component.html',
  styleUrls: ['./viaje-individual.component.scss'],
  standalone: true,

  imports: [
    BotonTarjetaComponent,
    EncabezadoComponent,
    EnpiesadoComponent,
    IonicModule,
    RouterLink,
    NgForOf,
    LabelComponent
  ]
})
export class ViajeIndividualComponent implements OnInit
{
  constructor(private _viajeServices:ViajeService) { }

  _idViaje: number = Number(localStorage.getItem('idViaje'));

  /* Consulta a viajes
  * titulo
  */

  /* Consulta a actividades -> id_viaje
  * id_actividad
  */
  _titulo: string = 'Cargando...';
  _accion: string = 'editar';
  _usuarios: PerfilPuro[] = [];

  ngOnInit(): void
  {
    console.log('_idViaje: ', this._idViaje);
    this._viajeServices.get_Viaje(this._idViaje).subscribe
    ({
      next: (datos) => this._titulo = datos._nombre ?? 'Error',
      error: (error) => console.log('Error: ', error),
      complete: () => console.log('Viaje completado')
    });

    this._viajeServices.get_Participantes(this._idViaje).subscribe
    ({
      next: (datos) => this._usuarios = datos,
      error: (error) => console.log('Error: ', error),
      complete: () =>
      {
        console.log('Usuarios: ', this._usuarios);
        // TODO: calcular el total de lo que debe.
      }
    });


  }
}
