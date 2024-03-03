import { createReducer, on } from '@ngrx/store';
import {
  CREATE_PANIER,
  ADD_PRODUIT,
  MODIFY_QUANTITE,
  REMOVE_PRODUIT,
  REMOVE_PANIER,
} from './panier.action';
import { Panier } from '../models/panier';
import { ModifierProduit, Produit } from '../models/produit';

const STORAGE_ITEM_NAME = 'PANIER';
const storage = localStorage.getItem(STORAGE_ITEM_NAME);

const emptyState: Panier = {
  token: null,
  produits: [],
};
let previousState = emptyState;

if (storage) {
  previousState = JSON.parse(storage);
}

export const initialState: Panier = previousState;

export const panierReducer = createReducer(
  initialState,
  on(CREATE_PANIER, (state: Panier, action: { panier: Panier }) => {
    localStorage.setItem(STORAGE_ITEM_NAME, JSON.stringify(action.panier));
    return JSON.parse(JSON.stringify(action.panier)) || state;
  }),
  on(ADD_PRODUIT, (state: Panier, action: { produit: Produit }) => {
    if (state.token == null) throw new Error("Le panier n'est pas initialisé");
    const newPanier: Panier = {
      token: state.token,
      produits: [...state.produits, action.produit],
    };
    localStorage.setItem(STORAGE_ITEM_NAME, JSON.stringify(newPanier));
    return newPanier || state;
  }),
  on(MODIFY_QUANTITE, (state: Panier, action: { update: ModifierProduit }) => {
    if (state.token == null) throw new Error("Le panier n'est pas initialisé");
    const index = state.produits.findIndex((p) => p.id == action.update.id);
    const produit = state.produits.find((p) => p.id == action.update.id);
    if (index == -1 || !produit) throw new Error('Produit introuvable');

    // Regénération d'un objet produit non binder à l'objet précédent
    produit.quantite = action.update.quantite;
    const produits = [
      ...state.produits.slice(0, index - 1),
      produit,
      ...state.produits.slice(index, state.produits.length),
    ];

    // Création du nouvel objet panier
    const newPanier: Panier = {
      token: state.token,
      produits,
    };

    // Sauvegarde local
    localStorage.setItem(STORAGE_ITEM_NAME, JSON.stringify(newPanier));
    return state;
  }),
  on(REMOVE_PRODUIT, (state: Panier, action: { id: number }) => {
    if (state.token == null) throw new Error("Le panier n'est pas initialisé");
    const index = state.produits.findIndex((p) => p.id == action.id);
    if (index == -1) throw new Error('Produit introuvable');
    const newPanier: Panier = {
      token: state.token,
      produits: [
        ...state.produits.slice(0, index - 1),
        ...state.produits.slice(index, state.produits.length),
      ],
    };
    localStorage.setItem(STORAGE_ITEM_NAME, JSON.stringify(newPanier));
    return state;
  }),
  on(REMOVE_PANIER, () => {
    localStorage.removeItem(STORAGE_ITEM_NAME);
    return JSON.parse(JSON.stringify(emptyState));
  })
);
