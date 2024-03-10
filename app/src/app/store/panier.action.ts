import { createAction, props } from '@ngrx/store';
import { Panier } from '../models/panier';
import { AjouterProduit, ModifierProduit, Produit } from '../models/produit';

export enum PanierActionTypes {
  PANIER_CREATE_PANIER_EFFECTS = 'Creer Panier Loading',
  PANIER_CREATE_PANIER = 'Creer Panier',
  PANIER_ADD_PRODUIT = 'Ajouter Produit Panier',
  PANIER_MODIFY_QUANTITE_EFFECTS = 'Modifier Quantite Produit Panier Loading',
  PANIER_MODIFY_QUANTITE = 'Modifier Quantite Produit Panier',
  PANIER_REMOVE_PRODUIT_EFFECTS = 'Supprimer Produit Panier Loading',
  PANIER_REMOVE_PRODUIT = 'Supprimer Produit Panier',
  PANIER_REMOVE_EFFECTS = 'Supprimer Panier Loading',
  PANIER_REMOVE = 'Supprimer Panier',
}

export const CREATE_PANIER_EFFECTS = createAction(
  PanierActionTypes.PANIER_CREATE_PANIER_EFFECTS,
  props<{ produit: AjouterProduit }>()
);

export const CREATE_PANIER = createAction(
  PanierActionTypes.PANIER_CREATE_PANIER,
  props<{ panier: Panier }>()
);
export const ADD_PRODUIT = createAction(
  PanierActionTypes.PANIER_ADD_PRODUIT,
  props<{ produit: Produit }>()
);

export const MODIFY_QUANTITE_EFFECTS = createAction(
  PanierActionTypes.PANIER_MODIFY_QUANTITE_EFFECTS,
  props<{ update: ModifierProduit }>()
);

export const MODIFY_QUANTITE = createAction(
  PanierActionTypes.PANIER_MODIFY_QUANTITE,
  props<{ update: ModifierProduit }>()
);

export const REMOVE_PRODUIT_EFFECTS = createAction(
  PanierActionTypes.PANIER_REMOVE_PRODUIT_EFFECTS,
  props<{ id: number; couleur: string }>()
);

export const REMOVE_PRODUIT = createAction(
  PanierActionTypes.PANIER_REMOVE_PRODUIT,
  props<{ id: number; couleur: string }>()
);

export const REMOVE_PANIER_EFFECTS = createAction(
  PanierActionTypes.PANIER_REMOVE_EFFECTS
);

export const REMOVE_PANIER = createAction(PanierActionTypes.PANIER_REMOVE);

export type PanierAction =
  | typeof CREATE_PANIER
  | typeof CREATE_PANIER_EFFECTS
  | typeof ADD_PRODUIT
  | typeof MODIFY_QUANTITE
  | typeof MODIFY_QUANTITE_EFFECTS
  | typeof REMOVE_PRODUIT
  | typeof REMOVE_PRODUIT_EFFECTS
  | typeof REMOVE_PANIER
  | typeof REMOVE_PANIER_EFFECTS;
