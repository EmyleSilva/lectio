import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Cadastro } from './cadastro/cadastro';
import { Perfil } from './perfil/perfil';
import { Feed } from './feed/feed';
import { Biblioteca } from './biblioteca/biblioteca';
import { AvaliarLivro } from './avaliar-livro/avaliar-livro';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'perfil', component: Perfil },
  { path: 'feed', component: Feed },
  { path: 'biblioteca', component: Biblioteca },
  { path: 'avaliar', component: AvaliarLivro }
];