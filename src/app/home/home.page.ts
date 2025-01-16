import {Component, ViewChild} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonRouterOutlet,
  IonItem, IonLabel, IonInput, IonImg, IonRouterLink
} from '@ionic/angular/standalone';
import {EncabezadoComponent} from "../encabezado/encabezado.component";
import {EnpiesadoComponent} from "../enpiesado/enpiesado.component";
import {RouterModule} from "@angular/router";
import {CampoComponent} from "../campo/campo.component";
import {Router} from "@angular/router";
import {PerfilService} from "../servicio/perfil.service";
import {PerfilPuro} from "../modelo/PerfilPuro";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, EncabezadoComponent,
    IonRouterOutlet, EnpiesadoComponent, IonItem, IonLabel, IonInput, IonImg, RouterModule, CampoComponent],
})
export class HomePage
{
  @ViewChild('nombreCampo') _nombreCampo?: CampoComponent;
  @ViewChild('contrasennaCampo') _contrasennaCampo?: CampoComponent

  miId ?: number;

  constructor(private router: Router, private _perfilService:PerfilService) {}


  inicioSesion()
  {
    console.log("Inicio de sesion");

    if (
      // @ts-ignore
      this._nombreCampo._valor == null || this._nombreCampo._valor == '' ||
      // @ts-ignore
      this._contrasennaCampo._valor == null || this._contrasennaCampo._valor == ''
    )
    {
      console.log("Campos vacios");
      return;
    }

    const _novoPerfil: PerfilPuro = new PerfilPuro();
    // @ts-ignore
    _novoPerfil._nombre = this._nombreCampo._valor;
    // @ts-ignore
    _novoPerfil._password = this._contrasennaCampo._valor;

    this._perfilService.get_Perfiles(_novoPerfil).subscribe
    ({
      next: (datos) => this.miId = datos._idPerfil,
      error: (error) => console.log('Error: ', error),
      complete: () =>
      {
        if (this.miId != null)
        {
          localStorage.setItem('miId', this.miId.toString());
          this.router.navigate(['/viajes']);
        }
        console.log('Perfil completado');
      }

    })

    // const miId = localStorage.getItem('miId');
  }

}
