# 📘 Guia de Uso - Ambiente Docker

## 🚀 Iniciando a Aplicação

Para iniciar sua aplicação com build:

```bash
docker compose up --build
```

A aplicação estará disponível em:

- 🌐 **Metro Bundler:** http://localhost:8081
- 📊 **Expo DevTools:** http://localhost:19002
- 📱 **Expo via LAN:** http://localhost:19000

---

## 🛠️ Construir a Imagem Manualmente

Crie a imagem localmente:

```bash
docker build -t myapp .
```

Se sua máquina for diferente da arquitetura do destino (ex: Mac M1 vs amd64):

```bash
docker build --platform=linux/amd64 -t myapp .
```

---

## ☁️ Publicando no Cloud

Envie sua imagem para o repositório:

```bash
docker push myregistry.com/myapp
```

> ℹ️ Consulte a [documentação oficial do Docker](https://docs.docker.com/go/get-started-sharing/) para mais detalhes sobre build e push de imagens.

---

## 🧪 Comandos Úteis para Desenvolvimento

### 🔍 Acessar e Executar no Container

- Acessar terminal do container:

  ```bash
  docker-compose exec expo-app /bin/bash
  ```

- Executar scripts:

  ```bash
  docker-compose exec expo-app npm run lint
  docker-compose exec expo-app npm run format
  ```

- Executar testes:

  ```bash
  docker-compose --profile test up test
  ```

- Reiniciar apenas o serviço principal:

  ```bash
  docker-compose restart expo-app
  ```

- Rebuild com mudanças no Dockerfile:
  ```bash
  docker-compose up --build
  ```

---

## 🧭 Monitoramento e Diagnóstico

- Ver status dos containers:

  ```bash
  docker-compose ps
  ```

- Acompanhar logs:

  ```bash
  docker-compose logs -f expo-app
  ```

- Verificar se a porta está aberta:
  ```bash
  docker-compose port expo-app 8081
  ```

---

## 🧹 Parar e Limpar o Ambiente

- Parar os containers:

  ```bash
  docker-compose down
  ```

- Parar e remover volumes:

  ```bash
  docker-compose down -v
  ```

- Limpar tudo (containers, volumes órfãos, redes):
  ```bash
  docker-compose down -v --remove-orphans
  ```

---

## 📚 Referências

- [Guia do Docker para Node.js](https://docs.docker.com/language/nodejs/)
- [Guia de publicação no Docker Hub](https://docs.docker.com/go/get-started-sharing/)
