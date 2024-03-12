import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProduitsPaginerResponseDTO } from '../../../../dtos/responses/produits/ProduitsPaginerResponseDTO';
import { ProduitsService } from '../../../../services/produits.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-supprimer-produits',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './supprimer.component.html',
  styleUrl: './supprimer.component.scss',
})
export class SupprimerComponent {
  @Input({ required: true }) produit!: ProduitsPaginerResponseDTO;
  @Output() isSupprimer: EventEmitter<any> = new EventEmitter();

  constructor(private produitsService: ProduitsService) {}

  supprimer() {
    if (
      window.confirm(
        'Êtes-vous sur de vouloir supprimer ? Cet action est irréversible'
      )
    ) {
      this.produitsService.delete(this.produit.id).subscribe({
        next: () => {
          this.isSupprimer.emit();
        },
      });
    }
  }
}
