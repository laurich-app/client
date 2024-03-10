import { http, HttpResponse } from 'msw';
import { environment } from '../../environments/environment';
import { ProduitsPaginerResponseDTO } from '../../app/dtos/responses/produits/ProduitsPaginerResponseDTO';
import { PaginateResponseDTO } from '../../app/dtos/responses/PaginateResponseDTO';
import { dataProduits } from './datas/datas-produits';

const get = http.get(
  `${environment.API_URL}/produits`,
  ({ request, params, cookies }) => {
    const response: PaginateResponseDTO<ProduitsPaginerResponseDTO> = {
      data: dataProduits,
      pagination: {
        nbItem: 4,
        limit: 5,
        page: 1,
      },
    };
    return HttpResponse.json(response);
  }
);

const getOne = http.get(
  `${environment.API_URL}/produits/:id`,
  ({ request, params, cookies }) => {
    if (!params?.['id'] || !Number(params['id']))
      return new HttpResponse(null, {
        status: 404,
      });
    const p = dataProduits.find((pi) => pi.id == Number(params['id']));
    return HttpResponse.json(p);
  }
);

export const produits = [get, getOne];
