import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-dash-bord',
  imports: [CardComponent],
  standalone: true,
  templateUrl: './dash-bord.component.html',
  styleUrl: './dash-bord.component.scss'
})
export class DashBordComponent {
  
}
