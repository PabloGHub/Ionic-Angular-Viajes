import {Component, Input, OnInit} from '@angular/core';
import {addIcons} from "ionicons";
import {arrowBackOutline, clipboardOutline, folderOutline, homeOutline, locationOutline} from "ionicons/icons";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-enpiesado',
  templateUrl: './enpiesado.component.html',
  styleUrls: ['./enpiesado.component.scss'],
  imports: [
    IonicModule, RouterModule, NgIf
  ],
  standalone: true
})
export class EnpiesadoComponent
{
  @Input() _direcion: string = '/home';
  @Input() _inicio: string = '/viajes';

  constructor()
  {
    addIcons({ arrowBackOutline, clipboardOutline, homeOutline, locationOutline, folderOutline});
  }
}
