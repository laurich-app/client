import { HttpResponse, http } from 'msw';
import { PanierResponseDTO } from '../../app/dtos/responses/paniers/PanierResponseDTO';
import { dataPaniers } from './datas/datas-panier';
import { environment } from '../../environments/environment';
import { CreerPanierRequestDTO } from '../../app/dtos/requests/paniers/CreerPanierRequestDTO';
import { ModifierPanierProduitsRequestDTO } from '../../app/dtos/requests/paniers/produits/ModifierPanierProduitsRequestDTO';

function randomString(length: number): string {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const getPanierToken = http.get(
  `${environment.API_URL}/paniers/:token`,
  ({ request, params, cookies }) => {
    const response = dataPaniers.get(params['token'].toString());
    if (!response)
      return new HttpResponse(null, {
        status: 404,
      });
    return HttpResponse.json(response);
  }
);

const postPanierToken = http.post(
  `${environment.API_URL}/paniers`,
  async ({ request, params, cookies }) => {
    const produit: CreerPanierRequestDTO =
      (await request.json()) as CreerPanierRequestDTO;
    const panier: PanierResponseDTO = {
      _id: randomString(8),
      date_creation: new Date(),
      token: randomString(8),
      produits: [
        {
          id_produit_catalogue: produit.id,
          quantite: produit.quantite,
          couleurs: {
            libelle: produit.couleur_choisi,
          },
        },
      ],
    };
    dataPaniers.set(panier.token, panier);
    return HttpResponse.json(panier);
  }
);

const postPanierProduitToken = http.post(
  `${environment.API_URL}/paniers/:token`,
  async ({ request, params, cookies }) => {
    const response = dataPaniers.get(params['token'].toString());
    if (!response)
      return new HttpResponse(null, {
        status: 404,
      });
    const produit: CreerPanierRequestDTO =
      (await request.json()) as CreerPanierRequestDTO;
    response.produits.push({
      id_produit_catalogue: produit.id,
      quantite: produit.quantite,
      couleurs: {
        libelle: produit.couleur_choisi,
      },
    });
    dataPaniers.set(response.token, response);
    return HttpResponse.json(response);
  }
);

const deletePanierToken = http.delete(
  `${environment.API_URL}/paniers/:token`,
  ({ request, params, cookies }) => {
    const response = dataPaniers.get(params['token'].toString());
    if (!response)
      return new HttpResponse(null, {
        status: 404,
      });
    dataPaniers.delete(response.token);
    return HttpResponse.json();
  }
);

const putProduitsPanierToken = http.put(
  `${environment.API_URL}/paniers/:token/produits/:id`,
  async ({ request, params, cookies }) => {
    const response = dataPaniers.get(params['token'].toString());
    const id = params['id'].toString();
    if (!response || !id)
      return new HttpResponse(null, {
        status: 404,
      });

    const mod: ModifierPanierProduitsRequestDTO =
      (await request.json()) as ModifierPanierProduitsRequestDTO;
    const produit = response.produits.find(
      (p) =>
        p.id_produit_catalogue == Number(id) &&
        p.couleurs.libelle == mod.couleur_choisi
    );
    if (!produit)
      return new HttpResponse(null, {
        status: 404,
      });

    produit.quantite = mod.quantite;
    return HttpResponse.json(response);
  }
);

const deleteProduitsPanierToken = http.delete(
  `${environment.API_URL}/paniers/:token/produits/:id/couleurs/:couleur`,
  ({ request, params, cookies }) => {
    const response = dataPaniers.get(params['token'].toString());
    const id = params['id'].toString();
    const couleur = params['couleur'];
    if (!response || !id || !couleur)
      return new HttpResponse(null, {
        status: 404,
      });
    const index = response.produits.findIndex(
      (p) =>
        p.id_produit_catalogue == Number(id) && p.couleurs.libelle == couleur
    );
    response.produits = [
      ...response.produits.slice(0, index),
      ...response.produits.slice(index + 1, response.produits.length),
    ];
    dataPaniers.set(response.token, response);
    return HttpResponse.json();
  }
);

const validerPanier = http.post(
  `${environment.API_URL}/paniers/:token/valider_commande`,
  async ({ request, params, cookies }) => {
    return HttpResponse.json();
  }
);

export const paniers = [
  getPanierToken,
  postPanierToken,
  postPanierProduitToken,
  deletePanierToken,
  deleteProduitsPanierToken,
  putProduitsPanierToken,
  validerPanier,
];
