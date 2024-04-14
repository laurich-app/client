import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URI_NOTIFICATIONS } from '../utils/constants';
import { Observable } from 'rxjs';
import { PaginateRequestDTO } from '../dtos/requests/PaginateRequestDTO';
import { PaginateResponseDTO } from '../dtos/responses/PaginateResponseDTO';
import { NotificationResponseDTO } from '../dtos/responses/notifications/NotificationResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  public getAll(
    i: PaginateRequestDTO
  ): Observable<PaginateResponseDTO<NotificationResponseDTO>> {
    let params: HttpParams = new HttpParams();
    if (i) {
      params = params.append('page', i.page);
      params = params.append('limit', i.limit);
    }

    return this.http.get<PaginateResponseDTO<NotificationResponseDTO>>(
      URI_NOTIFICATIONS,
      { params }
    );
  }

  public get(id: string): Observable<NotificationResponseDTO> {
    return this.http.get<NotificationResponseDTO>(URI_NOTIFICATIONS + '/' + id);
  }
}
