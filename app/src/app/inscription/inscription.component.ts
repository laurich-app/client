import { Component } from '@angular/core';
import { InscriptionRequestDTO } from '../dtos/requests/utilisateurs/InscriptionRequestDTO';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UtilisateursService } from '../services/utilisateurs.service';
import { login } from '../store/auth.actions';
import { Error } from '../models/error';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent {
  errors: Error = {};
  auth$!: Observable<Auth>;
  formData: InscriptionRequestDTO = {
    email: '',
    pseudo: '',
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
    this.utilisateursService.inscription(this.formData).subscribe({
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
        if (e.status == 409) this.errors["L'utilisateur existe déjà"] = '';
        if (e.status == 400) this.errors = e.error;
        this.loading = false;
      },
    });
  }
}
