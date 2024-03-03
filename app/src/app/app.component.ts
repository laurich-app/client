import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Auth } from './models/auth';
import { logout } from './store/auth.actions';
import { Role } from './enums/roles';
import { UtilisateursService } from './services/utilisateurs.service';
import { MatBadgeModule } from '@angular/material/badge';
import { Panier } from './models/panier';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LetDirective,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';

  auth$!: Observable<Auth>;
  panier$!: Observable<Panier>;

  constructor(
    private store: Store<{ auth: Auth; panier: Panier }>,
    private router: Router,
    private utilisateursService: UtilisateursService
  ) {
    this.auth$ = this.store.select('auth');
    this.panier$ = this.store.select('panier');
  }

  public disconnect(): void {
    this.utilisateursService.deconnexion().subscribe({
      next: () => {
        this.store.dispatch(logout());
        this.router.navigateByUrl('');
      },
    });
  }

  public isAdmin(a: Auth): boolean {
    return a.roles.includes(Role.GESTIONNAIRE);
  }
}
