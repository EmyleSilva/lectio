import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private ngrokHeaders = {
    headers: new HttpHeaders({ 'ngrok-skip-browser-warning': 'true' }) // para testes utilizando ngrok
  };

  constructor(private http: HttpClient) {}

  login(email: string, senha: string) {
    return this.http.post<{id: number, nome: string, email: string}>(`${environment.apiUrl}/login`, { email, senha }
    , this.ngrokHeaders);
  }

  cadastrar(nome: string, email: string, senha: string) {
    return this.http.post(`${environment.apiUrl}/usuarios`, { nome, email, senha }
    , this.ngrokHeaders);
  }

  listarLivrosDoCatalogo() {
    return this.http.get<any[]>(`${environment.apiUrl}/livros`);
  }

  // ─── Estante ───────────────────────────────────────────────────────────────

  criarEstante(usuarioId: number, dados: { nome: string; tipo: string; descricao: string }) {
    return this.http.post<any>(
      `${environment.apiUrl}/usuarios/${usuarioId}/estantes`,
      dados,
      this.ngrokHeaders
    );
  }

  listarEstantes(usuarioId: number) {
    return this.http.get<any[]>(
      `${environment.apiUrl}/usuarios/${usuarioId}/estantes`,
      this.ngrokHeaders
    );
  }

  // ─── EstanteLivro ──────────────────────────────────────────────────────────

  listarLivrosDaEstante(estanteId: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/estantes/${estanteId}/livros`);
  }

  adicionarLivroNaEstante(estanteId: number, livroId: number, statusLeitura: string) {
    return this.http.post(`${environment.apiUrl}/estantes/${estanteId}/livros`, { livroId, statusLeitura });
  }

  removerLivroDaEstante(estanteId: number, estanteLivroId: number) {
    return this.http.delete(`${environment.apiUrl}/estantes/${estanteId}/livros/${estanteLivroId}`);
  }
}