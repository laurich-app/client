import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginateRequestDTO } from '../dtos/requests/PaginateRequestDTO';
import { PaginateResponseDTO } from '../dtos/responses/PaginateResponseDTO';
import { ProduitsPaginerResponseDTO } from '../dtos/responses/produits/ProduitsPaginerResponseDTO';
import { URI_PRODUITS } from '../utils/constants';
import { ProduitsGetResponseDTO } from '../dtos/responses/produits/ProduitsGetResponseDTO';
import { CreerProduitsRequestDTO } from '../dtos/requests/produits/CreerProduitsRequestDTO';
import { ModifierProduitsRequestDTO } from '../dtos/requests/produits/ModifierProduitsRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class ProduitsService {
  constructor(private http: HttpClient) {}

  public getAll(
    i?: PaginateRequestDTO
  ): Observable<PaginateResponseDTO<ProduitsPaginerResponseDTO>> {
    const params: HttpParams = new HttpParams();
    if (i) {
      params.set('page', i.page);
      params.set('limit', i.limit);
    }

    return this.http.get<PaginateResponseDTO<ProduitsPaginerResponseDTO>>(
      URI_PRODUITS,
      { params }
    );
  }

  public getOne(id: number): Observable<ProduitsGetResponseDTO> {
    return this.http.get<ProduitsGetResponseDTO>(URI_PRODUITS + '/' + id);
  }

  public create(
    i: CreerProduitsRequestDTO
  ): Observable<ProduitsGetResponseDTO> {
    return this.http.post<ProduitsGetResponseDTO>(URI_PRODUITS, i);
  }

  public update(
    i: ModifierProduitsRequestDTO,
    id: number
  ): Observable<ProduitsGetResponseDTO> {
    return this.http.put<ProduitsGetResponseDTO>(URI_PRODUITS + '/' + id, i);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(URI_PRODUITS + '/' + id);
  }
}
