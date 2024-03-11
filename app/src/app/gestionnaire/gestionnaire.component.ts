import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-gestionnaire',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, RouterLink],
  templateUrl: './gestionnaire.component.html',
  styleUrl: './gestionnaire.component.scss',
})
export class GestionnaireComponent {}
