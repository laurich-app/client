export interface PanierResponseDTO {
  _id: string;
  date_creation: Date;
  token: string;
  produits: PanierProduitResponseDTO[];
}

export interface PanierProduitResponseDTO {
  id_produit_catalogue: number;
  couleurs: {
    libelle: string;
  };
  quantite: number;
}
