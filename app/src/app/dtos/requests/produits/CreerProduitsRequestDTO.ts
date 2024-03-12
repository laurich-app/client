import { Couleurs } from '../../../enums/couleurs.enum';

export interface CreerProduitsRequestDTO {
  prix_unitaire: number;
  sexe: string;
  taille: string;
  image_url: string;
  description: string;
  libelle: string;
  couleurs: Couleurs[];
  categorie_id: number;
}
