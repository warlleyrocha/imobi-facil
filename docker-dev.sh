#!/bin/bash

# Script para facilitar o desenvolvimento com Docker

case "$1" in
  "start")
    echo "🚀 Iniciando aplicação..."
    docker compose up --build
    ;;
  "stop")
    echo "🛑 Parando aplicação..."
    docker compose down
    ;;
  "logs")
    echo "📋 Mostrando logs..."
    docker compose logs -f app
    ;;
  "shell")
    echo "🐚 Abrindo shell no container..."
    docker compose exec app sh
    ;;
  "install")
    echo "📦 Instalando dependências..."
    docker compose exec app npm install
    ;;
  "lint")
    echo "🔍 Executando lint..."
    docker compose exec app npm run lint
    ;;
  "test")
    echo "🧪 Executando testes..."
    docker compose exec app npm test
    ;;
  *)
    echo "Uso: $0 {start|stop|logs|shell|install|lint|test}"
    echo ""
    echo "Comandos disponíveis:"
    echo "  start   - Iniciar a aplicação"
    echo "  stop    - Parar a aplicação"
    echo "  logs    - Ver logs"
    echo "  shell   - Abrir shell no container"
    echo "  install - Instalar dependências"
    echo "  lint    - Executar lint"
    echo "  test    - Executar testes"
    exit 1
    ;;
esac
