<h1 align="center"> Projeto Integrador II — DoarCuidar </h1>

<p align="center">
  <a href="#-descrição-do-entregável">Descrição</a> •
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •  
  <a href="#-como-executar-o-projeto">Como executar</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-autor">Autor</a> •
  <a href="#-licença">Licença</a>
</p>

---

## 📄 Descrição do entregável

Este repositório contém o **front-end** do DoarCuidar:

- SPA (React + Vite) com páginas: Home, Buscar Instituições, Detalhes, Doar, Login, Perfil, Cadastros.
- Componentes reutilizáveis (botões, formulários, cards).
- Integrações com **Firebase/Firestore** (cadastro de usuários).
- Modo DEMO com dados fictícios quando a API real não está disponível.

---

## 💻 Sobre o projeto

O **DoarCuidar** conecta pessoas a instituições sérias, facilitando a busca por ONGs, consulta por CNPJ/UF e a jornada de doação.  
Projeto do **Integrador II**, aproximando teoria e prática em um cenário de mundo do trabalho.

---

## ⚙️ Funcionalidades

- [x] Home com hero e galeria temática
- [x] Busca de instituições por palavra-chave/CNPJ e filtro por UF
- [x] Cards com Detalhes e Doar
- [x] Página de Doação (com fallback DEMO)
- [x] Cadastro de usuário (Firestore) e Login local (localStorage)
- [x] Perfil do usuário (edição básica)
- [x] Tema visual consistente (gradientes, sombras suaves, ícones Lucide)
- [x] Acessibilidade básica (labels, aria-attrs, foco)

> **Modo DEMO:** caso a API não responda JSON, o app usa uma lista de instituições fictícias para apresentação.

---
## 🚀 Como executar o projeto

1. **Clone o projeto**
```bash
git clone https://github.com/<seu-usuario>/<seu-repo>.git
cd <seu-repo>


Execute em dev

bash
Copiar código
npm run dev
## http://localhost:5173
Build de produção

bash
Copiar código
npm run build
npm run preview
🔧 Variáveis de ambiente
Crie um arquivo .env (ou .env.local) na raiz:

dotenv
Copiar código
## Liga o modo demonstração (dados fictícios)
VITE_USE_DEMO=true

## Base da API; com proxy do Vite pode ficar vazio
VITE_API_URL=""

## Firebase – se usar Firestore para cadastro de usuário
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
Dica: com VITE_USE_DEMO=true o app usa dados fictícios quando a API não retornar JSON (evita erro Unexpected token '<' / <!DOCTYPE ...).
<!-- ---------------------------------------------------------------------- -->

<!-- 🛠 Tecnologias -->
### Front-end

React 18 + Vite

React Router

Tailwind CSS

Lucide React

Dados / Integração

API HTTP (opcional)

Firebase / Firestore (cadastro de usuário)

Qualidade

Acessibilidade e semântica básica

UI consistente (gradientes, sombras, estados de erro/carregamento)

---

<!-- ---------------------------------------------------------------------- -->

## 📁 Estrutura do projeto
css
Copiar código
src/
  componentes/
    home/
      HeroSection.jsx
      DonationGallery.jsx
    instituicoes/
      ListaInstituicoes.jsx
      FormDoacao.jsx
    layout/
      Header.jsx
      Footer.jsx
      Layout.jsx
    ui/
      Button.jsx
      CampoSenha.jsx
  pages/
    Home.jsx
    BuscarInstituicoes.jsx
    DetalhesInstituicao.jsx
    Doar.jsx
    Login.jsx
    Perfil.jsx
    CadastroUsuario.jsx
    CadastroInstituicao.jsx
  lib/
    api.js
    firebaseConfig.js
  assets/
    fundo.png
    LogoDoarCuidar.png
main.jsx
App.jsx
🧭 Roteiro e status
 Base (Vite + Tailwind + Router)

 Header/Footer + tema visual

 Home (hero + CTA + galeria)

 Busca (query + UF) + cards

 Fallback DEMO (content-type guard)

 Cadastro usuário (Firestore) / Login local

 Detalhes / Doar

 API real de instituições

 Autenticação real (Firebase Auth)

 Testes unit/E2E

 Deploy (Vercel/Netlify)

---

<!-- ---------------------------------------------------------------------- -->

<!-- Observações

Se a API retornar HTML (ex.: erro de proxy), a aplicação alterna para DEMO.

Configure o proxy do Vite/servidor para retornar JSON nas rotas da API.
<!-- ---------------------------------------------------------------------- -->

<!-- MODELO DE AUTOR-->
## 🦸 Autor(a)

<a href="/">
Alunos</a>
 <br />
 
Jose Edson Rodrigues

Fábio

Keven

Lucca

Viviane Oliveira Soares
---



