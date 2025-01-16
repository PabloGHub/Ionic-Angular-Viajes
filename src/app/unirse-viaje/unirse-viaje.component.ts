import {booleanAttribute, Component, OnInit, ViewChild} from '@angular/core';
import {EncabezadoComponent} from "../encabezado/encabezado.component";
import {CampoComponent} from "../campo/campo.component";
import {Router, RouterLink} from "@angular/router";
import {EnpiesadoComponent} from "../enpiesado/enpiesado.component";
import {IonicModule} from "@ionic/angular";
import {PerfilService} from "../servicio/perfil.service";
import {ViajeService} from "../servicio/viaje.service";

@Component({
  selector: 'app-unirse-viaje',
  templateUrl: './unirse-viaje.component.html',
  styleUrls: ['./unirse-viaje.component.scss'],
  standalone: true,
  imports: [
    EncabezadoComponent,
    CampoComponent,
    RouterLink,
    EnpiesadoComponent,
    IonicModule
  ],
})
export class UnirseViajeComponent
{
  @ViewChild('campoViaje') _campoViaje?: CampoComponent;
  @ViewChild('campoContra') _campoContra?: CampoComponent;

  // Lo he sacado de home.page.ts o de la memoria o de donde sea
  _idPerfil: number = Number(localStorage.getItem('miId'));

  constructor(private _perfilService:PerfilService, private _viajeService:ViajeService, private _ruter:Router) { }


  guardar()
  {
    // @ts-ignore
    let _idViaje:number = Number(this._campoViaje._valor);
    // @ts-ignore
    let _contra:string = this._campoContra._valor;

    if (_idViaje == null || _contra == null)
    {
      console.log("Campos vacios");
      return;
    }

    console.log('idViaje:', _idViaje);

    let existe: boolean = false;
    this._viajeService.get_Viaje(_idViaje).subscribe
    ({
      next: (datos) => existe = (datos._contraseña === _contra),
      error: (error) => console.log('Error: ', error),
      complete: () =>
      {
        console.log('get_Viaje Completado:', existe);

        if (existe)
          this._perfilService.annaParticipante(_idViaje, this._idPerfil).subscribe
          ({
            error: (error) => console.log('Error: ', error),
            complete: () => this._ruter.navigate(['/viaje-individual'])
          });

      }
    });

  }
}
