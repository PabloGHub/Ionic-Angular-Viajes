import {Component, Input, OnInit} from '@angular/core';
import {EncabezadoComponent} from "../encabezado/encabezado.component";
import {IonicModule} from "@ionic/angular";
import {EnpiesadoComponent} from "../enpiesado/enpiesado.component";
import {LabelComponent} from "../label/label.component";
import {BotonTarjetaComponent} from "../boton-tarjeta/boton-tarjeta.component";
import {NgForOf, NgIf} from "@angular/common";
import {Actividad} from "../modelo/Actividad";
import {ViajeService} from "../servicio/viaje.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PerfilPuro} from "../modelo/PerfilPuro";
import {PerfilService} from "../servicio/perfil.service";
import {EliminarParticipante} from "../modelo/EliminarParticipante";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [
    EncabezadoComponent,
    IonicModule,
    EnpiesadoComponent,
    LabelComponent,
    BotonTarjetaComponent,
    NgForOf,
    RouterLink,
    NgIf
  ],
  standalone: true
})
export class PerfilComponent implements OnInit
{
  // Declaraciones //
  _idUsuario: number = -1;
  _miID: number = Number(localStorage.getItem('miId'));
  _tu?: boolean;
  _actividades: Actividad[] = [];
  _amigos: PerfilPuro[] = [];
  _usuario: PerfilPuro = new PerfilPuro();

  constructor
  (
    private route: ActivatedRoute,
    private _viajeService: ViajeService,
    private _perfilService: PerfilService,
    private router: Router
  ) { }


  ngOnInit(): void
  {
    this._idUsuario = Number(this.route.snapshot.paramMap.get('id')) ?? Number(localStorage.getItem('miId'));
    //console.log('ID: ', this._id);

    this._perfilService.darmeUno(this._idUsuario).subscribe
    ({
      next: (datos) => this._usuario = datos,
      error: (error) => console.log('Error: ', error),
      complete: () =>
      {
        console.log("Usuario: ", this._usuario);
        console.log("Mi ID: ", this._miID);

        if (this._miID == this._usuario._idPerfil)
            this._tu = true;

        console.log(this._tu);
      }
    });



    this._viajeService.get_Actividades(this._idUsuario).subscribe
    ({
      next: (datos) => this._actividades = datos,
      error: (error) => console.log('Error: ', error),
      complete: () => console.log('Actividades completada')
    });

    this._perfilService.listarAmigos(this._idUsuario).subscribe
    ({
      next: (datos) => this._amigos = datos,
      error: (error) => console.log('Error: ', error),
      complete: () => console.log('Amigos:', this._amigos)
    });
  }


  eliminarParticipante()
  {
      const _eliminar: EliminarParticipante = new EliminarParticipante();
      _eliminar._idPerfil = this._idUsuario;
      _eliminar._idViaje = Number(localStorage.getItem('idViaje'));

      this._viajeService.eliminarParticipante(_eliminar).subscribe
      ({
        error: (error) => console.log('Error: ', error),
        complete: () => this.router.navigate(['/viajes'])
      });
  }

}
