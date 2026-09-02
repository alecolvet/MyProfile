# 📱 MyProfile

Aplicativo mobile desenvolvido em **React Native + TypeScript utilizando Expo**, no qual o usuário pode realizar cadastro, autenticação, visualizar e editar seu próprio perfil e alternar entre os temas **Light e Dark**.

Todos os dados da aplicação são armazenados localmente utilizando **AsyncStorage**, incluindo cadastro, sessão, informações do perfil e preferência de tema. O projeto não utiliza backend.

> **CheckPoint 1 — Mobile Development & IoT**

---

## 👥 Integrantes

| RM | Nome completo |
|---|---|
| RM560059 | Alexandre Delfino |
| RM559557 | Enzo Luciano |
| RM560755 | Luigi Thiengo |
| RM561023 | Pedro Claudino |
| RM559023 | Witalon Rodrigues |

---

## 🧰 Tecnologias utilizadas

- **React Native** `0.86.3`
- **Expo SDK 57** (`expo ~57.0.18`)
- **TypeScript** `~6.0.3` com modo `strict`
- **React Navigation 7**
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
- **AsyncStorage** `2.2.0`
  - `@react-native-async-storage/async-storage`
- `react-native-screens`
- `react-native-safe-area-context`
- `expo-status-bar`

---

## ▶️ Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/alecolvet/MyProfile.git
```

### 2. Entrar na pasta do projeto

```bash
cd MyProfile
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Iniciar o Expo

```bash
npx expo start
```

Caso seja necessário limpar o cache do Expo:

```bash
npx expo start -c
```

Depois de iniciar o projeto, utilize o **Expo Go** no celular para ler o QR Code.

Também é possível executar utilizando:

### Android

```bash
npx expo start --android
```

### iOS

```bash
npx expo start --ios
```

### Web

```bash
npx expo start --web
```

---

## ✨ Funcionalidades implementadas

### 👤 Cadastro de usuário

A aplicação possui uma tela de cadastro contendo:

- Nome
- Nome de usuário
- E-mail
- Senha
- Confirmação de senha

O formulário possui validações para impedir cadastros inválidos.

São realizadas validações de:

- Campos obrigatórios
- Formato válido de e-mail
- Tamanho mínimo da senha
- Confirmação de senha
- Senha e confirmação iguais
- Nome de usuário já cadastrado
- E-mail já cadastrado

As mensagens de erro são apresentadas ao usuário diretamente na interface.

Após um cadastro válido, os dados são armazenados localmente utilizando **AsyncStorage**.

---

### 🔐 Login

A tela de login permite autenticação utilizando os dados cadastrados localmente.

O login possui:

- Campo de nome de usuário
- Campo de senha
- Validação de campos obrigatórios
- Mensagens de erro
- Loading durante a autenticação
- Opção para acessar a tela de cadastro

Caso os dados informados estejam incorretos, a aplicação apresenta:

```text
Nome de usuário ou senha incorretos.
```

Após uma autenticação válida, uma sessão é criada e armazenada no AsyncStorage.

---

### 💾 Persistência da sessão

A sessão do usuário é armazenada localmente.

Quando a aplicação é iniciada novamente, o sistema verifica se existe uma sessão válida.

Caso exista:

```text
Abrir aplicativo
      ↓
Verificar AsyncStorage
      ↓
Sessão encontrada
      ↓
Tela de Perfil
```

Caso não exista sessão ativa, o usuário é direcionado para a tela de Login.

---

## 🏠 Perfil

Após realizar a autenticação, o usuário pode visualizar seu perfil.

São exibidas as seguintes informações:

- Nome
- Nome de usuário
- E-mail
- Telefone
- Cidade
- Biografia
- Tema atual

A tela também possui:

- Botão para editar o perfil
- Controle de tema
- Botão de logout

---

## ✏️ Edição do perfil

O usuário pode alterar seus próprios dados através de um formulário.

É possível editar:

- Nome
- E-mail
- Telefone
- Cidade
- Biografia

O formulário possui validação para:

- Nome obrigatório
- E-mail obrigatório
- Formato válido de e-mail
- E-mail já utilizado por outro usuário

Após salvar as alterações, os dados atualizados são persistidos utilizando **AsyncStorage**.

Dessa forma, as informações permanecem disponíveis mesmo após fechar e abrir novamente a aplicação.

---

## 🎨 Temas Light e Dark

A aplicação possui dois temas:

- ☀️ **Light**
- 🌙 **Dark**

A troca de tema altera de maneira consistente elementos da interface, incluindo:

- Background
- Textos
- Inputs
- Bordas
- Botões
- Cards
- Headers
- Mensagens

A preferência do usuário também é armazenada no AsyncStorage.

Portanto, ao fechar e abrir novamente a aplicação, o último tema selecionado continua ativo.

---

## 🚪 Logout

O usuário pode encerrar sua sessão através do botão de logout.

O logout remove **somente a sessão ativa**.

Os dados cadastrados do usuário continuam armazenados no dispositivo.

Dessa forma, depois do logout, o usuário pode realizar login novamente utilizando seu nome de usuário e senha.

---

## ⏳ Loading

A aplicação apresenta feedback visual durante operações que podem exigir processamento.

