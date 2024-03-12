import { Routes } from '@angular/router';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { BonDeCommandesComponent } from './bon-de-commandes/bon-de-commandes.component';
import { IdComponent as IDBonDeCommandeComponent } from './bon-de-commandes/id/id.component';
import { AjouterComponent as AjouterFournisseurComponent } from './fournisseurs/ajouter/ajouter.component';
import { ModifierComponent as ModifierFournisseurComponent } from './fournisseurs/id/modifier/modifier.component';
import { IdComponent as IDFournisseurComponent } from './fournisseurs/id/id.component';

export const gestionnaireRoutes: Routes = [
  { path: 'utilisateurs', component: UtilisateursComponent },
  { path: 'fournisseurs', component: FournisseursComponent },
  { path: 'fournisseurs/ajouter', component: AjouterFournisseurComponent },
  {
    path: 'fournisseurs/:id/modifier',
    component: ModifierFournisseurComponent,
  },
  { path: 'fournisseurs/:id', component: IDFournisseurComponent },
  { path: 'bon_de_commandes', component: BonDeCommandesComponent },
  { path: 'bon_de_commandes/:id', component: IDBonDeCommandeComponent },
];
