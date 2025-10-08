# Guia: Build de Desenvolvimento com Expo (Dev Client)

Este documento explica como configurar e rodar builds de desenvolvimento no Expo, utilizando o Expo Development Client.

## O que é uma Build de Desenvolvimento?

A build de desenvolvimento é uma versão do app que:

- Inclui suas dependências nativas (diferente do Expo Go)
- Pode ser usada para testar recursos que exigem módulos nativos personalizados
- Conecta-se ao Metro Bundler local (`expo start --dev-client`)
- É ideal para o ambiente de desenvolvimento e testes locais

## ⚙️ 1. Instalação e Pré-requisitos

Certifique-se de ter o ambiente configurado:

- Node.js LTS
- Expo CLI
- Android Studio ou Xcode (dependendo da plataforma)
- Conta Expo configurada (`npx expo login`)

## 🧩 2. Dev Client

O projeto já inclui o `expo-dev-client` como dependência.
Ao rodar `npm install`, o pacote será instalado automaticamente.

> Se por algum motivo precisar reinstalá-lo: `npx expo install expo-dev-client`

## 🏗️ 3. Gerar a Build de Desenvolvimento

Você pode gerar a build de duas formas:

### 🔹 Opção 1: Usando EAS Build (recomendado)

Se você usa o Expo Application Services (EAS):

```bash
npx eas build --profile development --platform android
# ou
npx eas build --profile development --platform ios
```

📦 Isso gera uma build hospedada na nuvem, que você pode baixar e instalar no seu dispositivo.

⚠️ **Antes da primeira build, rode:**

```bash
npx expo prebuild
```

Isso cria as pastas nativas (`android` e `ios`) com base na sua configuração.

### 🔹 Opção 2: Build local (sem EAS)

Para rodar diretamente no emulador ou dispositivo conectado:

```bash
npx expo run:android
# ou
npx expo run:ios
```

Esse comando compila o app localmente e instala a build de desenvolvimento no dispositivo.

## ▶️ 4. Rodando o App em Modo de Desenvolvimento

Depois que a build estiver instalada, inicie o bundler:

```bash
npx expo start --dev-client
```

- O Metro Bundler será iniciado
- Então, abra o app no seu dispositivo — ele detectará o bundler automaticamente (ou escaneie o QR Code mostrado no terminal)

## 🧠 5. Diferença entre Expo Go e Dev Client

| Característica                      | Expo Go   | Build de Desenvolvimento |
| ----------------------------------- | --------- | ------------------------ |
| Build nativa necessária             | ❌ Não    | ✅ Sim                   |
| Suporte a libs nativas customizadas | ❌ Não    | ✅ Sim                   |
| Tempo de setup                      | ⚡ Rápido | ⏳ Médio                 |
| Ambiente de produção equivalente    | ❌ Não    | ✅ Sim                   |

## 🔄 6. Atualizando a Build

Se você adicionar ou remover qualquer lib nativa, é necessário recriar a build de desenvolvimento:

```bash
npx expo prebuild
npx expo run:android
```

Ou, com EAS:

```bash
npx eas build --profile development --platform android
```

## 🧹 7. Dicas Úteis

- Use o comando abaixo para limpar builds antigas:

```bash
expo prebuild --clean
```

- Se o app não conectar ao bundler, verifique se o Metro está ativo na mesma rede do dispositivo

- Para builds de produção, use:

```bash
npx eas build --profile production
```

## ✅ Conclusão

A build de desenvolvimento permite trabalhar com qualquer módulo nativo, mantendo a agilidade do fluxo Expo. É o passo ideal entre o modo Expo Go e o ambiente de produção final.

**Em resumo:**

1. Instale o `expo-dev-client`
2. Gere a build (`run:android` ou `eas build`)
3. Rode com `npx expo start --dev-client`
