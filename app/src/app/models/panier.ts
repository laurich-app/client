import { Produit } from './produit';

export interface Panier {
  token: string | null;
  produits: Produit[];
}
