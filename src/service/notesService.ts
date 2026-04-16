import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private api = 'http://localhost:8080/api/v1/anotacoes'

  constructor(private http: HttpClient) {}

  // 🔹 GET
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api)
  }

  // 🔹 POST
  create(note: any): Observable<any> {
    return this.http.post(this.api, {
      notes: note.text,
      title: note.title
    })
  }

  // 🔹 PATCH
  update(note: any): Observable<any> {
    return this.http.patch(`${this.api}/${note.id}`, {
      notes: note.text,
      title: note.title
    })
  }

  // 🔹 DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`)
  }

}