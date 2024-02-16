import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateursComponent } from './utilisateurs/utilisateurs.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [UtilisateursComponent],
  imports: [CommonModule],
})
export class GestionnaireModule {}
