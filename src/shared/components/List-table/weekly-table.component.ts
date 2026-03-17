import { Component } from '@angular/core';

@Component({
  selector: 'app-weekly-table',
  imports: [],
  standalone: true,
  templateUrl: './weekly-table.component.html',
  styleUrl: './weekly-table.component.scss'
})
export class WeeklyTableComponent {
    week = [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo"
  ]
}
