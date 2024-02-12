export interface ProduitsGetResponseDTO {
  id: number;
  prix_unitaire: number;
  sexe: string;
  taille: string;
  image_url: string;
  description: string;
  libelle: string;
  couleurs: string[];
  categorie: {
    libelle: string;
  };
  stock_restant: boolean;
}
