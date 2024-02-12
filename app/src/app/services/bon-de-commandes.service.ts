import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BonCommandesResponseDTO } from '../dtos/responses/bon_de_commandes/BonCommandesResponseDTO';
import { PaginateResponseDTO } from '../dtos/responses/PaginateResponseDTO';
import { PaginateRequestDTO } from '../dtos/requests/PaginateRequestDTO';
import { URI_BON_DE_COMMANDES } from '../utils/constants';
import { ModifierEtatBonCommandesRequestDTO } from '../dtos/requests/bon_de_commandes/ModifierEtatBonCommandesRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class BonDeCommandesService {
  constructor(private http: HttpClient) {}

  public getAll(
    i: PaginateRequestDTO
  ): Observable<PaginateResponseDTO<BonCommandesResponseDTO>> {
    const params: HttpParams = new HttpParams();
    if (i) {
      params.set('page', i.page);
      params.set('limit', i.limit);
    }

    return this.http.get<PaginateResponseDTO<BonCommandesResponseDTO>>(
      URI_BON_DE_COMMANDES,
      { params }
    );
  }

  public get(id: string): Observable<BonCommandesResponseDTO> {
    return this.http.get<BonCommandesResponseDTO>(
      URI_BON_DE_COMMANDES + '/' + id
    );
  }

  public update(
    id: string,
    i: ModifierEtatBonCommandesRequestDTO
  ): Observable<BonCommandesResponseDTO> {
    return this.http.put<BonCommandesResponseDTO>(
      URI_BON_DE_COMMANDES + '/' + id,
      i
    );
  }
}
