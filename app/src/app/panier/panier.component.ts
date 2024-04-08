import { Component, OnDestroy } from '@angular/core';
import { ItemShopComponent } from './item-shop/item-shop.component';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Panier } from '../models/panier';
import { LetDirective } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';
import { REMOVE_PANIER_EFFECTS, VALIDER_PANIER } from '../store/panier.action';
import { MatDividerModule } from '@angular/material/divider';
import { Auth } from '../models/auth';
import { Router } from '@angular/router';
import { ProduitsService } from '../services/produits.service';
import { PaniersService } from '../services/paniers.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NOTIFICATION_CONDITION } from '../store/notification.action';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [
    ItemShopComponent,
    LetDirective,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss',
})
export class PanierComponent implements OnDestroy {
  panier$: Observable<Panier>;
  auth$: Observable<Auth>;
  loading: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store<{ panier: Panier; auth: Auth }>,
    private router: Router,
    private paniersService: PaniersService
  ) {
    this.panier$ = this.store.select('panier');
    this.auth$ = this.store.select('auth');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  supprimerPanier() {
    this.store.dispatch(REMOVE_PANIER_EFFECTS());
  }

  validerPanier() {
    this.subscriptions.add(
      this.auth$.subscribe({
        next: (e) => {
          if (!e.isLoggedIn) this.router.navigate(['/connexion']);
          else {
            this.subscriptions.add(
              this.panier$.subscribe({
                next: (e) => {
                  this.submitPanier(e.token);
                },
                complete: () => {
                  this.subscriptions.unsubscribe();
                },
              })
            );
          }
        },
      })
    );
  }

  private submitPanier(token: string) {
    if (this.loading) return;
    this.loading = true;
    this.paniersService.validerCommande(token).subscribe({
      next: (e) => {
        console.log('Panier validé !');
        this.store.dispatch(VALIDER_PANIER());
        this.store.dispatch(
          NOTIFICATION_CONDITION({ message: 'Commande validée' })
        );
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        this.loading = false;
      },
    });
  }
}
