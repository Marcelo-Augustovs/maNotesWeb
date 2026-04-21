import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private api = 'http://localhost:8080/api/v1/fundos'

  constructor(private http: HttpClient) { }

  create(income: any) {
    return this.http.post(this.api, {
      origemDoFundo: income.descricao,
      valorRecebido: income.valor,
      categoria: income.categoria,
      pagamento: income.pagamento
    })
  }

  getAll(params: any) {
    return this.http.get(`${this.api}`, { params });
  }

  getById(id: number) {
    return this.http.get(`${this.api}/${id}`)
  }

  update(id: number, income: any) {
    return this.http.patch(`${this.api}/${id}`, {
      origemDoFundo: income.descricao,
      valorRecebido: income.valor,
      categoria: income.categoria,
      pagamento: income.pagamento
    })
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`)
  }

}