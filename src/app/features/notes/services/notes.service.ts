import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Note } from '../models/Note.model'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private api = 'http://localhost:8080/api/v1/anotacoes'

  constructor(private http: HttpClient) {}

  // 🔹 GET
  getAll(): Observable<Note[]> {
    return this.http.get<any[]>(this.api).pipe(
      map(data => data.map(item => ({
        id: item.id,
        title: item.title,
        text: item.notes, // Mapeia 'notes' do backend para 'text' no frontend
        position: item.position || 0
      })))
    )
  }

  // 🔹 POST
  create(note: Note): Observable<any> {
    return this.http.post(this.api, {
      notes: note.text,
      title: note.title
    })
  }

  // 🔹 PATCH
  update(note: Note): Observable<any> {
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