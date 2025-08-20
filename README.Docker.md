# 📘 Guia de Uso - Ambiente Docker

## 🚀 Como usar

### Iniciar a aplicação

```bash
docker compose up --build
```

### Parar a aplicação

```bash
docker compose down
```

### Ver logs

```bash
docker compose logs -f app
```

## 📱 Acesso

A aplicação estará disponível em:

- **Metro Bundler:** http://localhost:8081

## 🔧 Comandos úteis

### Usando o script facilitador

```bash
# Iniciar aplicação
./docker-dev.sh start

# Parar aplicação
./docker-dev.sh stop

# Ver logs
./docker-dev.sh logs

# Abrir shell no container
./docker-dev.sh shell

# Instalar dependências
./docker-dev.sh install

# Executar lint
./docker-dev.sh lint

# Executar testes
./docker-dev.sh test
```

### Comandos diretos do Docker Compose

```bash
# Instalar novas dependências
docker compose exec app npm install

# Executar lint
docker compose exec app npm run lint

# Executar testes
docker compose exec app npm test

# Rebuild da imagem
docker compose up --build --force-recreate
```

## ✨ Melhorias implementadas

- ✅ Imagem base mais leve (Alpine Linux)
- ✅ Menos portas expostas (apenas 8081)
- ✅ Configuração simplificada
- ✅ Build mais rápido
- ✅ Menor uso de memória
- ✅ Arquivo .dockerignore otimizado
