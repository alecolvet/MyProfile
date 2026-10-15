# TaskFlow App — Checkpoint 2

Aplicativo mobile para gerenciamento de tarefas pessoais desenvolvido em **React Native**, **Expo** e **TypeScript**, integrando navegação híbrida (**Bottom Tabs + Stack**), gerenciamento de estado global com **Context API**, persistência local com **AsyncStorage**, consumo de **API pública** e suporte a **temas Light e Dark**.

O projeto evolui a base desenvolvida anteriormente, aplicando conceitos avançados de tipagem estrita (sem `any`), componentização, acessibilidade e isolamento de dados por usuário.

---

## Integrantes

| RM | Nome completo |
|---|---|
| RM560059 | Alexandre Delfino |
| RM559557 | Enzo Luciano |
| RM560755 | Luigi Thiengo |
| RM561023 | Pedro Claudino |
| RM559023 | Witalon Rodrigues |

---

## Vídeo de Demonstração

- **Link do vídeo:** https://drive.google.com/file/d/1TlMyFnjngc3e9lT2lVVrwzIYOVDyiFXw/view?usp=sharing
- **Duração:** 3 a 7 minutos
- **Conteúdo demonstrado no vídeo:** Fluxo de autenticação (`admin` e `user`), navegação entre Tabs e Stack, consumo da API pública com recarregamento, CRUD completo de tarefas, isolamento por usuário, persistência de dados no AsyncStorage e alternância de temas/tratamento.

---

## Objetivo do Aplicativo

Permitir que o usuário autenticado gerencie sua rotina e tarefas pessoais de maneira organizada, segura e dinâmica:
- Autenticação com controle de perfil (`admin` e `user`);
- Persistência contínua de sessão e preferências locais;
- Criação, leitura, edição rápida de status, alteração e exclusão de tarefas (CRUD completo);
- Isolamento estrito de dados (cada usuário acessa somente suas próprias tarefas);
- Filtragem ágil por status com lista vazia tratada;
- Frases motivacionais diárias consumidas via API pública;
- Alternância entre tema claro e escuro e personalização de tratamento (`Sr.`, `Sra.`, `Srta.`).

---

## Credenciais de Teste

A aplicação utiliza autenticação didática com usuários fixos e permissões específicas:

| Usuário | Senha | Perfil | Destino pós-login |
|---|---|---|---|
| `admin` | `123` | Administrador | Abre direto na aba **Configurações** |
| `user` | `123` | Usuário Comum | Abre direto na aba **Home** |

> Credenciais inválidas exibem alertas claros de erro na tela.

---

## API Consumida

- **Endpoint:** `https://dummyjson.com/quotes/random`
- **Objetivo:** Exibir citações motivacionais dinâmicas na tela inicial (**Home**).
- **Recursos implementados:**
  - Tipagem rigorosa da resposta da API em TypeScript;
  - Indicador de carregamento (`ActivityIndicator`);
  - Tratamento de exceções com `try/catch`;
  - Mensagem amigável de erro e botão **Tentar novamente**;
  - Botão interativo para buscar nova frase em tempo real.

---

## Tecnologias Utilizadas

