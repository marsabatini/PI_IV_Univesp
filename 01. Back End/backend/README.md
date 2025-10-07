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
└── docker-compose.yml     # Configuração Docker
```

## 🛠️ Instalação e Execução

### Docker (Recomendado)

1. **Clone o repositório**
```bash
git clone <repository>
cd horta-iot-api
```

2. **Configure as variáveis de ambiente**
```bash
cp backend/.env.example backend/.env
# Edite o arquivo .env conforme necessário
```

3. **Execute com Docker**
```bash
# Construir e iniciar
make up

# Ou manualmente
docker compose up -d
```

4. **Inicialize o banco de dados**
```bash
make db-init
make sample-data
```

### Desenvolvimento Local

1. **Instalar dependências**
```bash
cd backend
pip install -r requirements.txt
```

2. **Configurar banco PostgreSQL**
```bash
# Configure as variáveis no .env
export POSTGRES_HOST=localhost
export POSTGRES_USER=postgres
export POSTGRES_PASSWORD=postgres
```

3. **Executar aplicação**
```bash
python run.py
```

## 📚 Uso da API

### Endpoints Principais

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

# Acessar shell do container
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