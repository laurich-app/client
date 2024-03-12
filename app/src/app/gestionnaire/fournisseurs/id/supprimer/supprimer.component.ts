import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FournisseursResponseDTO } from '../../../../dtos/responses/fournisseurs/FournisseursResponseDTO';
import { FournisseursService } from '../../../../services/fournisseurs.service';

@Component({
  selector: 'app-supprimer-fournisseurs',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './supprimer.component.html',
  styleUrl: './supprimer.component.scss',
})
export class SupprimerComponent {
  @Input({ required: true }) fournisseur!: FournisseursResponseDTO;
  @Output() isSupprimer: EventEmitter<any> = new EventEmitter();

  constructor(private fournisseursService: FournisseursService) {}

  supprimer() {
    if (
      window.confirm(
        'Êtes-vous sur de vouloir supprimer ? Cet action est irréversible'
      )
    ) {
      this.fournisseursService.delete(this.fournisseur.id).subscribe({
        next: () => {
          this.isSupprimer.emit();
        },
      });
    }
  }
}
