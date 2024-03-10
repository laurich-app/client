import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Auth } from './models/auth';
import { logout } from './store/auth.actions';
import { Role } from './enums/roles';
import { UtilisateursService } from './services/utilisateurs.service';
import { MatBadgeModule } from '@angular/material/badge';
import { Panier } from './models/panier';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Notification } from './store/notification.reducers';

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
    MatSnackBarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'app';

  auth$!: Observable<Auth>;
  panier$!: Observable<Panier>;

  constructor(
    private store: Store<{
      auth: Auth;
      panier: Panier;
      notification: Notification;
    }>,
    private router: Router,
    private utilisateursService: UtilisateursService,
    private _snackBar: MatSnackBar
  ) {
    this.auth$ = this.store.select('auth');
    this.panier$ = this.store.select('panier');
  }

  ngOnInit(): void {
    this.store.pipe(select('notification')).subscribe((event) => {
      if (event.message != null)
        this._snackBar.open(event.message, 'Ok', {
          duration: 10 * 1000,
          horizontalPosition: 'left',
          verticalPosition: 'top',
        });
    });
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
