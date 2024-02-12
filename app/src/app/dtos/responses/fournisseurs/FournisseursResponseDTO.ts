import { ProduitsFournisseursResponseDTO } from './ProduitsFournisseursResponseDTO';

export interface FournisseursResponseDTO {
  _id: string;
  email: string;
  raison_sociale: string;
  produits: ProduitsFournisseursResponseDTO[];
}
