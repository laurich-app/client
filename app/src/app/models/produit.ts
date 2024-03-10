import { PanierProduitResponseDTO } from '../dtos/responses/paniers/PanierResponseDTO';

export interface Produit extends PanierProduitResponseDTO {}

export interface ModifierProduit {
  id: number;
  quantite: number;
  couleur_choisi: string;
}

export interface AjouterProduit {
  quantite: number;
  couleur_choisi: string;
  id: number;
}
