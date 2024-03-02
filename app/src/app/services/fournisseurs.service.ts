import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginateRequestDTO } from '../dtos/requests/PaginateRequestDTO';
import { PaginateResponseDTO } from '../dtos/responses/PaginateResponseDTO';
import { FournisseursResponseDTO } from '../dtos/responses/fournisseurs/FournisseursResponseDTO';
import { URI_FOURNISSEURS } from '../utils/constants';
import { CreerFournisseurRequestDTO } from '../dtos/requests/fournisseurs/CreerFournisseurRequestDTO';
import { ModifierFournisseurRequestDTO } from '../dtos/requests/fournisseurs/ModifierFournisseurRequestDTO';
import { ProduitsFournisseurRequestDTO } from '../dtos/requests/fournisseurs/produits/ProduitsFournisseurRequestDTO';
import { ProduitsFournisseursResponseDTO } from '../dtos/responses/fournisseurs/ProduitsFournisseursResponseDTO';
import { ModifierProduitsFournisseurRequestDTO } from '../dtos/requests/fournisseurs/produits/ModifierProduitsFournisseurRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class FournisseursService {
  constructor(private http: HttpClient) {}

  public getAll(
    i: PaginateRequestDTO
  ): Observable<PaginateResponseDTO<FournisseursResponseDTO>> {
    let params: HttpParams = new HttpParams();
    if (i) {
      params = params.append('page', i.page);
      params = params.append('limit', i.limit);
    }

    return this.http.get<PaginateResponseDTO<FournisseursResponseDTO>>(
      URI_FOURNISSEURS,
      { params }
    );
  }

  public get(id: string): Observable<FournisseursResponseDTO> {
    return this.http.get<FournisseursResponseDTO>(URI_FOURNISSEURS + '/' + id);
  }

  public create(
    i: CreerFournisseurRequestDTO
  ): Observable<FournisseursResponseDTO> {
    return this.http.post<FournisseursResponseDTO>(URI_FOURNISSEURS, i);
  }

  public update(
    i: ModifierFournisseurRequestDTO,
    id: string
  ): Observable<FournisseursResponseDTO> {
    return this.http.put<FournisseursResponseDTO>(
      URI_FOURNISSEURS + '/' + id,
      i
    );
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(URI_FOURNISSEURS + '/' + id);
  }

  /**
   * Ajoute un produit à un fournisseur.
   * @param id
   * @param i
   * @returns
   */
  public ajouterProduit(
    id: string,
    i: ProduitsFournisseurRequestDTO
  ): Observable<ProduitsFournisseursResponseDTO> {
    return this.http.post<ProduitsFournisseursResponseDTO>(
      URI_FOURNISSEURS + '/' + id,
      i
    );
  }

  /**
   * Modifie un produit d'un fournisseur.
   * @param id
   * @param id_produit
   * @param i
   * @returns
   */
  public modifierProduit(
    id: string,
    id_produit: number,
    i: ModifierProduitsFournisseurRequestDTO
  ): Observable<ProduitsFournisseursResponseDTO> {
    return this.http.put<ProduitsFournisseursResponseDTO>(
      URI_FOURNISSEURS + '/' + id + '/produits/' + id_produit,
      i
    );
  }

  /**
   * Supprime un produit d'un fournisseur.
   * @param id
   * @param id_produit
   * @returns
   */
  public supprimerProduit(id: string, id_produit: number): Observable<void> {
    return this.http.delete<void>(
      URI_FOURNISSEURS + '/' + id + '/produits/' + id_produit
    );
  }
}
