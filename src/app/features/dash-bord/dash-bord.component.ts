import { AfterViewInit, Component} from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import Chart from 'chart.js/auto';
import { Card } from '../../../shared/models/card.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../../service/dashBordService';
import { IncomeService } from '../../../service/incomeService';
import { ExpenseService } from '../../../service/expenseService';
import { ModalFinanceComponent } from '../../../shared/components/modal-finance/modal-finance.component';
import { PeriodMenuComponent } from "../../../shared/components/period-menu/period-menu.component";

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

export interface Transaction {
  descricao: string;
  valor: string;
  valorNum: number;
  data: string;
  categoria: string;
  tipo: 'Receita' | 'Despesa';
  pagamento: string;
}

@Component({
  selector: 'app-dash-bord',
  imports: [
    CardComponent, 
    CommonModule, 
    FormsModule, 
    ModalFinanceComponent, 
    PeriodMenuComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule
  ],
  standalone: true,
  templateUrl: './dash-bord.component.html',
  styleUrl: './dash-bord.component.scss'
})
export class DashBordComponent implements AfterViewInit {
  
  showModal = false;
  modalType: 'receita' | 'despesa' = 'receita';
  isEditMode = false;
  selectedTransaction: Transaction | null = null;
  
  pageSize = 5;
  pageIndex = 0;

  cardList: Card[] = [];

  currentPeriod = { year: new Date().getFullYear(), month: new Date().getMonth() };

  searchTerm: string = '';
  transactions: Transaction[] = [
    { descricao: 'Salário mensalista', valor: 'R$ 4.323,45', valorNum: 4323.45, data: '01/04/2026', categoria: 'Renda Fixa', tipo: 'Receita', pagamento: 'Pix' },
    { descricao: 'Compras do Mês', valor: 'R$ 800,00', valorNum: 800, data: '10/04/2026', categoria: 'Alimentação', tipo: 'Despesa', pagamento: 'Cartão de crédito' },
    { descricao: 'Conta de Energia', valor: 'R$ 250,00', valorNum: 250, data: '15/04/2026', categoria: 'Moradia', tipo: 'Despesa', pagamento: 'Débito Automático' },
    { descricao: 'Venda de Notebook Velho', valor: 'R$ 1.500,00', valorNum: 1500, data: '22/04/2026', categoria: 'Extra', tipo: 'Receita', pagamento: 'Transferência Bancária' },
    { descricao: 'Gasolina', valor: 'R$ 150,00', valorNum: 150, data: '25/04/2026', categoria: 'Transporte', tipo: 'Despesa', pagamento: 'Cartão de crédito' }
  ];

  // Chamada simulada se falhar, para manter fluidez
  fallbackData = [
    {ano: 2026, mes: 4, receitas: 5823.45, despesas: 1200}
  ];

  get filteredTransactions() {
    return this.transactions.filter(t => {
      const term = this.searchTerm.toLowerCase();
      return t.descricao.toLowerCase().includes(term) ||
             t.valor.toLowerCase().includes(term) ||
             t.data.toLowerCase().includes(term) ||
             t.categoria.toLowerCase().includes(term) ||
             t.tipo.toLowerCase().includes(term) ||
             t.pagamento.toLowerCase().includes(term);
    });
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

  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService,
    private dashboardService: DashboardService) {}

  loadDashboard(year: number, month: number) {
    this.dashboardService.getAll().subscribe({
      next: (data) => {
        this.processDashboardData(data, year, month);
      },
      error: () => {
        // Fallback p/ não quebrar a UI
        this.processDashboardData(this.fallbackData, year, month);
      }
    });
  }

  processDashboardData(data: any[], year: number, month: number){
      const mes = month + 1;
      const ano = year;

      const registro = data.find(item => 
        item.mes === mes && item.ano === ano
      );

      const receitas = registro?.receitas ?? 2000; // default for visual
      const despesas = registro?.despesas ?? 500;
      const saldoMes = receitas - despesas;

      this.cardList = [
        {
          title: "Receitas do mês",
          color: "receita",
          icon: "arrow_upward",
          valor: this.formatMoney(receitas)
        },
        {
          title: "Despesas do mês",
          color: "despesa",
          icon: "arrow_downward",
          valor: this.formatMoney(despesas)
        },
        {
          title: "Balanço do mês",
          color: "saldo",
          icon: "account_balance",
          valor: this.formatMoney(saldoMes)
        },
        {
          title: "Balanço geral",
          color: "geral",
          icon: "account_balance_wallet",
          valor: this.formatMoney(this.getTotalGeral(data))
        }
      ];
  }

  onPeriodChange(event: { year: number, month: number }) {
    this.currentPeriod = event;
    this.loadDashboard(event.year, event.month);
  }  
   
  ngAfterViewInit(): void {
    new Chart("financeChart", {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Receitas',
            data: [1200, 1900, 3000, 500, 2000, 3200],
            backgroundColor: 'rgba(46, 204, 113, 0.8)',
            borderRadius: 8
          },
          {
            label: 'Despesas',
            data: [800, 1100, 1200, 400, 900, 1500],
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

    this.loadDashboard(this.currentPeriod.year, this.currentPeriod.month);
  }

  addRevenue(){
    this.isEditMode = false;
    this.selectedTransaction = null;
    this.modalType = 'receita';
    this.showModal = true;
  }

  addExpense(){
    this.isEditMode = false;
    this.selectedTransaction = null;
    this.modalType = 'despesa';
    this.showModal = true;
  }

  editTransaction(t: Transaction) {
    this.selectedTransaction = t;
    this.isEditMode = true;
    this.modalType = t.tipo.toLowerCase() as 'receita' | 'despesa';
    this.showModal = true;
  }

  closeModal(){
    this.showModal = false;
  }

  handleSave(data: any){
    if(this.modalType === 'receita'){
      const payload = {
        origemDoFundo: data.descricao,
        valorRecebido: data.valor
      };
      this.incomeService.create(payload).subscribe(() => {
        this.loadDashboard(this.currentPeriod.year, this.currentPeriod.month);
      });
    } else {
      const payload = {
        descricao: data.descricao,
        valor: data.valor,
        data: data.data,
        categoria: data.categoria
      };
      this.expenseService.create(payload).subscribe(() => {
        this.loadDashboard(this.currentPeriod.year, this.currentPeriod.month);
      });
    }
  }

  formatMoney(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  getTotalGeral(data: any[]): number {
    return data.reduce((total, item) => {
      return total + (item.receitas ?? 0) - (item.despesas ?? 0);
    }, 0);
  }     
}
