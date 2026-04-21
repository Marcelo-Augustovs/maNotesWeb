import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
  ],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {

  @Input()
  title!: string;

  @Input()
  icon!: string;

  @Input()
  valor!: string;

  @Input()
  type!: string;

  @Input()
  color!: string;
}
