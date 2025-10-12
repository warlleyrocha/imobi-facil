# Dockerfile.sonar
# Usar Node.js leve e atualizado
FROM node:20-bookworm-slim

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas arquivos de dependências primeiro
COPY package*.json ./

# Atualizar sistema e instalar dependências
RUN npm ci && npm cache clean --force


# Copiar o restante do código
COPY . .

# Variáveis de ambiente padrão (podem ser sobrescritas no docker-compose)
ENV SONAR_HOST_URL=http://sonarqube:9000
ENV SONAR_LOGIN=

# Comando padrão para rodar o SonarQube Scanner
CMD ["npx", "sonar-scanner"]
