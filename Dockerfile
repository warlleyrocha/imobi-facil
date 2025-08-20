# Usar uma imagem mais leve do Node.js com versão atualizada
FROM node:18-alpine3.19

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos de dependências primeiro
COPY package*.json ./

# Atualizar sistema e instalar dependências
RUN apk update && apk upgrade && \
    npm ci && npm cache clean --force

# Copiar o código da aplicação
COPY . .

# Expor apenas a porta principal do Metro
EXPOSE 8081

# Comando para iniciar a aplicação
CMD ["npm", "start"]