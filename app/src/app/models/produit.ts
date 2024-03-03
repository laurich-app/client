export interface Produit {
  quantite: number;
  couleur: string;
  libelle: string;
  id: number;
  image_url: string;
  prix_unitaire: number;
}

export interface ModifierProduit {
  id: number;
  quantite: number;
}
