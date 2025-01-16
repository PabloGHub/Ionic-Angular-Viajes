import { Component, OnInit, Input } from '@angular/core';
import {
  IonApp, IonButton, IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg, IonRouterLink,
  IonRouterOutlet, IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {arrowBackOutline} from "ionicons/icons";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonIcon, IonImg, IonGrid, IonRow, IonCol, IonButton, IonRouterLink, RouterLink],
})
export class EncabezadoComponent
{
  @Input() _titulo: string = 'Encabezado de Error';
  @Input() _direcion: string = '';

  constructor()
  {
    addIcons({ arrowBackOutline });
  }

}