O loading é utilizado em situações como:

- Recuperação inicial da sessão
- Recuperação inicial do tema
- Cadastro
- Login
- Salvamento das alterações do perfil

---

## ⚠️ Tratamento de erros

A aplicação possui tratamento de erros nas principais operações.

Entre elas:

- Cadastro de usuário
- Login
- Recuperação da sessão
- Recuperação do usuário
- Salvamento do usuário
- Recuperação do tema
- Salvamento do tema
- Logout

As mensagens são apresentadas de forma compreensível para o usuário quando necessário.

---

## 💾 AsyncStorage

O projeto utiliza AsyncStorage para persistência local dos dados.

As principais chaves utilizadas são:

```ts
export const STORAGE_KEYS = {
  USERS: '@myprofile:users',
  SESSION: '@myprofile:session',
  THEME: '@myprofile:theme',
} as const;
```

### `@myprofile:users`

Armazena os usuários cadastrados e suas informações de perfil.

### `@myprofile:session`

Armazena a sessão do usuário atualmente autenticado.

### `@myprofile:theme`

Armazena a preferência de tema:

```text
light
```

ou

```text
dark
```

---

## ⚛️ React Hooks

O projeto utiliza os principais hooks do React para gerenciamento de estado e ciclo de vida.

Entre eles:

- `useState`
- `useEffect`
- `useContext`
- `useMemo`
- `useCallback`

O `useState` é utilizado principalmente no gerenciamento dos formulários e estados da aplicação.

O `useEffect` é utilizado, entre outras situações, na recuperação da sessão e do tema armazenados.

---

## ♻️ Imutabilidade

As alterações de dados e estados respeitam o conceito de imutabilidade.

Por exemplo, atualizações de usuários são realizadas criando novos objetos e arrays, sem modificar diretamente o estado anterior.

---

## 🧩 Componentização

O projeto foi organizado utilizando componentes reutilizáveis, separação de responsabilidades e tipagem TypeScript.

Estrutura principal:

```text
MyProfile/
│
├── App.tsx
│
├── app.json
│
├── index.ts
│
├── package.json
│
├── tsconfig.json
│
└── src/
    │
    ├── components/
    │   ├── CustomButton.tsx
    │   ├── CustomInput.tsx
    │   ├── Loading.tsx
    │   ├── ProfileCard.tsx
    │   └── ThemeSwitch.tsx
    │
    ├── constants/
    │   └── storage.ts
    │
    ├── hooks/
    │   ├── useAuth.ts
    │   └── useTheme.ts
    │
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   └── types.ts
    │
    ├── screens/
    │   ├── LoginScreen.tsx
    │   ├── RegisterScreen.tsx
    │   ├── ProfileScreen.tsx
    │   └── EditProfileScreen.tsx
    │
    ├── services/
    │   ├── authService.ts
    │   └── storageService.ts
    │
    ├── themes/
    │   ├── dark.ts
    │   └── light.ts
    │
    └── types/
        ├── auth.ts
        ├── theme.ts
        └── user.ts
```

---

## 🔷 TypeScript

O projeto utiliza TypeScript com modo `strict`.

Foram tipados:

- Usuários
- Sessão
- Tema
- Formulários
- Estados
- Props
- Funções
- Navegação

A compilação TypeScript pode ser verificada utilizando:

```bash
npx tsc --noEmit
```

---

## ✅ Checklist

- [x] React Native
- [x] Expo SDK 54 ou superior
- [x] TypeScript
- [x] Tela de cadastro
- [x] Nome
- [x] Nome de usuário
- [x] E-mail
- [x] Senha
- [x] Confirmação de senha
- [x] Validação do cadastro
- [x] Cadastro salvo no AsyncStorage
- [x] Tela de Login
- [x] Opção "Já tem cadastro"
- [x] Opção para cadastrar
- [x] Login usando dados cadastrados
- [x] Validação do login
- [x] Mensagem para dados incorretos
- [x] Sessão persistida
- [x] Tela de perfil
- [x] Formulário de edição
- [x] Dados do perfil persistidos
- [x] Tema Light
- [x] Tema Dark
- [x] Alternância de tema
- [x] Tema persistido
- [x] Logout
- [x] Logout remove somente a sessão
- [x] Loading
- [x] Tratamento de erros
- [x] `useState`
- [x] `useEffect`
- [x] Imutabilidade
- [x] Componentização
- [x] README.md
- [x] NOME e RM dos integrantes
- [x] Repositório disponível no GitHub

---

## 🖼️ Prints da aplicação

> **PENDENTE:** adicionar os prints finais da aplicação nesta seção antes da entrega.

Sugestão de prints:

| Login | Cadastro | Perfil Light | Perfil Dark |
|---|---|---|---|
| Adicionar print | Adicionar print | Adicionar print | Adicionar print |

Também é recomendado adicionar um print da tela de **edição do perfil**.

---

## 🔗 Repositório

Repositório oficial do projeto:

https://github.com/alecolvet/MyProfile

---

## 🎓 Projeto acadêmico

Projeto desenvolvido para o **CheckPoint 1 — Mobile Development & IoT**, utilizando React Native, Expo, TypeScript e persistência local com AsyncStorage.