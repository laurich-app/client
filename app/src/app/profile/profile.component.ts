import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from '../services/utilisateurs.service';
import { UtilisateurResponseDTO } from '../dtos/responses/utilisateurs/UtilisateurResponseDTO';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  me!: UtilisateurResponseDTO;

  constructor(private utilisateursService: UtilisateursService) {}

  ngOnInit(): void {
    // Logique d'initialisation à exécuter ici
    console.log('Le composant est initialisé.');
    this.utilisateursService.me().subscribe({
      next: (e) => {
        this.me = e;
      },
    });
  }
}
