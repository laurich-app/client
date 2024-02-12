import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { InscriptionRequestDTO } from '../dtos/requests/utilisateurs/InscriptionRequestDTO';
import { InscriptionResponseDTO } from '../dtos/responses/utilisateurs/InscriptionResponseDTO';
import {
  URI_CONNEXION,
  URI_DECONNEXION,
  URI_INSCRIPTION,
  URI_MOI,
  URI_RAFFRAICHISSEMENT_TOKEN,
  URI_USERS,
} from '../utils/constants';
import { ConnexionRequestDTO } from '../dtos/requests/utilisateurs/ConnexionRequestDTO';
import { ConnexionResponseDTO } from '../dtos/responses/utilisateurs/ConnexionResponseDTO';
import { TokenRaffraichissementRequestDTO } from '../dtos/requests/utilisateurs/TokenRaffraichissementRequestDTO';
import { TokenRaffraichissementResponseDTO } from '../dtos/responses/utilisateurs/TokenRaffraichissimentResponseDTO';
import { UtilisateurResponseDTO } from '../dtos/responses/utilisateurs/UtilisateurResponseDTO';
import { PaginateResponseDTO } from '../dtos/responses/PaginateResponseDTO';
import { PaginateRequestDTO } from '../dtos/requests/PaginateRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class UtilisateursService {
  constructor(private http: HttpClient) {}

  public inscription(
    i: InscriptionRequestDTO
  ): Observable<InscriptionResponseDTO> {
    return this.http.post<InscriptionResponseDTO>(URI_INSCRIPTION, i);
  }

  public connexion(i: ConnexionRequestDTO): Observable<ConnexionResponseDTO> {
    return this.http.post<ConnexionResponseDTO>(URI_CONNEXION, i);
  }

  public refreshToken(
    i: TokenRaffraichissementRequestDTO
  ): Observable<TokenRaffraichissementResponseDTO> {
    return this.http.post<TokenRaffraichissementResponseDTO>(
      URI_RAFFRAICHISSEMENT_TOKEN,
      i
    );
  }

  public deconnexion(): Observable<void> {
    return this.http.delete<void>(URI_DECONNEXION);
  }

  public me(): Observable<UtilisateurResponseDTO> {
    return this.http.get<UtilisateurResponseDTO>(URI_MOI);
  }

  public getAll(
    i: PaginateRequestDTO
  ): Observable<PaginateResponseDTO<UtilisateurResponseDTO>> {
    const params: HttpParams = new HttpParams();
    if (i) {
      params.set('page', i.page);
      params.set('limit', i.limit);
    }

    return this.http.get<PaginateResponseDTO<UtilisateurResponseDTO>>(
      URI_USERS,
      { params }
    );
  }
}
