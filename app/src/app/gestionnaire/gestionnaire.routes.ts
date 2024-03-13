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
import { ProduitsComponent } from './produits/produits.component';
import { AjouterComponent as AjouterProduitsComponent } from './produits/ajouter/ajouter.component';
import { ModifierComponent as ModifierProduitsComponent } from './produits/id/modifier/modifier.component';
import { IdComponent as IDProduitsComponent } from './produits/id/id.component';
import { CommandesComponent } from './commandes/commandes.component';
import { IdComponent as IDCommandesComponent } from './commandes/id/id.component';

export const gestionnaireRoutes: Routes = [
  { path: 'utilisateurs', component: UtilisateursComponent },
  { path: 'commandes', component: CommandesComponent },
  { path: 'commandes/:id', component: IDCommandesComponent },
  { path: 'produits', component: ProduitsComponent },
  { path: 'produits/ajouter', component: AjouterProduitsComponent },
  {
    path: 'produits/:id/modifier',
    component: ModifierProduitsComponent,
  },
  { path: 'produits/:id', component: IDProduitsComponent },
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
