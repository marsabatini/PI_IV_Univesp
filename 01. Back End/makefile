.PHONY: help build up down logs shell db-init db-reset db-status sample-data routes

help: ## Mostrar ajuda
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

build: ## Construir containers
	docker compose build

up: ## Subir containers
	docker compose up

down: ## Parar containers
	docker compose down

logs: ## Ver logs
	docker compose logs -f

shell: ## Acessar shell do container backend
	docker compose exec backend bash

db-init: ## Inicializar banco de dados
	docker compose exec backend python manage.py init-db

db-reset: ## Resetar banco de dados
	docker compose exec backend python manage.py reset-db

db-status: ## Ver status do banco
	docker compose exec backend python manage.py db-status

sample-data: ## Criar dados de exemplo
	docker compose exec backend python manage.py create-sample-data

routes: ## Mostrar rotas da API
	docker compose exec backend python manage.py show-routes
