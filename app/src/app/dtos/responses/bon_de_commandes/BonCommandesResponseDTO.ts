import { EtatCommande } from '../../../enums/etat_commande.enum';

export interface BonCommandesResponseDTO {
  _id: string;
  date_creation: string;
  quantite: number;
  etat_commande: EtatCommande;
  produit: {
    prix_unitaire_fournisseur: number;
    id_produit_catalogue: number;
    libelle: string;
    description: string;
    couleurs: string[];
    sexe: string;
    taille: string;
    image_url: string;
  };
}
