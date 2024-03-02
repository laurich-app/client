import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';
import { UtilisateursComponent } from './gestionnaire/utilisateurs/utilisateurs.component';
import { GestionnaireComponent } from './gestionnaire/gestionnaire.component';
import { gestionnaireRoutes } from './gestionnaire/gestionnaire.routes';
import { GestionnaireGuard } from './guard/gestionnaire.guard';
import { ProfileComponent } from './profile/profile.component';
import { profileRoutes } from './profile/profile.routes';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  {
    path: 'gestionnaire',
    component: GestionnaireComponent,
    children: gestionnaireRoutes,
    canActivate: [GestionnaireGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: profileRoutes,
    canActivate: [AuthGuard],
  },
];
