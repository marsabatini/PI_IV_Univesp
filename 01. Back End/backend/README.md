API REST para gerenciamento de dispositivos IoT em sistemas de agricultura inteligente.

## 🚀 Funcionalidades

- **Eventos IoT**: Recebimento e armazenamento de dados dos sensores
- **Comandos**: Envio de comandos para atuadores e dispositivos
- **Heartbeat**: Monitoramento do status dos dispositivos
- **Documentação automática**: Interface Swagger/OpenAPI

## 🏗️ Arquitetura

A API foi projetada para ser escalável e modular:

```
backend/
├── app/                   # Aplicação principal
│   ├── models/            # Modelos SQLAlchemy
│   ├── resources/         # Endpoints da API
│   ├── schemas/           # Validação com Marshmallow
│   ├── config.py          # Configurações
│   └── extensions.py      # Extensões Flask
└── Dockerfile
docker-compose.yml         # Configuração Docker
```

## 🛠️ Instalação e Execução

### Docker

1. **Clone o repositório**
```bash
git clone <repository>
cd horta-iot-api
```

2. **Configure as variáveis de ambiente**
```bash
# Crie e edite o arquivo .env conforme necessário

# Configurações do Flask
FLASK_ENV='development'
SECRET_KEY='secret-key'
JWT_SECRET_KEY='jwt-secret-key'

# Configurações do banco de dados
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

3. **Execute com Docker**
```bash
# Construir e iniciar
make up

# Ou manualmente
docker compose up
```

4. **Inicialize o banco de dados**
```bash
# Para esses comandos funcionarem é preciso rodar o comadno anterior em outro terminal.
# inicializa o banco
make db-init

# cria dados de exemplo
make sample-data
```

## 📚 Uso da API

### Endpoints Principais
**Auth**
- `POST /api/v1/auth/register` - Registrar novo usuário
- `GET /api/v1/auth/login` - Login do usuário
- `GET /api/v1/auth/profile` - Obter perfil do usuário logado

**Eventos IoT**
- `POST /api/v1/events` - Criar evento
- `GET /api/v1/events` - Listar eventos
- `GET /api/v1/events/{id}` - Obter evento específico
- `GET /api/v1/events/device/{device_id}/latest` - Último evento do dispositivo

**Comandos IoT**
- `POST /api/v1/commands` - Criar comando
- `GET /api/v1/commands` - Listar comandos
- `PUT /api/v1/commands/{id}` - Atualizar status
- `GET /api/v1/commands/device/{device_id}/pending` - Comandos pendentes

**Heartbeats**
- `POST /api/v1/heartbeats` - Enviar heartbeat
- `GET /api/v1/heartbeats` - Listar heartbeats
- `GET /api/v1/heartbeats/devices/status` - Status de todos os dispositivos

### Exemplos de Requisições

**Criar Usuário**
```json
POST /api/v1/auth/register
{
  "username": "Jose",
  "email": "jose@example.com",
  "password": "123456"
}
```

**Fazer Login**
```json
POST /api/v1/auth/login
{
  "username": "Jose",
  "password": "123456"
}
```

**Criar Evento de Sensor**
```json
POST /api/v1/events
{
  "device_id": "sensor_001",
  "event_type": "temperature",
  "sensor_type": "DHT22",
  "value": 23.5,
  "unit": "Celsius",
  "location": "Estufa A",
  "metadata": {
    "calibrated": true,
    "precision": 0.1
  }
}
```

**Enviar Comando para Atuador**
```json
POST /api/v1/commands
{
  "device_id": "irrigator_001",
  "command_type": "irrigation",
  "command": "start_irrigation",
  "parameters": {
    "duration_minutes": 15,
    "intensity": "medium"
  },
  "priority": 8
}
```

**Heartbeat de Dispositivo**
```json
POST /api/v1/heartbeats
{
  "device_id": "gateway_001",
  "is_online": true,
  "battery_level": 87.5,
  "signal_strength": -45.2,
  "firmware_version": "1.2.0",
  "system_info": {
    "platform": "ESP32",
    "free_memory": 150000
  }
}
```

## 🔧 Comandos Úteis

```bash
# Ver logs
make logs

# Acessar shell do backend
make shell

# Ver rotas da API
make routes

# Status do banco
make db-status

# Resetar banco (CUIDADO!)
make db-reset
```

## 📊 Monitoramento

- **Health Check**: `GET /health`
- **Documentação**: `http://localhost:5000/swagger-ui`
- **Status dos dispositivos**: `GET /api/v1/heartbeats/devices/status`

## 🛡️ Segurança

- Validação de dados com Marshmallow
- Sanitização de entrada
- Logs de auditoria
- Configurações de produção seguras

## 📈 Escalabilidade

A arquitetura suporta crescimento através de:

- **Separação de responsabilidades** (models, resources, schemas)
- **Pool de conexões** configurável
- **Paginação** automática
- **Índices de banco** otimizados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Adicione testes
4. Faça commit das mudanças
5. Abra um Pull Request