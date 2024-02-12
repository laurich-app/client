import { ProduitsFournisseurRequestDTO } from './produits/ProduitsFournisseurRequestDTO';

export interface CreerFournisseurRequestDTO {
  email: string;
  raison_sociale: string;
  produits?: ProduitsFournisseurRequestDTO[];
}
