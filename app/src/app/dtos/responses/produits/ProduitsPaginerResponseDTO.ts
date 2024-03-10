export interface ProduitsPaginerResponseDTO {
  id: number;
  prix_unitaire: number;
  sexe: string;
  taille: string;
  image_url: string;
  description: string;
  libelle: string;
  stock: ProduitStockResponseDTO[];
}

export interface ProduitStockResponseDTO {
  couleur: string;
  quantite: number;
}
