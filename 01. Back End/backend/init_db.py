"""
Script para inicializar o banco de dados com dados de exemplo
Execute: python init_db.py
"""
import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.main import app
from app.extensions import db
from app.models import IoTEvent, IoTCommand, Heartbeat
from datetime import datetime, timedelta
import random

def create_sample_data():
    """Criar dados de exemplo para testar a API"""
    
    print("Criando dados de exemplo...")
    
    # Dispositivos de exemplo
    devices = ['sensor_001', 'sensor_002', 'sensor_003', 'actuator_001', 'gateway_001']
    
    # Eventos de exemplo
    events_data = [
        {
            'device_id': 'sensor_001',
            'event_type': 'temperature',
            'sensor_type': 'DHT22',
            'value': 25.5,
            'unit': 'Celsius',
            'location': 'Estufa A',
            'data': {'calibrated': True, 'precision': 0.1}
        },
        {
            'device_id': 'sensor_001',
            'event_type': 'humidity',
            'sensor_type': 'DHT22',
            'value': 65.0,
            'unit': 'percentage',
            'location': 'Estufa A',
            'data': {'calibrated': True, 'precision': 0.5}
        },
        {
            'device_id': 'sensor_002',
            'event_type': 'soil_moisture',
            'sensor_type': 'Capacitive',
            'value': 45.2,
            'unit': 'percentage',
            'location': 'Canteiro 1',
            'data': {'depth_cm': 10, 'calibrated': True}
        },
        {
            'device_id': 'sensor_003',
            'event_type': 'light_intensity',
            'sensor_type': 'LDR',
            'value': 850.0,
            'unit': 'lux',
            'location': 'Estufa B',
            'data': {'spectrum': 'visible', 'calibrated': False}
        }
    ]
    
    for event_data in events_data:
        # Criar eventos com timestamps variados
        for i in range(5):
            event = IoTEvent(**event_data)
            event.created_at = datetime.utcnow() - timedelta(hours=i)
            event.value = event.value + random.uniform(-2, 2)  # Variação nos valores
            db.session.add(event)
    
    # Comandos de exemplo
    commands_data = [
        {
            'device_id': 'actuator_001',
            'command_type': 'irrigation',
            'command': 'start_irrigation',
            'parameters': {'duration_seconds': 300, 'intensity': 'medium'},
            'priority': 8
        },
        {
            'device_id': 'actuator_001',
            'command_type': 'irrigation',
            'command': 'stop_irrigation',
            'parameters': {},
            'priority': 9,
            'status': 'completed'
        },
        {
            'device_id': 'gateway_001',
            'command_type': 'config',
            'command': 'update_firmware',
            'parameters': {'version': '1.2.3', 'url': 'https://example.com/firmware.bin'},
            'priority': 3
        }
    ]
    
    for command_data in commands_data:
        command = IoTCommand(**command_data)
        if command.status == 'completed':
            command.sent_at = datetime.utcnow() - timedelta(minutes=10)
            command.acknowledged_at = datetime.utcnow() - timedelta(minutes=9)
            command.completed_at = datetime.utcnow() - timedelta(minutes=5)
        db.session.add(command)
    
    # Heartbeats de exemplo
    for device in devices:
        heartbeat = Heartbeat(
            device_id=device,
            is_online=random.choice([True, True, True, False]),  # 75% online
            signal_strength=random.uniform(-80, -40),
            battery_level=random.uniform(20, 100),
            firmware_version='1.0.0',
            uptime_seconds=random.randint(3600, 86400),
            memory_usage=random.uniform(30, 80),
            cpu_usage=random.uniform(5, 25),
            ip_address=f"192.168.1.{random.randint(100, 200)}",
            system_info={
                'platform': 'ESP32',
                'sdk_version': '4.4.0',
                'flash_size': '4MB'
            }
        )
        db.session.add(heartbeat)
    
    try:
        db.session.commit()
        print("✅ Dados de exemplo criados com sucesso!")
    except Exception as e:
        db.session.rollback()
        print(f"❌ Erro ao criar dados de exemplo: {str(e)}")

def init_database():
    """Inicializar banco de dados"""
    with app.app_context():
        print("Criando tabelas do banco de dados...")
        db.create_all()
        print("✅ Tabelas criadas com sucesso!")
        
        # Verificar se já existem dados
        if IoTEvent.query.first() is None:
            create_sample_data()
        else:
            print("ℹ️  Dados já existem no banco, pulando criação de dados de exemplo.")

if __name__ == '__main__':
    init_database()
