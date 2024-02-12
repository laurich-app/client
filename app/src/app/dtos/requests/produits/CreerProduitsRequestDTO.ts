export interface CreerProduitsRequestDTO {
  prix_unitaire: number;
  sexe: string;
  taille: string;
  image_url: string;
  description: string;
  libelle: string;
  couleurs: string[];
  categorie_id: number;
}
