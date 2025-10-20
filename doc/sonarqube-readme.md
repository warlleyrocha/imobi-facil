# SonarQube - Análise de Qualidade de Código

Este documento descreve a integração do SonarQube no projeto Imobi Fácil para análise contínua de qualidade de código.

## 📋 Sumário

- [O que é SonarQube](#o-que-é-sonarqube)
- [Pré-requisitos](#pré-requisitos)
- [Configuração Inicial](#configuração-inicial)
- [Executando Análise](#executando-análise)
- [Visualizando Resultados](#visualizando-resultados)
- [Próximos Passos](#próximos-passos)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Entendendo os Conceitos](#entendendo-os-conceitos)
- [Configuração do Projeto](#configuração-do-projeto)

## O que é SonarQube

SonarQube é uma plataforma de código aberto para inspeção contínua da qualidade do código. Ele detecta:

- 🐛 **Bugs** - Erros que podem causar falhas
- 🔒 **Vulnerabilidades** - Problemas de segurança
- 💡 **Code Smells** - Padrões de código que podem dificultar manutenção
- 📊 **Cobertura de Testes** - Percentual de código testado (quando houver testes)
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

No momento, estamos usando **apenas análise simples**, pois ainda não temos testes implementados no projeto.

Execute a análise de código:

```bash
npm run sonar:scan
```

Esta análise verifica:

- ✅ Qualidade do código (Code Smells)
- ✅ Bugs potenciais
- ✅ Vulnerabilidades de segurança
- ✅ Duplicação de código
- ✅ Complexidade ciclomática
- ❌ Cobertura de testes (não disponível sem testes)

**Tempo estimado:** ~30 segundos

### Análise com Cobertura (Futuro)

Quando implementarmos testes, poderemos executar:

```bash
npm run sonar:coverage
```

Esta análise incluirá todas as verificações acima **mais** a cobertura de testes.

## Visualizando Resultados

Após a execução bem-sucedida, acesse:

```
http://localhost:9000/dashboard?id=imobi-facil
```

No dashboard você verá:

- **Overview** - Resumo geral da qualidade
- **Issues** - Lista de problemas encontrados (nosso foco atual!)
- **Security** - Vulnerabilidades e hotspots
- **Measures** - Métricas detalhadas
- **Code** - Navegação pelo código analisado

### Interpretando os Resultados

#### Bugs 🐛

Erros que podem causar falhas na aplicação. **Prioridade máxima!**

**Exemplos:**

- Variáveis usadas antes de serem inicializadas
- Divisão por zero
- Null pointer exceptions
- Condições que sempre retornam true/false

**Ação:** Corrigir **imediatamente** antes de fazer merge.

#### Vulnerabilidades 🔒

Problemas de segurança que podem ser explorados. **Prioridade máxima!**

**Exemplos:**

- SQL Injection
- Cross-Site Scripting (XSS)
- Uso de funções inseguras (eval, innerHTML)
- Hardcoded passwords/tokens

**Ação:** Corrigir **imediatamente** antes de fazer merge.

#### Code Smells 💡

Problemas de design que dificultam manutenção. **Prioridade média.**

**Exemplos:**

- Funções muito longas (>50 linhas)
- Complexidade alta (muitos if/else aninhados)
- Código duplicado
- Variáveis com nomes ruins (a, x, temp)
- Magic numbers (números sem contexto)

**Ação:** Corrigir gradualmente, priorizando os mais críticos.

## Próximos Passos

### Fase 1: Resolver Issues da Análise Simples (Atual) 🎯

**Objetivo:** Melhorar a qualidade do código existente antes de adicionar testes.

#### Passo 1: Priorizar Issues por Severidade

Acesse o dashboard e filtre as issues:

1. **Bugs (Prioridade CRÍTICA)**
   ```
   Issues > Type: Bug > Severity: Critical/High
   ```

   - Corrigir TODOS antes de qualquer outra coisa
   - Podem causar falhas na aplicação
2. **Vulnerabilidades (Prioridade CRÍTICA)**

   ```
   Issues > Type: Vulnerability > Severity: Critical/High
   ```

   - Corrigir TODOS imediatamente
   - Riscos de segurança

3. **Code Smells (Prioridade MÉDIA)**
   ```
   Issues > Type: Code Smell > Severity: Major
   ```

   - Focar nos "Major" primeiro
   - Resolver gradualmente

#### Passo 2: Estratégia de Correção

**Semana 1-2: Bugs e Vulnerabilidades**

```bash
# 1. Rode análise
npm run sonar

# 2. Acesse dashboard e liste todos os Bugs
# 3. Corrija um por um
# 4. Rode análise novamente para confirmar
npm run sonar

# 5. Commite as correções
git commit -m "fix: resolve critical bugs found by sonarqube"
```

**Semana 3-4: Code Smells Críticos (Major)**

```bash
# Foque em:
- Funções muito longas (quebrar em funções menores)
- Código duplicado (criar funções reutilizáveis)
- Complexidade alta (simplificar lógica)
- Magic numbers (criar constantes)
```

**Semana 5+: Code Smells Menores**

```bash
# Refatore gradualmente:
- Nomes de variáveis/funções
- Organização de código
- Comentários e documentação
```

#### Passo 3: Definir Meta Inicial

**Meta para os próximos 30 dias:**

```
✅ Bugs: 0 (zero tolerância)
✅ Vulnerabilidades: 0 (zero tolerância)
✅ Code Smells (Major): < 20
⏳ Code Smells (Minor): Melhorar gradualmente
⏳ Coverage: N/A (sem testes ainda)
```

#### Passo 4: Estabelecer Rotina

**Para cada nova feature/bugfix:**

```bash
# 1. Desenvolva normalmente
git checkout -b feature/minha-feature

# 2. Antes de abrir PR, rode análise
npm run sonar

# 3. Corrija TODOS os bugs e vulnerabilities novos
# 4. Tente não adicionar code smells "Major"

# 5. Abra PR só depois da análise passar
git push origin feature/minha-feature
```

---

### Fase 2: Implementar Testes (Próximo Passo) 🧪

**Quando:** Após resolver issues críticas da Fase 1 (Bugs e Vulnerabilities = 0)

#### Passo 1: Setup de Testes

**Dependências:**

```bash
npm install --save-dev @testing-library/react-native @testing-library/jest-native
```

**Configuração do Jest** (adicione no `package.json`):

```json
{
  "jest": {
    "preset": "jest-expo",
    "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"],
    "collectCoverageFrom": [
      "**/*.{ts,tsx}",
      "!**/*.d.ts",
      "!**/coverage/**",
      "!**/node_modules/**",
      "!**/.expo/**"
    ],
    "transformIgnorePatterns": [
      "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
    ]
  }
}
```

#### Passo 2: Estratégia de Implementação de Testes

**Ordem recomendada (do mais fácil ao mais complexo):**

**1. Funções Utilitárias (Semana 1)**

```typescript
// utils/formatters.test.ts
import { formatCurrency, formatCPF } from './formatters';

describe('formatCurrency', () => {
  it('should format number to BRL currency', () => {
    expect(formatCurrency(1000)).toBe('R$ 1.000,00');
    expect(formatCurrency(10.5)).toBe('R$ 10,50');
  });
});

describe('formatCPF', () => {
  it('should format CPF with mask', () => {
    expect(formatCPF('12345678900')).toBe('123.456.789-00');
  });
});
```

**Meta:** Coverage de `utils/` = 80%+

**2. Validações e Regras de Negócio (Semana 2-3)**

```typescript
// utils/validators.test.ts
import { validateEmail, validateCPF, validatePhone } from './validators';

describe('validateEmail', () => {
  it('should validate correct email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });

  it('should reject invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });
});
```

**Meta:** Coverage de `utils/validators.ts` = 100%

**3. Serviços e APIs (Semana 4-5)**

```typescript
// services/auth.test.ts
import { login, logout, validateToken } from './auth';

// Mock do Appwrite
jest.mock('appwrite', () => ({
  Client: jest.fn(),
  Account: jest.fn(),
}));

describe('Auth Service', () => {
  it('should login with valid credentials', async () => {
    const result = await login('user@email.com', 'password');
    expect(result.success).toBe(true);
  });
});
```

**Meta:** Coverage de `services/` = 70%+

**4. Hooks Customizados (Semana 6-7)**

```typescript
// hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react-native';
import { useAuth } from './useAuth';

describe('useAuth', () => {
  it('should return user when authenticated', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);

    act(() => {
      result.current.login('user@email.com', 'password');
    });

    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

**Meta:** Coverage de `hooks/` = 60%+

**5. Componentes (Semana 8+)**

```typescript
// components/Button.test.tsx
import { render, fireEvent } from '@testing-library/react-native'
import { Button } from './Button'

describe('Button Component', () => {
  it('should render with text', () => {
    const { getByText } = render(<Button>Click me</Button>)
    expect(getByText('Click me')).toBeTruthy()
  })

  it('should call onPress when pressed', () => {
    const mockFn = jest.fn()
    const { getByText } = render(
      <Button onPress={mockFn}>Click</Button>
    )

    fireEvent.press(getByText('Click'))
    expect(mockFn).toHaveBeenCalled()
  })
})
```

**Meta:** Coverage de `components/` = 50%+ (componentes visuais são mais complexos)

#### Passo 3: Metas de Cobertura Progressivas

```
Mês 1: Coverage geral ≥ 20% (utils e validators)
Mês 2: Coverage geral ≥ 40% (+ services)
Mês 3: Coverage geral ≥ 60% (+ hooks)
Mês 4: Coverage geral ≥ 70% (+ components críticos)
Mês 5+: Coverage geral ≥ 80% (objetivo final)
```

#### Passo 4: Integrar Análise com Cobertura

Após ter testes implementados:

```bash
# Execute análise completa
npm run sonar:coverage

# Agora o dashboard mostrará:
✅ Bugs: 0
✅ Vulnerabilities: 0
✅ Code Smells: < 20
✅ Coverage: 65% (e crescendo!)
```

---

### Fase 3: Quality Gates e CI/CD (Futuro) 🚀

**Quando:** Após atingir coverage ≥ 60%

1. **Configurar Quality Gate no SonarQube**
   - Bugs = 0
   - Vulnerabilities = 0
   - Coverage ≥ 60% (aumentar gradualmente para 80%)

2. **Integrar com GitHub Actions**
   - Análise automática em PRs
   - Bloquear merge se Quality Gate falhar

3. **Deploy em SonarCloud** (opcional)
   - Dashboard compartilhado com o time
   - Histórico de métricas

---

### Checklist de Progresso

#### Fase 1: Análise Simples ✅ (Atual)

- [x] SonarQube configurado e rodando
- [ ] Bugs = 0
- [ ] Vulnerabilities = 0
- [ ] Code Smells (Major) < 20
- [ ] Time familiarizado com o dashboard

#### Fase 2: Testes 🔄 (Próximo)

- [ ] Jest configurado
- [ ] Testes de utils (80%+ coverage)
- [ ] Testes de validators (100% coverage)
- [ ] Testes de services (70%+ coverage)
- [ ] Testes de hooks (60%+ coverage)
- [ ] Testes de components (50%+ coverage)
- [ ] Coverage geral ≥ 60%

#### Fase 3: Automação ⏳ (Futuro)

- [ ] Quality Gate configurado
- [ ] CI/CD com análise automática
- [ ] SonarCloud (opcional)
- [ ] Coverage geral ≥ 80%

| Script                   | Comando                                  | Descrição                 |
| ------------------------ | ---------------------------------------- | ------------------------- |
| `npm run sonar`          | `dotenv -e .env -- sonar-scanner`        | Executa análise de código |
| `npm run test:coverage`  | `jest --coverage --watchAll=false`       | Gera cobertura de testes  |
| `npm run sonar:coverage` | `npm run test:coverage && npm run sonar` | Testes + Análise completa |

## Entendendo os Conceitos

### Code Smells (Mau Cheiro de Código) 💡

**O que são?**

Code Smells são sinais de que algo pode estar errado no código. **Não são bugs** (o código funciona), mas indicam problemas de design que dificultam manutenção.

**Analogia:** É como um carro que funciona, mas faz barulho estranho e gasta muita gasolina. Tecnicamente funciona, mas precisa manutenção!

**Tipos comuns:**

#### 1. Funções Muito Longas

```typescript
// ❌ Ruim: Função com 100+ linhas
function processUser(user) {
  // valida
  // formata
  // calcula
  // envia email
  // salva no banco
  // loga
  // ... 100 linhas
}

// ✅ Bom: Funções pequenas e focadas
function processUser(user) {
  validateUser(user);
  const formatted = formatUser(user);
  const score = calculateScore(user);
  sendNotifications(user);
  saveUser(formatted, score);
}
```

#### 2. Código Duplicado

```typescript
// ❌ Ruim: Duplicação
function calcDiscountRegular(price) {
  const tax = price * 0.1;
  const discount = price * 0.05;
  return price + tax - discount;
}

function calcDiscountVIP(price) {
  const tax = price * 0.1;
  const discount = price * 0.15; // Única diferença!
  return price + tax - discount;
}

// ✅ Bom: Reutilização
function calcFinalPrice(price, discountRate) {
  const tax = price * 0.1;
  const discount = price * discountRate;
  return price + tax - discount;
}
```

#### 3. Magic Numbers

```typescript
// ❌ Ruim: Números "mágicos"
if (user.age < 18) {
  discount = price * 0.05;
}

// ✅ Bom: Constantes nomeadas
const ADULT_AGE = 18;
const MINOR_DISCOUNT = 0.05;

if (user.age < ADULT_AGE) {
  discount = price * MINOR_DISCOUNT;
}
```

#### 4. Complexidade Alta

```typescript
// ❌ Ruim: Muitos ifs aninhados
if (user.age < 18) {
  if (user.hasConsent) {
    if (user.verified) {
      return 'minor_verified';
    } else {
      return 'minor_unverified';
    }
  } else {
    return 'no_consent';
  }
}

// ✅ Bom: Extrair funções
function getUserStatus(user) {
  if (user.age < 18) {
    return getMinorStatus(user);
  }
  return getAdultStatus(user);
}
```

### Quality Gates (Portões de Qualidade) 🚪

**O que são?**

Critérios de qualidade que o código precisa atingir para ser aprovado. É como um "portão" que bloqueia código de má qualidade.

**Analogia:** Controle de qualidade numa fábrica - o produto só sai se passar em todos os testes!

**Exemplo de Quality Gate:**

```
Critérios para aprovar PR:
✅ Bugs = 0
✅ Vulnerabilities = 0
✅ Code Smells (Major) ≤ 10
✅ Coverage ≥ 60%
✅ Duplicação < 3%

Se QUALQUER critério falhar → PR BLOQUEADO ❌
```

**Cenário prático:**

```typescript
// Dev faz PR #123
SonarQube analisa:
✅ Bugs: 0 (passou)
❌ Vulnerabilities: 2 (FALHOU!)
✅ Code Smells: 5 (passou)
❌ Coverage: 45% (meta: 60%, FALHOU!)

Result: FAILED ❌
→ PR bloqueado até corrigir
```

### Bugs vs Code Smells vs Vulnerabilities

| Tipo                 | O que é              | Urgência | Exemplo                                                  |
| -------------------- | -------------------- | -------- | -------------------------------------------------------- |
| **Bug** 🐛           | Erro que causa falha | CRÍTICA  | `if (x = 5)` (atribuição ao invés de comparação)         |
| **Vulnerability** 🔒 | Risco de segurança   | CRÍTICA  | `eval(userInput)` (permite execução de código malicioso) |
| **Code Smell** 💡    | Problema de design   | MÉDIA    | Função com 200 linhas, difícil de entender               |

**Prioridade de correção:**

1. 🔒 Vulnerabilities (AGORA!)
2. 🐛 Bugs (AGORA!)
3. 💡 Code Smells (Gradualmente)

---

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

### Recursos do Sistema

O SonarQube requer recursos significativos:

- **RAM**: Mínimo 2GB, recomendado 4GB
- **Disco**: ~2GB para instalação + dados dos projetos
- **CPU**: 2+ cores recomendados

--- de commits importantes\*\*

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
