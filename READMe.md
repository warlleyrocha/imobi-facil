# 🏠 ImobiFácil

## 📋 Sobre o Projeto

O **ImobiFácil** é uma aplicação mobile desenvolvida com React Native e Expo, projetada especificamente para corretores de imóveis gerenciarem seus negócios de forma eficiente e profissional. A aplicação oferece uma interface intuitiva e funcionalidades completas para gestão de propriedades, clientes e relacionamento comercial.

## 🎯 Funcionalidades Principais

### 🔐 Autenticação e Perfil

- **Login com Google**: Autenticação OAuth integrada com backend
- **Cadastro de Corretor**: Formulário completo com validação de dados
- **Perfil Profissional**: Gestão de informações pessoais e profissionais
- **Verificação de Código**: Sistema de verificação por email
- **Persistência de Sessão**: Login automático com armazenamento local

### 🏘️ Gestão de Imóveis

- **Cadastro de Propriedades**: Formulário completo com:
  - Informações básicas (título, tipo, finalidade, preço, área)
  - Localização detalhada (CEP, endereço, bairro, cidade, estado)
  - Descrição personalizada
  - Upload de fotos
- **Listagem de Imóveis**: Visualização organizada de todas as propriedades
- **Edição de Propriedades**: Modificação de dados existentes
- **Organização em Pastas**: Criação de pastas personalizadas para atendimento (feature futura)

### 📊 Dashboard e Estatísticas

- **Resumo Semanal**: Métricas importantes como:
  - Visitas agendadas
  - Novos contatos
  - Documentos pendentes
- **Acesso Rápido**: Botões diretos para principais funcionalidades
- **Notificações**: Sistema de alertas e lembretes (feature futura)

### 👥 Gestão de Clientes (feature futura)

- **Cadastro de Clientes**: Formulário para novos clientes
- **Minhas Pastas**: Organização de clientes por pastas
- **Histórico de Atendimento**: Acompanhamento de interações

### 📅 Agenda e Compromissos (feature futura)

- **Agenda Inteligente**: Agendamento de visitas e compromissos
- **Controle de Rotina**: Organização completa da agenda profissional

### 💬 Comunicação (feature futura)

- **Chat Integrado**: Comunicação direta com clientes
- **Relacionamento Ativo**: Manutenção de contato contínuo

## 🛠️ Tecnologias Utilizadas

### Core Framework

- **React Native 0.81.4**: Framework principal para desenvolvimento mobile
- **Expo 54.0.13**: Plataforma de desenvolvimento e deploy
- **TypeScript 5.9.2**: Tipagem estática para maior segurança

### Navegação e Roteamento

- **Expo Router 6.0.12**: Sistema de roteamento baseado em arquivos
- **React Navigation 7.0.3**: Navegação entre telas

### Interface e Estilização

- **NativeWind 4.1.23**: Tailwind CSS para React Native
- **Tailwind CSS 3.4.0**: Framework de estilização utilitária
- **React Native SVG 15.12.1**: Suporte a ícones SVG
- **Expo Vector Icons 15.0.2**: Biblioteca de ícones
- **Expo Blur 15.0.7**: Efeitos visuais

### Formulários e Validação

- **React Hook Form 7.58.1**: Gerenciamento de formulários
- **Zod 3.25.67**: Validação de schemas
- **React Native Element Dropdown 2.12.4**: Componentes de seleção

### Autenticação e Armazenamento

- **Expo Auth Session 7.0.8**: Gerenciamento de sessões OAuth
- **Expo Web Browser 15.0.8**: Navegador in-app para autenticação
- **AsyncStorage 2.2.0**: Armazenamento local

### Mídia e Recursos

- **Expo Image Picker 17.0.8**: Seleção de imagens
- **Expo Location 19.0.7**: Serviços de localização
- **Expo Constants 18.0.9**: Constantes da aplicação
- **Expo Crypto 15.0.7**: Funções criptográficas

### Comunicação com Backend

- **Axios 1.11.0**: Cliente HTTP para comunicação com API
- **Expo Dev Client 6.0.15**: Cliente de desenvolvimento

### Desenvolvimento e Qualidade

- **ESLint 9.25.1**: Análise estática de código
- **Prettier 3.2.5**: Formatação de código
- **Jest 29.7.0**: Framework de testes
- **SonarQube**: Análise de qualidade de código

## 🔗 Integração com Backend

### Fluxo OAuth Integrado

O sistema de autenticação é totalmente integrado com o backend:

1. **Inicialização**: Frontend redireciona para endpoint do backend (`/auth/google`)
2. **Processamento**: Backend gerencia todo o fluxo OAuth com Google
3. **Callback**: Backend retorna usuário e token via deep link
4. **Armazenamento**: Frontend salva dados localmente via AsyncStorage

## 📱 Estrutura do Projeto

