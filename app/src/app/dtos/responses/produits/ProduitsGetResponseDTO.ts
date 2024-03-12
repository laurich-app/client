import { ProduitStockResponseDTO } from './ProduitsPaginerResponseDTO';

export interface ProduitsGetResponseDTO {
  id: number;
  prix_unitaire: number;
  sexe: string;
  taille: string;
  image_url: string;
  description: string;
  libelle: string;
  stock: ProduitStockResponseDTO[];
  categorie: {
    id: number;
    libelle: string;
  };
}
