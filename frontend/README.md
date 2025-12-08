# Escola Admin - Frontend React

Painel administrativo para gerenciar Estudantes, Cursos e Matriculas de uma escola.

## Caracteristicas

- Interface dark mode moderna
- Sidebar com navegacao por abas
- Tabelas dinamicas com CRUD completo
- Formularios com validacoes
- Modais para criar/editar registros
- Integracao com API Django
- Busca e filtros
- Design responsivo

## Instalacao

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar API
Abra `src/services/api.js` e verifique se a URL da API esta correta:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

### 3. Iniciar servidor de desenvolvimento
```bash
npm run dev
```

O aplicativo estara disponivel em `http://localhost:5173`

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizaveis
│   ├── Sidebar.jsx
│   ├── DataTable.jsx
│   ├── Modal.jsx
│   ├── EstudanteForm.jsx
│   ├── CursoForm.jsx
│   ├── MatriculaForm.jsx
│   └── *.css
├── pages/              # Paginas principais
│   ├── EstudantesPage.jsx
│   ├── CursosPage.jsx
│   ├── MatriculasPage.jsx
│   └── Page.css
├── services/           # Servicos de API
│   └── api.js
├── utils/              # Utilitarios
│   └── validators.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Funcionalidades

### Estudantes
- Listar todos os estudantes
- Buscar por nome ou CPF
- Criar novo estudante
- Editar estudante
- Deletar estudante

### Cursos
- Listar todos os cursos
- Criar novo curso
- Editar curso
- Deletar curso

### Matriculas
- Listar todas as matriculas
- Criar nova matricula
- Editar matricula
- Deletar matricula

## Tecnologias

- React 19
- Vite
- Axios
- Lucide React
- CSS3
