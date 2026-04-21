import { AfterViewInit, Component } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { ButtonAddPainelComponent } from '../../../shared/components/button-add-painel/button-add-painel.component';

import { Transaction } from '../../../shared/models/transaction.model';
import { MainContentGridComponent } from '../../../shared/components/main-content-grid/main-content-grid.component';

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
    MatPaginatorModule,
    ButtonAddPainelComponent,
    MainContentGridComponent
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

  chartDataFromApi = { receitas: new Array(12).fill(0), despesas: new Array(12).fill(0) };

  cardList: Card[] = [];

  currentPeriod = { year: new Date().getFullYear(), month: new Date().getMonth() };

  transactions: Transaction[] = [];

  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService,
    private dashboardService: DashboardService) { }

  loadDashboard(year: number, month: number) {
    const start = `${year}-01-01`;
    const end = `${year}-12-31`;

    const params = { start, end }; // Passando o ano como parâmetro conforme solicitado
    this.dashboardService.getAllMonthFinance(params).subscribe({
      next: (data: any) => {
        this.processDashboardData(data, year, month);
      },
      error: () => {
        // Fallback array vazios em caso de falha de conexão
        this.processDashboardData({ incomes: [], expenses: [] }, year, month);
      }
    });
  }

  getMonthFromDate(dateString: string): number {
    if (!dateString) return -1;
    if (dateString.includes('/')) {
      const parts = dateString.split('/');
      return parseInt(parts[1], 10) - 1;
    } else {
      const date = new Date(dateString);
      return date.getMonth();
    }
  }

  processDashboardData(data: any, year: number, month: number) {
    const incomes = data.incomes?.content || [];
    const expenses = data.expenses?.content || [];

    let receitasMes = 0;
    let despesasMes = 0;

    // Arrays para o Chart agrupados por mês (Jan a Dez, índice 0 a 11)
    const chartReceitas = new Array(12).fill(0);
    const chartDespesas = new Array(12).fill(0);

    const transactionsList: Transaction[] = [];

    incomes.forEach((inc: any) => {
      const incMonth = this.getMonthFromDate(inc.dataModificacao);
      const val = parseFloat(inc.valorRecebido || inc.valor || 0);

      if (incMonth >= 0 && incMonth < 12) {
        chartReceitas[incMonth] += val;
        if (incMonth === month) {
          receitasMes += val;
        }
      }

      transactionsList.push({
        descricao: inc.origemDoFundo || inc.descricao || '',
        valor: this.formatMoney(val),
        valorNum: val,
        data: inc.dataModificacao,
        categoria: inc.categoria,
        tipo: 'Receita',
        pagamento: inc.pagamento
      });
    });

    expenses.forEach((exp: any) => {
      const expMonth = this.getMonthFromDate(exp.dataModificacao);
      const val = parseFloat(exp.valorDaConta || 0);

      if (expMonth >= 0 && expMonth < 12) {
        chartDespesas[expMonth] += val;
        if (expMonth === month) {
          despesasMes += val;
        }
      }

      transactionsList.push({
        descricao: exp.descricao || exp.nomeDaConta || '',
        valor: this.formatMoney(val),
        valorNum: val,
        data: exp.dataModificacao,
        categoria: exp.category,
        tipo: 'Despesa',
        pagamento: exp.payment
      });
    });

    this.transactions = transactionsList;
    // Atualiza o envio dos arrays dinâmicos processados para o grafico (do Jan até Dez)
    this.chartDataFromApi = { receitas: chartReceitas, despesas: chartDespesas };

    const saldoMes = receitasMes - despesasMes;

    const totalReceitas = chartReceitas.reduce((acc, curr) => acc + curr, 0);
    const totalDespesas = chartDespesas.reduce((acc, curr) => acc + curr, 0);
    const balancoGeral = totalReceitas - totalDespesas;

    this.cardList = [
      {
        title: "Receitas do mês",
        color: "receita",
        icon: "arrow_upward",
        valor: this.formatMoney(receitasMes)
      },
      {
        title: "Despesas do mês",
        color: "despesa",
        icon: "arrow_downward",
        valor: this.formatMoney(despesasMes)
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
        valor: this.formatMoney(balancoGeral)
      }
    ];
  }

  onPeriodChange(event: { year: number, month: number }) {
    this.currentPeriod = event;
    this.loadDashboard(event.year, event.month);
  }

  ngAfterViewInit(): void {
    this.loadDashboard(this.currentPeriod.year, this.currentPeriod.month);
  }


  editTransaction(t: Transaction) {
    this.selectedTransaction = t;
    this.isEditMode = true;
    this.modalType = t.tipo.toLowerCase() as 'receita' | 'despesa';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleSave(data: any) {
    if (this.modalType === 'receita') {
      const payload = {
        descricao: data.descricao,
        valor: data.valor,
        tipo: 'receita',
        categoria: data.categoria,
        pagamento: data.pagamento,
        data: data.data
      };
      this.incomeService.create(payload).subscribe(() => {
        this.loadDashboard(this.currentPeriod.year, this.currentPeriod.month);
      });
    } else {
      const payload = {
        descricao: data.descricao,
        valor: data.valor,
        data: data.data,
        categoria: data.categoria,
        pagamento: data.pagamento
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


  buttonList = [
    {
      entityName: 'Receita',
      matIcon: 'attach_money',
      color: 'primary',
      type: 'receita'
    },
    {
      entityName: 'Despesa',
      matIcon: 'money_off',
      color: 'warn',
      type: 'despesa'
    }
  ];
  addRevenue() {
    this.isEditMode = false;
    this.selectedTransaction = null;
    this.modalType = 'receita';
    this.showModal = true;
  }
  addExpense() {
    this.isEditMode = false;
    this.selectedTransaction = null;
    this.modalType = 'despesa';
    this.showModal = true;
  }
  handleAdd(button: any) {
    if (button.type === 'receita') {
      this.addRevenue();
    } else {
      this.addExpense();
    }
  }
}
