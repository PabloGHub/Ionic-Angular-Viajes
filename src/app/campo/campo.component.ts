import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-campo',
  templateUrl: './campo.component.html',
  styleUrls: ['./campo.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class CampoComponent
{
  constructor() { }

  @Input() _texto: string = 'Error';
  @Input() _placeholder: string = '';
  @Input() _tipo: string = 'text';
  @Input() _valor: string = '';

}
