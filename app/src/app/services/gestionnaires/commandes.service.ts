import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginateRequestDTO } from '../../dtos/requests/PaginateRequestDTO';
import { PaginateResponseDTO } from '../../dtos/responses/PaginateResponseDTO';
import { CommandeResponseDTO } from '../../dtos/responses/commandes/CommandeResponseDTO';
import {
  URI_COMMANDES,
  URI_GESTIONNAIRES_COMMANDES,
} from '../../utils/constants';
import { LivraisonRequestDTO } from '../../dtos/requests/gestionnaires/commandes/LivraisonRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class CommandesService {
  constructor(private http: HttpClient) {}

  public getAll(
    i: PaginateRequestDTO
  ): Observable<PaginateResponseDTO<CommandeResponseDTO>> {
    let params: HttpParams = new HttpParams();
    if (i) {
      params = params.append('page', i.page);
      params = params.append('limit', i.limit);
    }

    return this.http.get<PaginateResponseDTO<CommandeResponseDTO>>(
      URI_GESTIONNAIRES_COMMANDES,
      { params }
    );
  }

  public get(id: string): Observable<CommandeResponseDTO> {
    return this.http.get<CommandeResponseDTO>(
      URI_GESTIONNAIRES_COMMANDES + '/' + id
    );
  }

  /**
   * Met à jour l'état de la livraison
   * @param id
   * @param i
   * @returns
   */
  public updateLivraison(
    id: string,
    i: LivraisonRequestDTO
  ): Observable<CommandeResponseDTO> {
    return this.http.put<CommandeResponseDTO>(
      URI_GESTIONNAIRES_COMMANDES + '/' + id,
      i
    );
  }
}
