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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';

  auth$!: Observable<Auth>;

  constructor(private store: Store<{ auth: Auth }>, private router: Router) {
    this.auth$ = this.store.select('auth');
  }

  public disconnect(): void {
    this.store.dispatch(logout());
    this.router.navigateByUrl('');
  }

  public isAdmin(a: Auth): boolean {
    console.log(a);
    console.log(a.roles.includes(Role.GESTIONNAIRE));
    return a.roles.includes(Role.GESTIONNAIRE);
  }
}
