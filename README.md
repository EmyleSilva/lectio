# 📚 Lectio

Lectio é uma aplicação web para leitores registrarem, avaliarem e organizarem os livros que leem — uma espécie de rede social de leitura, com biblioteca pessoal, feed, perfil com estantes/coleções e avaliação de livros.

> ⚠️ **Sobre este repositório:** ele contém **apenas o front-end** da aplicação (Angular). O back-end (API REST) é um serviço separado, que **não está incluso neste repositório**. A seção [Back-end / API](#-back-end--api) documenta o contrato que o front-end espera dessa API, com base nas chamadas feitas em `src/app/services/api.service.ts`.

---

## 🖥️ Front-end

### Tecnologias

- [Angular](https://angular.dev/) `21.x` (standalone components)
- TypeScript `5.9`
- RxJS
- Angular CLI
- [Vitest](https://vitest.dev/) — testes unitários
- Prettier — formatação de código

### Estrutura do projeto

```
src/
├── app/
│   ├── login/              # Tela de login
│   ├── cadastro/           # Tela de cadastro de usuário
│   ├── feed/                # Feed de atividades/livros
│   ├── biblioteca/          # Biblioteca pessoal do usuário (estantes)
│   ├── perfil/               # Perfil do usuário e coleções/listas de livros
│   ├── avaliar-livro/        # Formulário de avaliação de um livro
│   ├── services/
│   │   ├── api.service.ts       # Camada de comunicação com a API (HTTP)
│   │   └── session.service.ts   # Estado da sessão do usuário logado (signal)
│   ├── app.routes.ts        # Definição das rotas
│   ├── app.config.ts        # Configuração/providers da aplicação
│   └── environment.ts       # Configuração de ambiente (URL da API)
├── index.html
├── main.ts
└── styles.css
```

### Rotas da aplicação

| Rota          | Componente     | Descrição                                     |
|---------------|----------------|------------------------------------------------|
| `/`           | → `/login`     | Redireciona para a tela de login                |
| `/login`      | `Login`        | Autenticação do usuário                         |
| `/cadastro`   | `Cadastro`     | Cadastro de novo usuário                        |
| `/perfil`     | `Perfil`       | Perfil do usuário, listas e coleções de livros  |
| `/feed`       | `Feed`         | Feed de conteúdo                                |
| `/biblioteca` | `Biblioteca`   | Biblioteca pessoal / estantes do usuário        |
| `/avaliar`    | `AvaliarLivro` | Formulário para avaliar um livro                |

### Gerenciamento de estado da sessão

O `SessionService` mantém, via Angular `signal`, os dados do usuário autenticado (`id`, `nome`, `email`) em memória durante a sessão da aplicação. Ele é populado pelo componente `Login` após uma autenticação bem-sucedida.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (compatível com Angular 21)
- npm `11.x`

### Instalação

```bash
git clone https://github.com/EmyleSilva/lectio.git
cd lectio
npm install
```

### Configuração

A URL base da API é definida em `src/app/environment.ts`:

```ts
export const environment = {
  apiUrl: 'http://localhost:8080'
};
```

Ajuste esse valor para apontar para o back-end desejado (local, ngrok, produção etc.) antes de rodar a aplicação.

### Executando em desenvolvimento

```bash
npm start
# ou
ng serve
```

A aplicação fica disponível em `http://localhost:4200/` e recarrega automaticamente a cada alteração nos arquivos-fonte.

### Build de produção

```bash
npm run build
```

Os artefatos de build são gerados na pasta `dist/`.

### Testes

```bash
npm test
```

Executa os testes unitários com o Vitest.

---

## 🔗 Back-end / API

O front-end consome uma API REST através do `ApiService` (`src/app/services/api.service.ts`). Abaixo está o contrato esperado por essa API — **a implementação do servidor não faz parte deste repositório** e deve ser fornecida/documentada separadamente.

### Base URL

Definida em `environment.apiUrl` (padrão: `http://localhost:8080`).

### Endpoints esperados

| Método   | Endpoint                                          | Descrição                                  | Corpo da requisição                              | Resposta esperada                            |
|----------|----------------------------------------------------|----------------------------------------------|-----------------------------------------------------|------------------------------------------------|
| `POST`   | `/login`                                            | Autentica um usuário                          | `{ email: string, senha: string }`                   | `{ id: number, nome: string, email: string }`   |
| `POST`   | `/usuarios`                                         | Cadastra um novo usuário                      | `{ nome: string, email: string, senha: string }`     | Usuário criado                                  |
| `GET`    | `/livros`                                           | Lista o catálogo geral de livros              | —                                                     | `Livro[]`                                        |
| `GET`    | `/estantes/{estanteId}/livros`                      | Lista os livros de uma estante específica     | —                                                     | `Livro[]`                                        |
| `POST`   | `/estantes/{estanteId}/livros`                      | Adiciona um livro a uma estante               | `{ livroId: number, statusLeitura: string }`         | Item da estante criado                          |
| `DELETE` | `/estantes/{estanteId}/livros/{estanteLivroId}`     | Remove um livro de uma estante                | —                                                     | Confirmação de remoção                          |

> `Livro` não tem um schema explícito no front-end (é tratado como `any[]`); ao especificar o back-end, recomenda-se definir os campos exatos (ex.: `id`, `titulo`, `autor`, `capa` etc.) para manter o contrato consistente entre as duas camadas.

### Observações

- As requisições incluem o header `ngrok-skip-browser-warning: true`, usado para testes com o back-end exposto via [ngrok](https://ngrok.com/) — pode ser ignorado/removido em produção.
- Não há, no front-end atual, tratamento de token/JWT — a sessão é mantida apenas em memória no `SessionService` após o login.
