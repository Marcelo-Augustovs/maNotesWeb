import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs'
import { isTokenExpired } from './auth.utils'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = 'http://localhost:8080/api/v1/auth'

  constructor(private http: HttpClient) {}

  login(data: { login: string, password: string }) {
    return this.http.post<any>(`${this.api}/login`, data)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token)
        })
      )
  }

  register(data: { login: string, password: string, role: string }) {
    return this.http.post(`${this.api}/register`, data)
  }

  logout(){
    localStorage.removeItem('token')
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token')
    return !!token && !isTokenExpired(token)
  }
}