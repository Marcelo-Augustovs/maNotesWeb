import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-period-menu',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './period-menu.component.html',
  styleUrl: './period-menu.component.scss'
})
export class PeriodMenuComponent {

  @Output() periodChange = new EventEmitter<{ year: number, month: number }>();

  currentDate = new Date();
  selectedYear = this.currentDate.getFullYear();
  selectedMonth = this.currentDate.getMonth();

  months = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
  ];

  years: number[] = [];

  ngOnInit() {
    this.loadYears();
    this.emitChange(); // opcional: já carrega inicial
  }

  loadYears() {
    const apiYears = [2022, 2023, 2024];
    const currentYear = this.currentDate.getFullYear();

    const yearSet = new Set([...apiYears, currentYear]);
    this.years = Array.from(yearSet).sort();
  }

  selectMonth(index: number) {
    this.selectedMonth = index;
    this.emitChange();
  }

  changeYear() {
    if (!this.years.includes(this.selectedYear)) {
      this.years.push(this.selectedYear);
      this.years.sort();
    }
    this.emitChange();
  }

  previousYear() {
    this.selectedYear--;
    this.changeYear();
  }

  nextYear() {
    this.selectedYear++;
    this.changeYear();
  }

  private emitChange() {
    this.periodChange.emit({
      year: this.selectedYear,
      month: this.selectedMonth
    });
  }
}