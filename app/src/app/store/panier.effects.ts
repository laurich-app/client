import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionCreatorProps, Store } from '@ngrx/store';
import {
  EMPTY,
  Observable,
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  take,
} from 'rxjs';
import { Panier } from '../models/panier';
import { PaniersService } from '../services/paniers.service';
import {
  ADD_PRODUIT,
  CREATE_PANIER,
  MODIFY_QUANTITE,
  PanierActionTypes,
} from './panier.action';
import { CreerPanierRequestDTO } from '../dtos/requests/paniers/CreerPanierRequestDTO';
import { AjouterProduit, ModifierProduit, Produit } from '../models/produit';

@Injectable()
export class PanierEffects {
  private state$: Observable<Panier>;

  constructor(
    private actions$: Actions,
    private store: Store<{ panier: Panier }>,
    private panierService: PaniersService
  ) {
    this.state$ = this.store.select('panier');
  }

  /**
   * Créer un panier
   */
  creerPanier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PanierActionTypes.PANIER_CREATE_PANIER_EFFECTS),
      exhaustMap((i: { produit: AjouterProduit }) => {
        return this.state$.pipe(
          take(1),
          concatMap((p) => {
            if (p.token == '') {
              return this.panierService
                .create({
                  id: i.produit.id,
                  couleur_choisi: i.produit.couleur_choisi,
                  quantite: i.produit.quantite,
                })
                .pipe(
                  map((panier) => {
                    return CREATE_PANIER({
                      panier,
                    });
                  }),
                  catchError(() => EMPTY)
                );
            } else {
              return this.panierService
                .ajouterProduit(
                  {
                    id: i.produit.id,
                    couleur_choisi: i.produit.couleur_choisi,
                    quantite: i.produit.quantite,
                  },
                  p.token
                )
                .pipe(
                  map((panier) => {
                    const product = panier.produits.find(
                      (p) =>
                        p.id_produit_catalogue == i.produit.id &&
                        p.couleurs.libelle == i.produit.couleur_choisi
                    );
                    if (!product)
                      throw new Error("Le produit n'a pas été ajouté");
                    return ADD_PRODUIT({
                      produit: product,
                    });
                  }),
                  catchError(() => EMPTY)
                );
            }
          })
        );
      })
    )
  );

  /**
   * Modifier un produit du panier
   */
  updatePanier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PanierActionTypes.PANIER_MODIFY_QUANTITE_EFFECTS),
      exhaustMap((i: { update: ModifierProduit }) => {
        return this.state$.pipe(
          take(1),
          concatMap((p) => {
            return this.panierService
              .updateProduit(
                {
                  couleur_choisi: i.update.couleur_choisi,
                  quantite: i.update.quantite,
                },
                p.token,
                i.update.id
              )
              .pipe(
                map((panier) => {
                  const produit = panier.produits.find(
                    (prod) =>
                      prod.id_produit_catalogue == i.update.id &&
                      prod.couleurs.libelle == i.update.couleur_choisi
                  );
                  if (!produit)
                    throw new Error("Le produit n'existe plus dans le panier.");
                  return MODIFY_QUANTITE({
                    update: {
                      id: produit.id_produit_catalogue,
                      couleur_choisi: produit.couleurs.libelle,
                      quantite: produit.quantite,
                    },
                  });
                }),
                catchError(() => EMPTY)
              );
          })
        );
      })
    )
  );
}
