import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buy-page',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './buy-page.component.html',
  styleUrl: './buy-page.component.scss'
})
export class BuyPageComponent {
view: string;



}
