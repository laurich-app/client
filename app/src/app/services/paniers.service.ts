import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandeResponseDTO } from '../dtos/responses/commandes/CommandeResponseDTO';
import { URI_PANIERS } from '../utils/constants';
import { PanierResponseDTO } from '../dtos/responses/paniers/PanierResponseDTO';
import { CreerPanierRequestDTO } from '../dtos/requests/paniers/CreerPanierRequestDTO';
import { ModifierPanierProduitsRequestDTO } from '../dtos/requests/paniers/produits/ModifierPanierProduitsRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class PaniersService {
  constructor(private http: HttpClient) {}

  /**
   * Valide le panier, et génère une commande.
   * @param token
   * @returns
   */
  public validerCommande(token: string): Observable<CommandeResponseDTO> {
    return this.http.post<CommandeResponseDTO>(
      URI_PANIERS + '/' + token + '/valider_commande',
      {}
    );
  }

  public get(token: string): Observable<PanierResponseDTO> {
    return this.http.get<PanierResponseDTO>(URI_PANIERS + '/' + token);
  }

  public create(i: CreerPanierRequestDTO): Observable<PanierResponseDTO> {
    return this.http.post<PanierResponseDTO>(URI_PANIERS, i);
  }

  /**
   * Ajoute un produit à un panier existant.
   * @param i
   * @param token
   * @returns
   */
  public ajouterProduit(
    i: CreerPanierRequestDTO,
    token: string
  ): Observable<PanierResponseDTO> {
    return this.http.post<PanierResponseDTO>(URI_PANIERS + '/' + token, i);
  }

  public delete(token: string): Observable<void> {
    return this.http.delete<void>(URI_PANIERS + '/' + token);
  }

  /**
   * Met à jour les informations d'un produit pour un panier spécifique
   * @param i
   * @param token
   * @param id_produit
   */
  public updateProduit(
    i: ModifierPanierProduitsRequestDTO,
    token: string,
    id_produit: number
  ): Observable<PanierResponseDTO> {
    return this.http.put<PanierResponseDTO>(
      URI_PANIERS + '/' + token + '/produits/' + id_produit,
      i
    );
  }

  /**
   * Supprime un produit d'un panier spécifique.
   * @param token
   * @param id_produit
   * @returns
   */
  public supprimerProduit(token: string, id_produit: number): Observable<void> {
    return this.http.delete<void>(
      URI_PANIERS + '/' + token + '/produits/' + id_produit
    );
  }
}
