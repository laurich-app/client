import { ProduitsFournisseursResponseDTO } from './ProduitsFournisseursResponseDTO';

export interface FournisseursResponseDTO {
  id: string;
  email: string;
  raison_sociale: string;
  produits: ProduitsFournisseursResponseDTO[];
}