```
imobi-facil/
├── app/
│   ├── (auth)/                                 # Rotas autenticadas
│   │   ├── corretor/                           # Área do corretor
│   │   │   ├── (tabs)/                         # Navegação por abas
│   │   │   │   ├── imoveis/                    # Gestão de imóveis
│   │   │   │   ├── agenda.tsx
│   │   │   │   ├── chat.tsx
│   │   │   │   └── home.tsx                    # Tela inicial
│   │   │   ├── profile/                        # Perfil do corretor
│   │   │   └── signup/                         # Página de cadastro
│   │   ├── onboard.tsx                         # Tutorial inicial
│   │   └── select-profile.tsx                  # Seleção de perfil
│   ├── (public)/                               # Rotas públicas
│   │   └── sign-in.tsx                         # Tela de login
│   ├── _layout.tsx                             # Layout raiz
├── components/                                 # Componentes reutilizáveis
│   ├── Profile/                                # Componentes de perfil
│   ├── forms/                                  # Componentes de formulário
│   ├── layouts/                                # Layouts e seções
│   │   ├── Sections/
│   │   └── Header.tsx
│   └── ui/                                     # Componentes de interface
├── contexts/                                   # Contextos React
│   └── authContext.tsx                         # Contexto de autenticação
├── hooks/                                      # Custom hooks
│   ├── useGoogleAuth.ts                        # Hook de autenticação Google
│   └── usePropertyManagement.tsx               # Hook de gestão de imóveis
├── services/                                   # Serviços e APIs
│   ├── api.ts                                  # Configuração da API
│   └── googleAuth.service.ts                   # Serviço de autenticação
├── types/                                      # Definições TypeScript
└── utils/                                      # Funções utilitárias


```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- Expo CLI instalado globalmente
- Android Studio (para Android) ou Xcode (para iOS)
- Backend rodando na porta 3000

### Instalação

1. **Clone o repositório**

```bash
git clone <url-do-repositorio>
cd imobi-facil
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure o backend**

```bash
# Certifique-se de que o backend está rodando
# Backend deve estar configurado com Google OAuth
```

4. **Execute o projeto**

```bash
# Desenvolvimento
npm run dev

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia o servidor de desenvolvimento
npm run dev:client       # Inicia com dev client
npm start               # Inicia o Expo

# Build
npm run android         # Build para Android
npm run ios             # Build para iOS
npm run web             # Build para Web
npm run prebuild        # Prepara build nativo

# Qualidade de Código
npm run lint            # Executa ESLint
npm run format          # Formata código com Prettier
npm run test            # Executa testes
npm run test:coverage   # Testes com cobertura

# SonarQube
npm run sonar:scan      # Análise de qualidade
npm run sonar:coverage  # Análise com cobertura
```

## 🔐 Sistema de Autenticação

### Fluxo OAuth com Backend

1. **Inicialização**: Usuário clica em "Login com Google"
2. **Redirecionamento**: App redireciona para backend (`/auth/google`)
3. **Processamento**: Backend gerencia OAuth com Google
4. **Callback**: Backend retorna via deep link com dados do usuário
5. **Armazenamento**: Frontend salva dados localmente
6. **Navegação**: Usuário é direcionado para área autenticada

### Gerenciamento de Sessão

- **AsyncStorage**: Armazenamento persistente de dados do usuário
- **Restauração**: Login automático ao abrir o app
- **Logout**: Limpeza completa de dados locais

## 🏘️ Gestão de Imóveis

### Cadastro de Propriedades

- **Informações Básicas**: Título, tipo, finalidade (venda/aluguel), preço, área
- **Localização**: CEP, endereço completo, bairro, cidade, estado
- **Descrição**: Campo de texto livre para detalhes
- **Mídias**: Upload de fotos e vídeos
- **Validação**: Validação completa com Zod

### Armazenamento Local

- **AsyncStorage**: Dados temporários até sincronização com backend
- **Estrutura**: Array de objetos com ID único
- **Operações**: CRUD completo (Create, Read, Update, Delete)

## 📊 Dashboard do Corretor

### Métricas Principais

- **Visitas Agendadas**: Contador de visitas programadas
- **Novos Contatos**: Novos clientes em potencial
- **Documentos Pendentes**: Documentação em análise

### Acesso Rápido

- **Cadastrar Imóvel**: Acesso direto ao formulário
- **Meus Imóveis**: Lista de propriedades
- **Cadastrar Cliente**: Formulário de novo cliente
- **Minhas Pastas**: Organização por pastas

## 🎨 Design System

### Cores Principais

- **Primária**: Azul corporativo para elementos principais
- **Secundária**: Cinza para textos e elementos secundários
- **Sucesso**: Verde para ações positivas
- **Aviso**: Amarelo para alertas
- **Erro**: Vermelho para erros

### Tipografia

- **Inter**: Fonte principal para textos
- **Mulish**: Fonte para títulos e destaques
- **Tamanhos**: Sistema escalável de 12px a 32px

### Componentes

- **Botões**: Estilos consistentes para diferentes ações
- **Formulários**: Campos padronizados com validação
- **Cards**: Layouts para exibição de informações
- **Modais**: Popups para confirmações e formulários

## 📱 Compatibilidade

### Plataformas Suportadas

- **Android**: 6.0+ (API level 23+)

### Padrões de Código

- **TypeScript**: Tipagem estática obrigatória
- **ESLint**: Regras de linting configuradas
- **Prettier**: Formatação automática
- **Conventional Commits**: Padrão de commits
- **Análise com sonar**: Análise de código antes de fazer o merge

**ImobiFácil** - Um projeto feito através do programa Pipoca Ágil.
