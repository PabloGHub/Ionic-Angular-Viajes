import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-boton-tarjeta',
  templateUrl: './boton-tarjeta.component.html',
  styleUrls: ['./boton-tarjeta.component.scss'],
  imports: [
    IonicModule,
    RouterModule,
    NgIf,
  ],
  standalone: true
})
export class BotonTarjetaComponent
{
  constructor() { }

  @Input() _titulo: string = "Botón";
  @Input() _descrpcion: string = ""; // Es el sitio mas sitio de los sitios existentes en los lugares de sitios.
  @Input() _contenido: string = ""; // Este es el contenido mas contenido de los contenidos exitentes en los lugares de contenidos.
  @Input() _direccion: string = "./";
  @Input() _estado?: any; // pasar json por body

  @Input() _btnContenido1: string|null = '';
  @Input() _btnContenido2: string|null = '';
  @Input() _btnDir1: string|null = '/.';
  @Input() _btnDir2: string|null = '/.';
}
