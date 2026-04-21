import { Component, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import Chart from 'chart.js/auto';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-main-content-grid',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  templateUrl: './main-content-grid.component.html',
  styleUrls: ['./main-content-grid.component.scss']
})
export class MainContentGridComponent implements AfterViewInit, OnChanges {
  @Input() transactions: Transaction[] = [];
  @Input() chartData: { receitas: number[], despesas: number[] } | null = null;
  @Output() editTransactionEvent = new EventEmitter<Transaction>();

  private financeChart: any;

  searchTerm: string = '';
  pageSize = 5;
  pageIndex = 0;

  get filteredTransactions() {
    if (!this.searchTerm) return this.transactions;
    const term = this.searchTerm.toLowerCase();
    return this.transactions.filter(t => {
      return (t.descricao || '').toLowerCase().includes(term) ||
        (t.valor || '').toLowerCase().includes(term) ||
        (t.data || '').toLowerCase().includes(term) ||
        (t.categoria || '').toLowerCase().includes(term) ||
        (t.tipo || '').toLowerCase().includes(term) ||
        (t.pagamento || '').toLowerCase().includes(term);
    });
  }

  onSearchChange() {
    this.pageIndex = 0;
  }

  get paginatedTransactions() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredTransactions.slice(start, end);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  editTransaction(t: Transaction) {
    this.editTransactionEvent.emit(t);
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartData'] && this.financeChart) {
      this.updateChartData();
    }
  }

  initChart() {
    this.financeChart = new Chart('financeChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
          {
            label: 'Receitas',
            data: this.chartData?.receitas || new Array(12).fill(0),
            backgroundColor: 'rgba(46, 204, 113, 0.8)',
            borderRadius: 8
          },
          {
            label: 'Despesas',
            data: this.chartData?.despesas || new Array(12).fill(0),
            backgroundColor: 'rgba(231, 76, 60, 0.8)',
            borderRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: '#ffffff' }
          }
        },
        scales: {
          x: { ticks: { color: '#ffffff' } },
          y: { ticks: { color: '#ffffff' } }
        }
      }
    });
  }

  updateChartData() {
    if (this.financeChart && this.chartData) {
      this.financeChart.data.datasets[0].data = this.chartData.receitas;
      this.financeChart.data.datasets[1].data = this.chartData.despesas;
      this.financeChart.update();
    }
  }
}
