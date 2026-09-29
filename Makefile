SHELL := /usr/bin/env bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := help

PORT ?= 3000
NPM  ?= npm
NEXT := npx next

.PHONY: help install ci env run dev build start lint typecheck check clean

help: ## Show available commands
	@grep -hE '^[a-z-]+:.*?## ' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	@$(NPM) install

ci: ## Install dependencies from the lockfile
	@$(NPM) ci

env: ## Create .env.local from .env.example when missing
	@if [[ -f .env.local ]]; then \
		echo ".env.local already exists"; \
	else \
		cp .env.example .env.local; \
		echo "Created .env.local from .env.example"; \
	fi

run: ## Start the development server (PORT=3000 by default)
	@$(NPM) run dev -- --webpack -p $(PORT)

dev: run ## Alias for make run

build: ## Create a production build
	@$(NEXT) build --webpack

start: ## Start the production build (run make build first)
	@$(NPM) run start -- -p $(PORT)

lint: ## Run ESLint
	@$(NPM) run lint

typecheck: ## Run TypeScript without emitting files
	@$(NEXT) typegen
	@npx tsc --noEmit

check: lint typecheck build ## Run all validation gates

clean: ## Remove generated Next.js output
	@rm -rf .next
