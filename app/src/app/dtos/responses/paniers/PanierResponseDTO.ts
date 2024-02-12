export interface PanierResponseDTO {
  _id: string;
  date_creation: Date;
  token: string;
  produits: PanierProduitResponseDTO[];
}

export interface PanierProduitResponseDTO {
  id_produit_catalogue: number;
  prix_unitaire: number;
  sexe: string;
  taille: string;
  image_url: string;
  couleurs: {
    libelle: string;
  };
  quantite: number;
  categorie: {
    libelle: string;
  };
}
