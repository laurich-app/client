import { Component, OnInit } from '@angular/core';
import { UtilisateurResponseDTO } from '../../dtos/responses/utilisateurs/UtilisateurResponseDTO';
import { UtilisateursService } from '../../services/utilisateurs.service';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [],
  templateUrl: './me.component.html',
  styleUrl: './me.component.scss',
})
export class MeComponent implements OnInit {
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
