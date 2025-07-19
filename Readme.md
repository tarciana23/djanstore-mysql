# 📚 DjanStore API

Uma API RESTful desenvolvida em **Node.js** com **Express** e **MySQL**, para gerenciar livros, autores e favoritos de uma livraria fictícia chamada **DjanStore**.

## 🚀 Tecnologias Utilizadas

* **Node.js**
* **Express**
* **MySQL**
* **Nodemon** (ambiente de desenvolvimento)

## 📁 Estrutura do Projeto

```
djanStore-server/
│
├── app.js                  # Arquivo principal da aplicação
├── db.js                   # Configuração de conexão com o banco MySQL
├── package.json            # Dependências e scripts
│
├── controllers/            # Controladores com lógica das rotas
│   ├── autores.js
│   ├── favoritos.js
│   └── livro.js
│
├── routes/                 # Definições de rotas da API
│   ├── autores.js
│   ├── favoritos.js
│   └── livro.js
│
├── services/               # Serviços que interagem com o banco de dados
│   ├── autor.js
│   ├── favorito.js
│   └── livro.js
│
└── teste.js                # Script auxiliar de testes
```

## 📌 Funcionalidades

* ✅ Listar e cadastrar **livros**
* ✅ Listar e cadastrar **autores**
* ✅ Adicionar e listar **favoritos**

## 🛠️ Pré-requisitos

* **Node.js** instalado
* **MySQL** rodando localmente ou na nuvem
* Um banco criado com as tabelas correspondentes (livros, autores, favoritos)

## ▶️ Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/djanStore-server.git
cd djanStore-server
```

### 2. Configure o banco de dados

Edite o arquivo `db.js` com suas credenciais:

```js
const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'djanstore'
});

export default connection;
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie a aplicação

```bash
npm run dev
```

> A API estará disponível em: `http://localhost:3000`

## 🧪 Exemplos de Rotas

| Recurso   | Método | Rota         | Descrição                       |
| --------- | ------ | ------------ | ------------------------------- |
| Livros    | GET    | `/livros`    | Lista todos os livros           |
| Livros    | POST   | `/livros`    | Cadastra um novo livro          |
| Autores   | GET    | `/autores`   | Lista todos os autores          |
| Autores   | POST   | `/autores`   | Cadastra um novo autor          |
| Favoritos | GET    | `/favoritos` | Lista os livros favoritos       |
| Favoritos | POST   | `/favoritos` | Adiciona um livro aos favoritos |

## 📄 Licença

Este projeto está sob a licença MIT.
