import { createAction, props } from '@ngrx/store';
import { Panier } from '../models/panier';
import { ModifierProduit, Produit } from '../models/produit';

export enum TokenActionTypes {
  PANIER_CREATE_PANIER = 'Creer Panier',
  PANIER_ADD_PRODUIT = 'Ajouter Produit Panier',
  PANIER_MODIFY_QUANTITE = 'Modifier Quantite Produit Panier',
  PANIER_REMOVE_PRODUIT = 'Supprimer Produit Panier',
  PANIER_REMOVE = 'Supprimer Panier',
}

export const CREATE_PANIER = createAction(
  TokenActionTypes.PANIER_CREATE_PANIER,
  props<{ panier: Panier }>()
);
export const ADD_PRODUIT = createAction(
  TokenActionTypes.PANIER_ADD_PRODUIT,
  props<{ produit: Produit }>()
);

export const MODIFY_QUANTITE = createAction(
  TokenActionTypes.PANIER_MODIFY_QUANTITE,
  props<{ update: ModifierProduit }>()
);

export const REMOVE_PRODUIT = createAction(
  TokenActionTypes.PANIER_REMOVE_PRODUIT,
  props<{ id: number }>()
);

export const REMOVE_PANIER = createAction(TokenActionTypes.PANIER_REMOVE);

export type TokenAction =
  | typeof CREATE_PANIER
  | typeof ADD_PRODUIT
  | typeof MODIFY_QUANTITE
  | typeof REMOVE_PRODUIT
  | typeof REMOVE_PANIER;
