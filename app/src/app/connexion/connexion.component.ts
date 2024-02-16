import { Component } from '@angular/core';
import { UtilisateursService } from '../services/utilisateurs.service';
import { ConnexionRequestDTO } from '../dtos/requests/utilisateurs/ConnexionRequestDTO';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Auth } from '../models/auth';
import { Observable } from 'rxjs';
import { login } from '../store/auth.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Error } from '../models/error';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})
export class ConnexionComponent {
  errors: Error = {};
  auth$!: Observable<Auth>;
  formData: ConnexionRequestDTO = {
    email: '',
    motDePasse: '',
  }; // Objet pour stocker les données du formulaire
  loading: boolean = false; // Variable pour indiquer si le chargement est en cours

  constructor(
    private utilisateursService: UtilisateursService,
    private store: Store<{ auth: Auth }>,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.auth$ = this.store.select('auth');
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  alert(user: string) {
    this._snackBar.open('Bienvenue ou Bon retour parmi nous ' + user, '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snackbar',
      duration: 2500,
    });
  }

  submitForm() {
    this.loading = true; // Marquer le début du chargement

    // Envoyer les données du formulaire à un serveur via une requête HTTP POST
    this.utilisateursService.connexion(this.formData).subscribe({
      next: (v) => {
        this.loading = false;
        this.store.dispatch(
          login({
            token: v,
          })
        );
        this.alert(this.formData.email);
        this.router.navigateByUrl('/');
        console.log(v);
      },
      error: (e) => {
        console.log(e);
        if (e.status == 0)
          this.errors["Le service n'est pas démarré"] = e.message;
        if (e.status == 404) this.errors["L'utilisateur est introuvable"] = '';
        this.loading = false;
      },
    });
  }
}
