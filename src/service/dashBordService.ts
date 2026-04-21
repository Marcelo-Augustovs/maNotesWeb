import { Injectable } from '@angular/core'
import { IncomeService } from './incomeService'
import { ExpenseService } from './expenseService'
import { forkJoin } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class DashboardService {

  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService
  ) { }

  getAllMonthFinance(params: any) {
    return forkJoin({
      incomes: this.incomeService.getAll(params),
      expenses: this.expenseService.getAll(params)
    });
  }
}