- **React Native** `0.86.3`
- **Expo SDK 57**
- **TypeScript** em modo estrito (`strict` — 0 ocorrências de `any`)
- **React Navigation 7**:
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`
- **AsyncStorage** (`@react-native-async-storage/async-storage`)
- **Expo Vector Icons** (`@expo/vector-icons` - Ionicons)
- **Context API** (`AuthContext`, `TaskContext`, `ThemeContext`)

---

## Funcionalidades Implementadas

### 1. Autenticação e Navegação Dinâmica
- Login com validação de campos vazios e credenciais inválidas.
- Sessão persistida no AsyncStorage (o usuário não precisa relogar ao reabrir o app).
- Roteamento inicial baseado no papel: `admin` inicia na aba **Configurações** e `user` inicia na aba **Home**.
- Logout com diálogo de confirmação via `Alert` nativo (com fallback para `window.confirm` na Web).
- Cabeçalho global (`Header`) persistente nas telas principais exibindo nome, perfil, tratamento e botão de saída rápida.

### 2. CRUD Completo de Tarefas
- **Create:** Cadastro com validação estrita (título >= 3 caracteres sem espaços vazios, descrição >= 5 caracteres, seleção de categoria com ícone e prioridade).
- **Read:** Listagem com `FlatList` exibindo título, status, categoria com imagem, prioridade, data de criação e data de atualização.
- **Update:** Edição completa de informações e atalhos de alteração rápida de status (*Pendente*, *Em Andamento*, *Concluída*).
- **Delete:** Exclusão com confirmação prévia em alerta nativo.
- **Isolamento de Dados:** Cada tarefa armazena o `userId`; usuários diferentes nunca visualizam ou editam tarefas de outros usuários.

### 3. Filtros e Estado Vazio
- Filtros interativos na listagem: *Todas*, *Pendentes*, *Em Andamento* e *Concluídas*.
- Componente amigável de estado vazio quando não há tarefas correspondentes ao filtro ativo.

### 4. Temas e Preferências
- Alternância fluida entre tema Claro (**Light**) e Escuro (**Dark**).
- Centralização de paleta de cores via `ThemeContext`.
- Preferência de tratamento de perfil (`Sr.`, `Sra.` ou `Srta.`) refletida no cabeçalho em tempo real.
- Persistência das preferências no AsyncStorage.

### 5. Acessibilidade
- Elementos interativos equipados com `accessibilityRole="button"`, `accessibilityLabel` e `accessibilityHint`.
- Cores de alto contraste e legibilidade nos modos claro e escuro.

---

## Persistência Local (AsyncStorage)

| Chave | Função |
|---|---|
| `@taskflow:session` | Armazena os dados do usuário autenticado |
| `@taskflow:tasks` | Armazena o array completo de tarefas cadastradas |
| `@taskflow:theme` | Salva a preferência de tema (`true` para escuro, `false` para claro) |
| `@taskflow:treatment_{id}` | Salva o pronome de tratamento escolhido por cada usuário |

---

## Estrutura Principal do Projeto

```text
src/
├── components/
│   ├── CustomButton.tsx
│   ├── CustomInput.tsx
│   ├── Header.tsx              # Cabeçalho global (Perfil, Nome e Logout)
│   ├── StatusBadge.tsx         # Badges visuais de status e prioridade
│   └── TaskCard.tsx            # Card com os 7 metadados da tarefa
├── context/
│   ├── AuthContext.tsx         # Contexto de autenticação e sessão
│   ├── TaskContext.tsx         # Contexto de CRUD e persistência de tarefas
│   └── ThemeContext.tsx        # Contexto de tema claro e escuro
├── hooks/
│   ├── useAuth.ts
│   ├── useTasks.ts
│   └── useTheme.ts
├── routes/
│   ├── AppRoutes.tsx           # Alterna entre tela de Login e Abas Principais
│   ├── TabRoutes.tsx           # Bottom Tabs (Home, Tarefas, Configurações)
│   └── TaskStackRoutes.tsx     # Pilha Stack (Lista, Cadastro/Edição, Detalhes)
├── screens/
│   ├── auth/
│   │   └── LoginScreen.tsx
│   ├── home/
│   │   └── HomeScreen.tsx      # Resumo e consumo de API pública
│   ├── settings/
│   │   └── SettingsScreen.tsx  # Tema, tratamento e dados do perfil
│   └── tasks/
│       ├── TaskDetailScreen.tsx
│       ├── TaskFormScreen.tsx
│       └── TaskListScreen.tsx
├── services/
│   ├── api.ts                  # Requisição HTTP à DummyJSON
│   └── storage.ts              # Métodos de leitura/escrita no AsyncStorage
├── types/
│   ├── navigation.ts           # Tipagem das rotas Tabs e Stack
│   ├── task.ts                 # Interfaces Task, Status e Prioridade
│   └── user.ts                 # Interfaces de Usuário e Tratamento
└── utils/
    ├── formatDate.ts
    ├── generateId.ts
    └── validation.ts
App.tsx