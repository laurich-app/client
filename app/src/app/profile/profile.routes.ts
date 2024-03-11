import { Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CommandesComponent } from './commandes/commandes.component';
import { IdComponent } from './commandes/id/id.component';
import { MeComponent } from './me/me.component';

export const profileRoutes: Routes = [
  { path: '', component: MeComponent },
  { path: 'commandes', component: CommandesComponent },
  { path: 'commandes/:id', component: IdComponent },
];
