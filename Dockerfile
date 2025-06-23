# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.14
FROM node:${NODE_VERSION}-slim

# Instalar dependências do sistema necessárias para Expo
RUN apt-get update && apt-get install -y \
    g++ \
    git \
    make \
    python3 \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=development
WORKDIR /usr/src/app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências com cache otimizado
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install

# Instalar Expo CLI globalmente
RUN npm install -g @expo/cli@latest

# Copiar o resto do código
COPY . .

# Ajustar permissões para o usuário node
RUN mkdir -p .expo && \
    chown -R node:node /usr/src/app

# Mudar para usuário não-root
USER node

# Expor portas necessárias
EXPOSE 8081 19000 19001 19002

# Comando padrão para desenvolvimento
CMD ["npx", "expo", "start", "--host", "lan"]