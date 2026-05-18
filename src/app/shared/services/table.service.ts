import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface TableColumn {
  label: string;
  field: string;
}

export interface TableData {
  id: number;
  title: string;
  columns: TableColumn[];
  rows: any[];
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private tablesUrl = `${environment.apiUrl}/tables`;

  private mockTables: TableData[] = [
    { id: 1, title: 'Tabela Mensal', columns: [{ label: 'Descrição', field: 'col1' }, { label: 'Valor', field: 'col2' }], rows: [{ id: 1, col1: 'Exemplo', col2: 'R$ 100' }] }
  ];

  constructor(private http: HttpClient) {}

  getTables(): Observable<TableData[]> {
    return this.http.get<TableData[]>(this.tablesUrl).pipe(
      catchError(() => {
        console.warn('Backend indisponível. Usando tabelas mockadas.');
        return of(JSON.parse(JSON.stringify(this.mockTables))).pipe(delay(300));
      })
    );
  }

  createTable(table: TableData): Observable<TableData> {
    return this.http.post<TableData>(this.tablesUrl, table).pipe(
      catchError(() => {
        console.warn('Backend indisponível. POST tabela mockada.');
        const newTable = { ...table, id: Date.now() };
        this.mockTables.push(newTable);
        return of(newTable).pipe(delay(300));
      })
    );
  }

  updateTable(id: number, table: TableData): Observable<TableData> {
    return this.http.put<TableData>(`${this.tablesUrl}/${id}`, table).pipe(
      catchError(() => {
        console.warn('Backend indisponível. PUT tabela mockada.');
        const index = this.mockTables.findIndex(t => t.id === id);
        if (index !== -1) {
          this.mockTables[index] = JSON.parse(JSON.stringify(table));
        }
        return of(table).pipe(delay(300));
      })
    );
  }

  deleteTable(id: number): Observable<void> {
    return this.http.delete<void>(`${this.tablesUrl}/${id}`).pipe(
      catchError(() => {
        console.warn('Backend indisponível. DELETE tabela mockada.');
        this.mockTables = this.mockTables.filter(t => t.id !== id);
        return of(undefined).pipe(delay(300));
      })
    );
  }
}
