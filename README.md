# Rodar build para instalar no emulador

npx expo run:android

## Rodar dev client

npx expo start --dev-client

# SonarQube - Análise de Qualidade de Código

Este documento descreve a integração _local_ do SonarQube no projeto Imobi Fácil para análise contínua de qualidade de código.

## 📋 Sumário

- [O que é SonarQube](#o-que-é-sonarqube)
- [Pré-requisitos](#pré-requisitos)
- [Configuração Inicial](#configuração-inicial)
- [Executando Análise](#executando-análise)
- [Visualizando Resultados](#visualizando-resultados)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Configuração do Projeto](#configuração-do-projeto)

## O que é SonarQube

SonarQube é uma plataforma de código aberto para inspeção contínua da qualidade do código. Ele detecta:

- 🐛 **Bugs** - Erros que podem causar falhas
- 🔒 **Vulnerabilidades** - Problemas de segurança
- 💡 **Code Smells** - Padrões de código que podem dificultar manutenção
- 📊 **Cobertura de Testes** - Percentual de código testado
- 🔄 **Duplicação** - Código duplicado no projeto

## Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 18+ instalado
- Arquivo `.env` configurado com `SONAR_TOKEN`

## Configuração Inicial

### 1. Subir o SonarQube

Execute o Docker Compose para iniciar o SonarQube e PostgreSQL:

```bash
docker-compose up -d
```

Aguarde alguns minutos até o SonarQube inicializar completamente.

### 2. Acessar o SonarQube

Acesse http://localhost:9000

**Credenciais padrão:**

- Usuário: `admin`
- Senha: `admin`

Na primeira vez, será solicitado a alteração da senha.

### 3. Gerar Token de Autenticação

1. Faça login no SonarQube
2. Clique no seu avatar (canto superior direito)
3. Vá em **My Account > Security**
4. Em **Generate Tokens**:
   - Nome: `imobi-facil-local`
   - Type: `User Token`
   - Expires in: `No expiration`
5. Clique em **Generate** e copie o token

### 4. Configurar Variável de Ambiente

Adicione o token no arquivo `.env` na raiz do projeto:

```bash
SONAR_TOKEN=seu_token_aqui
```

**⚠️ Importante:** Nunca commite o arquivo `.env` no Git!

### 5. Instalar Dependências

Se ainda não instalou as dependências do SonarQube:

```bash
npm install
```

## Executando Análise

### Análise Simples (Atual)

Execute a análise de código sem cobertura de testes:

```bash
npm run sonar
```

Esta análise verifica:

✅ Qualidade do código (Code Smells)
✅ Bugs potenciais
✅ Vulnerabilidades de segurança
✅ Duplicação de código
✅ Complexidade ciclomática
❌ Cobertura de testes (não disponível sem testes)

### Análise com Cobertura

Execute os testes com cobertura e depois a análise:

```bash
npm run sonar:coverage
```

## Visualizando Resultados

Após a execução bem-sucedida, acesse:

```
http://localhost:9000/dashboard?id=imobi-facil
```

No dashboard você verá:

- **Overview** - Resumo geral da qualidade
- **Issues** - Lista de problemas encontrados
- **Security** - Vulnerabilidades e hotspots
- **Measures** - Métricas detalhadas
- **Code** - Navegação pelo código analisado

## Scripts Disponíveis

| Script                   | Comando                                  | Descrição                 |
| ------------------------ | ---------------------------------------- | ------------------------- |
| `npm run sonar`          | `dotenv -e .env -- sonar-scanner`        | Executa análise de código |
| `npm run test:coverage`  | `jest --coverage --watchAll=false`       | Gera cobertura de testes  |
| `npm run sonar:coverage` | `npm run test:coverage && npm run sonar` | Testes + Análise completa |

## Configuração do Projeto

### Arquivos de Configuração

#### `sonar-project.properties`

Arquivo principal de configuração do SonarQube:

```properties
sonar.projectKey=imobi-facil
sonar.projectName=Imobi Fácil
sonar.host.url=http://localhost:9000
sonar.token=${env.SONAR_TOKEN}
sonar.sources=app,components,contexts,hooks,lib,services,types,utils
```

#### `docker-compose.yml`

Define os serviços Docker necessários:

- **sonarqube** - Servidor SonarQube (porta 9000)
- **db** - PostgreSQL para persistência de dados

### Pastas Analisadas

O SonarQube analisa as seguintes pastas do projeto:

- `app/` - Rotas e páginas (Expo Router)
- `components/` - Componentes React
- `contexts/` - Contexts da aplicação
- `hooks/` - Custom hooks
- `lib/` - Bibliotecas e utilitários
- `services/` - Serviços e APIs
- `types/` - Definições de tipos TypeScript
- `utils/` - Funções utilitárias

### Exclusões

As seguintes pastas/arquivos são **excluídos** da análise:

- `node_modules/`
- `.expo/`, `.expo-shared/`
- `android/`, `ios/` (código nativo)
- `dist/`, `build/`, `coverage/`
- `*.config.js`, `*.config.ts`
- `**/*.d.ts` (arquivos de definição TypeScript)
- `**/assets/**`, `**/public/**`

## Gerenciamento do Docker

### Comandos Úteis

```bash
# Iniciar serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Ver logs apenas do SonarQube
docker-compose logs -f sonarqube

# Parar serviços
docker-compose down

# Parar e remover volumes (apaga dados)
docker-compose down -v

# Reiniciar serviços
docker-compose restart
```

## Boas Práticas

### Para Desenvolvedores

1. **Execute análise antes de commits importantes**

   ```bash
   npm run sonar:coverage
   ```

2. **Corrija problemas críticos** (Bugs e Vulnerabilidades) antes de fazer merge

3. **Revise Code Smells** regularmente para manter qualidade do código

4. **Mantenha cobertura de testes** acima de 80%

### Para o Time

1. **Defina Quality Gates** no SonarQube para bloquear código de baixa qualidade

2. **Integre com CI/CD** para análise automática em PRs

3. **Revise o dashboard semanalmente** em reuniões de equipe

4. **Documente exceções** quando ignorar warnings específicos

## Troubleshooting

### SonarQube não inicia

```bash
# Verifique logs
docker-compose logs sonarqube

# Verifique se a porta 9000 está disponível
netstat -an | grep 9000

# Reinicie os containers
docker-compose restart
```

### Erro de autenticação

Verifique se:

1. O token está correto no arquivo `.env`
2. O arquivo `.env` está na raiz do projeto
3. O token não expirou no SonarQube

### Análise muito lenta

1. Exclua mais arquivos em `sonar.exclusions`
2. Aumente recursos do Docker
3. Verifique se há muitos arquivos grandes sendo analisados

## Referências

- [Documentação Oficial SonarQube](https://docs.sonarqube.org/)
- [SonarQube para JavaScript/TypeScript](https://docs.sonarqube.org/latest/analyzing-source-code/languages/javascript/)
- [Quality Gates](https://docs.sonarqube.org/latest/user-guide/quality-gates/)
- [Expo + SonarQube Best Practices](https://docs.expo.dev/)

---

**Configurado por:** Time de Desenvolvimento  
**Data:** Outubro 2025  
**Versão do SonarQube:** 10.7 Community
