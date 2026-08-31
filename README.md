# 📱 MyProfile

Aplicativo mobile em **React Native + TypeScript (Expo)** onde o usuário se cadastra,
faz login, visualiza e edita o próprio perfil e alterna entre os temas **Light** e **Dark**.
Todos os dados (cadastro, sessão e tema) são armazenados **localmente** com **AsyncStorage** —
não há backend.

> CheckPoint 1 — Mobile Development & IoT

---

## 👥 Integrantes

| RM | Nome completo |
|---|---|
| RM000000 | PREENCHER — Nome Completo |
| RM000000 | PREENCHER — Nome Completo |
| RM000000 | PREENCHER — Nome Completo |
| RM000000 | PREENCHER — Nome Completo |

> ⚠️ **PENDENTE:** substituir as linhas acima pelo NOME COMPLETO e RM reais dos 4 integrantes.
> Sem isso o trabalho recebe nota ZERO.

---

## 🧰 Tecnologias

- React Native `0.86.3`
- **Expo SDK 57** (`expo ~57.0.18`)
- TypeScript `~6.0.3` (modo `strict`)
- React Navigation 7 (`@react-navigation/native` + `native-stack`)
- `@react-native-async-storage/async-storage` `2.2.0`
- `react-native-screens` / `react-native-safe-area-context`

---

## ▶️ Como executar

Pré-requisitos: Node.js 20.19+ (ou 22.13+ / 24.3+) e o app **Expo Go** no celular.

```bash
npm install
npx expo start
```

Depois, leia o QR Code com o Expo Go (Android/iOS) ou use:

```bash
npx expo start --android
```

```bash
npx expo start --ios
```

```bash
npx expo start --web
```

---

## ✨ Funcionalidades

- [x] Cadastro de usuário (nome, usuário, e-mail, senha e confirmação) com validação
- [x] Login com os dados salvos localmente, com mensagem de erro e loading
- [x] Sessão persistida — ao reabrir o app, o usuário continua logado
- [x] Tela de perfil exibindo nome, usuário, e-mail, telefone, cidade, biografia e tema atual
- [x] Formulário de edição do perfil com validação de nome e e-mail
- [x] Dados do perfil persistidos no AsyncStorage
- [x] Temas Light e Dark aplicados em background, textos, inputs, botões, cards e headers
- [x] Preferência de tema persistida
- [x] Logout removendo apenas a sessão (o cadastro continua salvo)
- [x] Loading e tratamento de erros nas operações de armazenamento

---

## 🗂️ Estrutura do projeto

```text
App.tsx                     Providers (tema + autenticação) e StatusBar
src/
  components/               Componentes reutilizáveis (Input, Button, Card, ThemeSwitch, Loading)
  constants/storage.ts      Chaves do AsyncStorage
  hooks/
    useAuth.ts              Contexto de autenticação (cadastro, login, sessão, logout)
    useTheme.ts             Contexto de tema (troca + persistência)
  navigation/
    RootNavigator.tsx       Stack: Login/Register quando deslogado, Profile/EditProfile quando logado
    types.ts                Tipagem das rotas
  screens/                  LoginScreen, RegisterScreen, ProfileScreen, EditProfileScreen
  services/
    authService.ts          Regras de cadastro/autenticação sobre o storage
    storageService.ts       Camada tipada de acesso ao AsyncStorage
  themes/                   light.ts e dark.ts
  types/                    user.ts, auth.ts, theme.ts
```

### Chaves do AsyncStorage

```ts
export const STORAGE_KEYS = {
  USERS: '@myprofile:users',
  SESSION: '@myprofile:session',
  THEME: '@myprofile:theme',
} as const;
```

`USERS` guarda uma lista de usuários cadastrados (permite mais de um cadastro no
mesmo dispositivo), `SESSION` guarda o id do usuário autenticado e `THEME` guarda
`'light'` ou `'dark'`.

---

## 🖼️ Prints da aplicação

> PENDENTE: adicionar os prints em `assets/screenshots/` e referenciar aqui.

| Login | Cadastro | Perfil (Light) | Perfil (Dark) |
|---|---|---|---|
| _print_ | _print_ | _print_ | _print_ |

---

## 🔗 Repositório

https://github.com/alecolvet/MyProfile
