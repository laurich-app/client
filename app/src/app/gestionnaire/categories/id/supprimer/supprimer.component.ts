import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoriesResponseDTO } from '../../../../dtos/responses/categories/CategoriesResponseDTO';
import { CategoriesService } from '../../../../services/categories.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-supprimer-categories',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './supprimer.component.html',
  styleUrl: './supprimer.component.scss',
})
export class SupprimerComponent {
  @Input({ required: true }) categorie!: CategoriesResponseDTO;
  @Output() isSupprimer: EventEmitter<any> = new EventEmitter();

  constructor(private categoriesService: CategoriesService) {}

  supprimer() {
    if (
      window.confirm(
        'Êtes-vous sur de vouloir supprimer ? Cet action est irréversible'
      )
    ) {
      this.categoriesService.delete(this.categorie.id).subscribe({
        next: () => {
          this.isSupprimer.emit();
        },
      });
    }
  }
}
