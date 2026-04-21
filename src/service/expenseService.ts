import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private api = 'http://localhost:8080/api/v1/despesa'

  constructor(private http: HttpClient) { }

  create(expense: any) {
    return this.http.post(this.api, {
      nomeDaConta: expense.descricao,
      valorDaConta: expense.valor,
      category: expense.categoria,
      payment: expense.pagamento
    })
  }

  getAll(params: any) {
    return this.http.get(`${this.api}`, { params });
  }

  getById(id: number) {
    return this.http.get(`${this.api}/${id}`)
  }

  update(id: number, expense: any) {
    return this.http.patch(`${this.api}/${id}`, {
      nomeDaConta: expense.descricao,
      valorDaConta: expense.valor,
      category: expense.categoria,
      payment: expense.pagamento
    })
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`)
  }

}