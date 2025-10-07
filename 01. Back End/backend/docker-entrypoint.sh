#!/bin/bash
set -e

# Aguardar o banco de dados estar disponível
echo "🔄 Aguardando banco de dados..."
while ! nc -z db 5432; do
  sleep 1
done
echo "✅ Banco de dados disponível!"

# Executar comando passado como parâmetro
echo "🚀 Iniciando aplicação..."
exec "$@"
