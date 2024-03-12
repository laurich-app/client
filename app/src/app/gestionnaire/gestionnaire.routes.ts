import { Routes } from '@angular/router';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { BonDeCommandesComponent } from './bon-de-commandes/bon-de-commandes.component';
import { IdComponent as IDBonDeCommandeComponent } from './bon-de-commandes/id/id.component';
import { AjouterComponent as AjouterFournisseurComponent } from './fournisseurs/ajouter/ajouter.component';
import { ModifierComponent as ModifierFournisseurComponent } from './fournisseurs/id/modifier/modifier.component';
import { IdComponent as IDFournisseurComponent } from './fournisseurs/id/id.component';
import { CategoriesComponent } from './categories/categories.component';
import { AjouterComponent as AjouterCategorieComponent } from './categories/ajouter/ajouter.component';
import { ModifierComponent as ModifierCategorieComponent } from './categories/id/modifier/modifier.component';
import { IdComponent as IDCategorieComponent } from './categories/id/id.component';

export const gestionnaireRoutes: Routes = [
  { path: 'utilisateurs', component: UtilisateursComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'categories/ajouter', component: AjouterCategorieComponent },
  {
    path: 'categories/:id/modifier',
    component: ModifierCategorieComponent,
  },
  { path: 'categories/:id', component: IDCategorieComponent },
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
