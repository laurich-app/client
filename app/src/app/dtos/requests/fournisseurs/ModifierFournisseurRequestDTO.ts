import { ProduitsFournisseurRequestDTO } from './produits/ProduitsFournisseurRequestDTO';

export interface ModifierFournisseurRequestDTO {
  email?: string;
  raison_sociale?: string;
  produits?: ProduitsFournisseurRequestDTO[];
}
