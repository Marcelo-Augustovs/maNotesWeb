import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login = ''
  password = ''
  error = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(){

    this.authService.login({
      login: this.login,
      password: this.password
    }).subscribe({

      next: () => {
        this.router.navigate(['/notes']) // 👈 rota principal
      },

      error: () => {
        this.error = 'Usuário ou senha inválidos'
      }

    })

  }

}