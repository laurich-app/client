import { Couleurs } from '../../../enums/couleurs.enum';
import { Sexe } from '../../../enums/sexe.enum';
import { Taille } from '../../../enums/taille.enum';

export interface CreerProduitsRequestDTO {
  prix_unitaire: number;
  sexe: Sexe;
  taille: Taille;
  image_url: string;
  description: string;
  libelle: string;
  couleurs: Couleurs[];
  categorie_id: number;
}
