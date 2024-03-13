import { EtatLivraison } from '../../../enums/etat_livraison.enum';
import { StatutPaiement } from '../../../enums/statut_paiement.enum';

export interface CommandeResponseDTO {
  _id: string;
  date_creation: Date;
  id_utilisateur: string;
  id_paiement: string;
  total: number;
  produits: CommandeProduitResponseDTO[];
  etat_livraison: EtatLivraison;
  statut_paiement: StatutPaiement;
  numero: string;
}

export interface CommandeProduitResponseDTO {
  prix_unitaire: number;
  sexe: string;
  taille: string;
  description: string;
  couleur: {
    libelle: string;
  };
  quantite: number;
  categorie: {
    libelle: string;
  };
}
