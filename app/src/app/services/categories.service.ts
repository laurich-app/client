import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginateRequestDTO } from '../dtos/requests/PaginateRequestDTO';
import { PaginateResponseDTO } from '../dtos/responses/PaginateResponseDTO';
import { CategoriesResponseDTO } from '../dtos/responses/categories/CategoriesResponseDTO';
import { URI_CATEGORIES } from '../utils/constants';
import { CreerCategoriesRequestDTO } from '../dtos/requests/categories/CreerCategoriesRequestDTO';
import { ModifierCategoriesRequestDTO } from '../dtos/requests/categories/ModifierCategoriesRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  public getAll(
    i: PaginateRequestDTO
  ): Observable<PaginateResponseDTO<CategoriesResponseDTO>> {
    let params: HttpParams = new HttpParams();
    if (i) {
      params = params.append('page', i.page);
      params = params.append('limit', i.limit);
    }

    return this.http.get<PaginateResponseDTO<CategoriesResponseDTO>>(
      URI_CATEGORIES,
      { params }
    );
  }

  public get(id: number): Observable<CategoriesResponseDTO> {
    return this.http.get<CategoriesResponseDTO>(URI_CATEGORIES + '/' + id);
  }

  public create(
    i: CreerCategoriesRequestDTO
  ): Observable<CategoriesResponseDTO> {
    return this.http.post<CategoriesResponseDTO>(URI_CATEGORIES, i);
  }

  public update(
    i: ModifierCategoriesRequestDTO,
    id: number
  ): Observable<CategoriesResponseDTO> {
    return this.http.put<CategoriesResponseDTO>(URI_CATEGORIES + '/' + id, i);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(URI_CATEGORIES + '/' + id);
  }
}
