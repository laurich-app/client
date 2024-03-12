import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from '../services/utilisateurs.service';
import { UtilisateurResponseDTO } from '../dtos/responses/utilisateurs/UtilisateurResponseDTO';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
