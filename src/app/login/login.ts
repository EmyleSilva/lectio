import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Objeto para vincular aos inputs via ngModel
  credentials = {
    email: '',
    password: ''
  };

  showPassword = false;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Recebe o formulário (NgForm) submetido pelo HTML
  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log('Dados do login submetidos:', this.credentials);
      
      // Lógica de autenticação entraria aqui
      
      this.router.navigate(['/feed']);
    } else {
      // Força a exibição dos erros se o utilizador tentar submeter um formulário inválido
      Object.keys(loginForm.controls).forEach(field => {
        const control = loginForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}