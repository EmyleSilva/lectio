import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials = { email: '', password: '' };
  showPassword = false;
  erro = '';

  constructor(private router: Router, private api: ApiService, private session: SessionService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.api.login(this.credentials.email, this.credentials.password).subscribe({
        next: (usuario) => {
          this.session.usuario.set(usuario);
          this.router.navigate(['/biblioteca']); 
        },
        error: () => { this.erro = 'E-mail ou senha inválidos'; }
      });
    } else {
      Object.keys(loginForm.controls).forEach(field => {
        loginForm.controls[field].markAsTouched({ onlySelf: true });
      });
    }
  }
}