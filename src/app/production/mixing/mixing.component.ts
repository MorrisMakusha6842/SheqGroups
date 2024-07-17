import { Component } from '@angular/core';
import { AddIngredientsComponent } from './add-ingredients/add-ingredients.component';
import { MixingBatchcardComponent } from './mixing-batch-card/mixing-batchcard.component';

@Component({
  selector: 'app-mixing',
  standalone: true,
  imports: [
    AddIngredientsComponent,
    MixingBatchcardComponent
  ],
  templateUrl: './mixing.component.html',
  styleUrl: './mixing.component.scss'
})
export class MixingComponent {

}
