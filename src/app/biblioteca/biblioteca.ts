import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-biblioteca',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.css',
})
export class Biblioteca implements OnInit {

  // ─── Estado do formulário ──────────────────────────────────────────────────
  mostrarModal = false;
  salvando = false;
  erro = '';
  sucesso = '';

  novaEstante = {
    nome: '',
    tipo: 'CUSTOMIZADA',
    descricao: ''
  };

  // ─── Lista de estantes carregadas da API ───────────────────────────────────
  estantes: any[] = [];

  constructor(
    private api: ApiService,
    private session: SessionService
  ) {}

  ngOnInit(): void {
    this.carregarEstantes();
  }

  abrirModal(): void {
    this.novaEstante = { nome: '', tipo: 'CUSTOMIZADA', descricao: '' };
    this.erro = '';
    this.sucesso = '';
    this.mostrarModal = true;
  }

  fecharModal(): void {
    this.mostrarModal = false;
  }

  carregarEstantes(): void {
    const usuario = this.session.usuario();
    if (!usuario) return;

    this.api.listarEstantes(usuario.id).subscribe({
      next: (lista) => { this.estantes = lista; },
      error: () => { /* silencioso — usuário ainda não tem estantes ou não logado */ }
    });
  }

  criarEstante(): void {
    const usuario = this.session.usuario();
    if (!usuario) {
      this.erro = 'Você precisa estar logado.';
      return;
    }

    if (!this.novaEstante.nome.trim()) {
      this.erro = 'O nome da estante é obrigatório.';
      return;
    }

    this.salvando = true;
    this.erro = '';

    this.api.criarEstante(usuario.id, this.novaEstante).subscribe({
      next: (estanteCriada) => {
        this.estantes = [...this.estantes, estanteCriada];
        this.sucesso = `Estante "${estanteCriada.nome}" criada com sucesso!`;
        this.salvando = false;
        setTimeout(() => this.fecharModal(), 1500);
      },
      error: () => {
        this.erro = 'Erro ao criar estante. Tente novamente.';
        this.salvando = false;
      }
    });
  }
}
