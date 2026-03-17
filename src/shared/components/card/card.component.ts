import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
   
  @Input()
    title!: string;

  @Input()
    color!: string;

  @Input()
    icon!: string;

  @Input()
      valor!: string;
}
