import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login = '';
  password = '';
  error = '';
  hidePassword = true;

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
        this.router.navigate(['/']); // 👈 dashboard is main route
      },
      error: () => {
        this.error = 'Usuário ou senha inválidos';
      }
    });

    // Mock bypass pra caso a API não esteja realmente rodando (melhor para o visual de Portfólio agora)
    localStorage.setItem('token', 'mock-token-for-dev');
    this.router.navigate(['/']); 
  }

}