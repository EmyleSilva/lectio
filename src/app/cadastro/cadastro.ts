import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  dados = { nome: '', email: '', senha: '', confirmarSenha: '' };
  erro = '';
  
  // Variáveis para controlar os olhinhos da senha
  showPassword = false;
  showConfirmPassword = false;

  constructor(private router: Router, private api: ApiService) {}

  // Métodos que trocam de texto para bolinhas
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    if (this.dados.senha !== this.dados.confirmarSenha) {
      this.erro = 'As senhas não coincidem';
      return;
    }
    
    this.api.cadastrar(this.dados.nome, this.dados.email, this.dados.senha).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.erro = 'Não foi possível cadastrar (e-mail já existe?)'
    });
  }
}