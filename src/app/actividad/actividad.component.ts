import {Component, OnInit, ViewChild} from '@angular/core';
import {EncabezadoComponent} from "../encabezado/encabezado.component";
import {IonicModule} from "@ionic/angular";
import {BotonTarjetaComponent} from "../boton-tarjeta/boton-tarjeta.component";
import {EnpiesadoComponent} from "../enpiesado/enpiesado.component";
import {CampoComponent} from "../campo/campo.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {LabelComponent} from "../label/label.component";
import {ViajeService} from "../servicio/viaje.service";
import {Actividad} from "../modelo/Actividad";
import {Router} from '@angular/router';
import {Fecha} from "../modelo/Fecha";

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss'],
  standalone: true,
  imports: [
    LabelComponent,
    EncabezadoComponent,
    IonicModule,
    EnpiesadoComponent,
    CampoComponent,
    NgIf
  ],
})
export class ActividadComponent implements OnInit
{
  // Delarciones //
  _accion: string | null = "crear";
  _titulo: String | null = 'Crear Actividades';
  _direccion: String = '';
  _megustas: number|null = null;
  _rechazar: number|null = null;


  _tituloActividad: string = '';
  _descripcionActividad: string = '';
  _precioActividad: number = 0;
  _fechaActividad: string = "";




  _act: Actividad = new Actividad();
  _idViaje: number = Number(localStorage.getItem('idViaje'));
  _idUsuario: number = Number(localStorage.getItem('miId'));



  // --- ViewChild --- //
  @ViewChild('campoTitulo') _campoTitulo?: CampoComponent;
  @ViewChild('campoDescripcion') _campoDescripcion?: CampoComponent;
  @ViewChild('campoPrecio') _campoPrecio?: CampoComponent;
  @ViewChild('campoFecha') _campoFecha?: CampoComponent;

  constructor(private route: ActivatedRoute, private _ruter: Router, private _viajeService:ViajeService) { }
  ngOnInit(): void
  {
    this._accion = this.route.snapshot.paramMap.get('_accion');
    if (this._accion == "editar")
      this._act = JSON.parse(this.route.snapshot.paramMap.get('_act') ?? '{}');


    //const navigation = this._ruter.getCurrentNavigation();
    //this._act = navigation?.extras.state;
    // Mi Peor enemigo soy yo.


    console.log('Accion: ', this._accion);
    console.log('Actividad2: ', this._act);


    this._idViaje = Number(localStorage.getItem('idViaje'));


    // TODO: rellenar los campos cuando sea editar
    switch (this._accion)
    {
      case 'editar':
        this._titulo = 'Editar Actividades';
        this._direccion = '/actividades';

        this._tituloActividad = this._act?._titulo || 'Error';
        this._descripcionActividad = this._act?._descripcion || 'Error';
        this._precioActividad = this._act?._precio || -1;


        this._fechaActividad += this._act?._fecha?._anno + "-" || '0000-';
        this._fechaActividad += this._act?._fecha?._mes?.toString().padStart(2, '0') + "-" || '00-';
        this._fechaActividad += this._act?._fecha?._dia?.toString().padStart(2, '0') || '00';

        // console.log(parseInt((this._fechaActividad || "-").split('-')[2]));
        // console.log(parseInt((this._fechaActividad || "-").split('-')[1]));
        // console.log(parseInt((this._fechaActividad || "-").split('-')[0]));


        //this._act._Votos?.forEach(v => console.log(v._voto));

        this._megustas = this._act?._Votos?.filter(v => v._voto == 1).length || 0;
        this._rechazar = this._act?._Votos?.filter(v => v._voto == 2).length || 0;
      break;

      default: // crear
        this._titulo = 'Crear Actividades';
        this._direccion = '/actividades';
      break;
    }
  }


  votarPositivo(): void
  {
    console.log("Votar Positivo");
    this._viajeService.post_Voto(this._act._idActividad ?? 0, this._idUsuario, 1).subscribe
    ({
      //next: (datos) => null,
      error: (error) => console.log('Error: ', error),
      complete: () =>
      {
        this.actualizar();
        console.log('Voto positivo completado');
      }
    });
  }
  votarNegativo(): void
  {
    console.log("Votar Negativo");
    this._viajeService.post_Voto(this._act._idActividad ?? 0, this._idUsuario, 2).subscribe
    ({
      //next: (datos) => null,
      error: (error) => console.log('Error: ', error),
      complete: () =>
      {
        this.actualizar();
        console.log('Voto negativo completado')
      }
    });
  }




  guardar(): void
  {
    let _act: Actividad = new Actividad();
    if (this._accion === 'editar')
      _act._idActividad = this._act._idActividad;

    _act._titulo = this._campoTitulo?._valor;
    _act._descripcion = this._campoDescripcion?._valor;
    _act._precio = parseInt(this._campoPrecio?._valor || '0.00');


    _act._fecha = new Fecha();
    _act._fecha._dia = parseInt((this._campoFecha?._valor || "-").split('-')[2]);
    _act._fecha._mes = parseInt((this._campoFecha?._valor || "-").split('-')[1]);
    _act._fecha._anno = parseInt((this._campoFecha?._valor || "-").split('-')[0]);



    _act._Viaje = { _idViaje: this._idViaje };
    console.log('Actividad: ', _act);


    this._viajeService.post_Actividad(_act).subscribe
    ({
      next: (datos) => console.log('Datos: ', datos),
      error: (error) => console.log('Error: ', error),
      complete: () => this._ruter.navigate(["/actividades"])
    });

  }


  // Si estuviera bien hecho no aria falta recorer la lista de actividades
  // pero mala planificacion + falta de tiempo = esto.
  actualizar(): void
  {
    let _actividades: Actividad[] = [];
    let _idviaje: number = Number(localStorage.getItem('idViaje'));

    this._viajeService.get_Actividades(this._idViaje).subscribe
    ({
      next: (datos) => _actividades = datos,
      error: (error) => console.log('Error: ', error),
      complete: () =>
      {
        let _act: Actividad | undefined = _actividades.find(a => a._idActividad == this._act._idActividad);

        this._megustas = _act?._Votos?.filter(v => v._voto == 1).length || 0;
        this._rechazar = _act?._Votos?.filter(v => v._voto == 2).length || 0;
      }
    });

  }

}
