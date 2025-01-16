import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BotonTarjetaComponent} from "../boton-tarjeta/boton-tarjeta.component";
import {EncabezadoComponent} from "../encabezado/encabezado.component";
import {EnpiesadoComponent} from "../enpiesado/enpiesado.component";
import {IonicModule} from "@ionic/angular";
import {CampoComponent} from "../campo/campo.component";
import {NgIf} from "@angular/common";
import {PerfilPuro} from "../modelo/PerfilPuro";
import {ViajeService} from "../servicio/viaje.service";
import {ViajePuro} from "../modelo/ViajePuro";
import {PerfilService} from "../servicio/perfil.service";

@Component({
  selector: 'app-gestionar-viaje',
  templateUrl: './gestionar-viaje.component.html',
  styleUrls: ['./gestionar-viaje.component.scss'],
  standalone: true,
  imports: [
    EncabezadoComponent,
    EnpiesadoComponent,
    IonicModule,
    CampoComponent,
    NgIf
  ]
})
export class GestionarViajeComponent implements OnInit
{
  _titulo: String = '';
  _direccion: String = '';
  _accion: string | null = null;
  _btn: String = '';
  _idViaje: number = 1;


  _valorNombre?: string|null = null;
  _valorDescripcion?: string|null = null;
  _valorContrasenna?: string|null = null;


  @ViewChild('campoNombre') _campoNombre?: CampoComponent;
  @ViewChild('campoDes') _campoDes?: CampoComponent;
  @ViewChild('campoContra') _campoContra?: CampoComponent


  constructor
  (
    private route: ActivatedRoute,
    private _viajeService: ViajeService,
    private _ruter:Router,
    private _perfilService: PerfilService
  ) { }
  ngOnInit(): void
  {
    this._accion = this.route.snapshot.paramMap.get('_accion');

    if(this._accion === 'crear')
    {
      this._btn = 'Viajar';
      this._direccion = '/viajes';
      this._titulo = 'Crear Viaje';
    }
    else if(this._accion === 'editar')
    {
      this._btn = 'Guardar';
      this._direccion = '/viaje-individual';
      this._titulo = 'Administrar Viaje';

      let _novoViaje = new ViajePuro();

      this._viajeService.get_Viaje(this._idViaje).subscribe
      ({
        next: (datos) => _novoViaje = datos,
        error: (error) => console.log('Error: ', error),
        complete: () =>
        {
          this._valorNombre = _novoViaje._nombre;
          this._valorDescripcion = _novoViaje._descripcion;
          this._valorContrasenna = _novoViaje._contraseña;
          this._idViaje = _novoViaje?._idViaje ?? -1;
        }
      });
    }

  }

  // Error: Viaje o Perfil no encontrado.
  guardar()
  {
    let _novoViaje = new ViajePuro();

    if (this._accion === 'editar')
      _novoViaje._idViaje = this._idViaje;

    _novoViaje._nombre = this._campoNombre?._valor;
    _novoViaje._descripcion = this._campoDes?._valor;
    _novoViaje._contraseña = this._campoContra?._valor;

    this._viajeService.post_Viaje(_novoViaje).subscribe
    ({
      next: (datos) => _novoViaje = datos,
      error: (error) => console.log('Error: ', error),
      complete: () =>
      {
        console.log(_novoViaje);
        localStorage.setItem('idViaje', _novoViaje._idViaje?.toString() ?? '-1');

        //Nota: Hacer cuando el sistema de persistencia del id este hecho.
        //TODO: Comprobar si es crear.
        //TODO: Comprobar el id del usuario.
        //TODO: Añadir el usuario al viaje.

        if (this._accion === 'crear')
        {
          let _idPerfil: number = Number(localStorage.getItem('miId'));
          this._perfilService.annaParticipante(_novoViaje._idViaje ?? 0, _idPerfil).subscribe
          ({
            error: (error) => console.log('Error: ', error),
            complete: () => this._ruter.navigate(['/viaje-individual'])
          });
        }

        if (this._accion === 'editar')
          this._ruter.navigate(['/viaje-individual']);
      }
    });


  }
}
