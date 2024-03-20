import { Component, OnInit } from '@angular/core';
import { UtilisateurResponseDTO } from '../../dtos/responses/utilisateurs/UtilisateurResponseDTO';
import { UtilisateursService } from '../../services/utilisateurs.service';
import { Auth } from '../../models/auth';
import { Store } from '@ngrx/store';
import { Observable, exhaustMap, of } from 'rxjs';
import * as jose from 'jose';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss',
})
export class MeComponent implements OnInit {
  me!: UtilisateurResponseDTO;
  auth$!: Observable<Auth>;

  constructor(
    private utilisateursService: UtilisateursService,
    private store: Store<{
      auth: Auth;
    }>
  ) {
    this.auth$ = this.store.select('auth');
  }

  ngOnInit(): void {
    // Logique d'initialisation à exécuter ici
    console.log('Le composant est initialisé.');
    this.auth$.subscribe({
      next: (a) => {
        const decodedToken = jose.decodeJwt(a.token.accessToken);
        if (!decodedToken.sub) {
          console.log('Erreur dans le décodage du token.');
          return of();
        }
        this.utilisateursService.getOneById(decodedToken.sub).subscribe({
          next: (e) => {
            this.me = e;
          },
        });
        return of();
      },
    });
  }
}
