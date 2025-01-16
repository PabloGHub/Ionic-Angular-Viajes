import { Routes } from '@angular/router';
import {ViajesComponent} from "./viajes/viajes.component";
import {ViajeIndividualComponent} from "./viaje-individual/viaje-individual.component";
import {GestionarViajeComponent} from "./gestionar-viaje/gestionar-viaje.component";
import {UnirseViajeComponent} from "./unirse-viaje/unirse-viaje.component";
import {ActividadesComponent} from "./actividades/actividades.component";
import {ActividadComponent} from "./actividad/actividad.component";
import {PerfilComponent} from "./perfil/perfil.component";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'viajes',
    component: ViajesComponent,
  },
  {
    path: 'viaje-individual', // /:id
    component: ViajeIndividualComponent,
  },
  {
    path: 'gestionar-viaje/:_accion',
    component: GestionarViajeComponent,
  },
  {
    path: 'unise-viaje',
    component: UnirseViajeComponent,
  },
  {
    path: 'actividades',
    component: ActividadesComponent,
  },
  {
    path: 'actividad/:_accion/:_act',
    component: ActividadComponent,
  },
  {
    path: 'perfil/:id',
    component: PerfilComponent,
  }
];
