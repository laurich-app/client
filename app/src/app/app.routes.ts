import { Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';
import { UtilisateursComponent } from './gestionnaire/utilisateurs/utilisateurs.component';
import { GestionnaireComponent } from './gestionnaire/gestionnaire.component';
import { gestionnaireRoutes } from './gestionnaire/gestionnaire.routes';

export const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  {
    path: 'gestionnaire',
    component: GestionnaireComponent,
    children: gestionnaireRoutes,
  },
];
