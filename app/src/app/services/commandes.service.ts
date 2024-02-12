import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginateRequestDTO } from '../dtos/requests/PaginateRequestDTO';
import { PaginateResponseDTO } from '../dtos/responses/PaginateResponseDTO';
import { CommandeResponseDTO } from '../dtos/responses/commandes/CommandeResponseDTO';
import { URI_COMMANDES } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class CommandesService {
  constructor(private http: HttpClient) {}

  public getAll(
    i: PaginateRequestDTO
  ): Observable<PaginateResponseDTO<CommandeResponseDTO>> {
    const params: HttpParams = new HttpParams();
    if (i) {
      params.set('page', i.page);
      params.set('limit', i.limit);
    }

    return this.http.get<PaginateResponseDTO<CommandeResponseDTO>>(
      URI_COMMANDES,
      { params }
    );
  }

  public get(id: string): Observable<CommandeResponseDTO> {
    return this.http.get<CommandeResponseDTO>(URI_COMMANDES + '/' + id);
  }
}
