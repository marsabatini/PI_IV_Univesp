from sqlalchemy import String, Text, JSON, Boolean, DateTime, Integer
from sqlalchemy.orm import Mapped, mapped_column
from datetime import datetime
from app.extensions import db
from app.models.base import TimestampMixin

class IoTCommand(db.Model, TimestampMixin):
    """Modelo para comandos enviados para dispositivos IoT"""
    __tablename__ = 'iot_commands'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    device_id: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    command_type: Mapped[str] = mapped_column(String(50), nullable=False)
    command: Mapped[str] = mapped_column(String(100), nullable=False)
    
    # Parâmetros do comando
    parameters: Mapped[dict] = mapped_column(JSON, nullable=True)
    
    # Status do comando
    status: Mapped[str] = mapped_column(
        String(20), 
        default='pending',  # pending, sent, acknowledged, completed, failed
        nullable=False,
        index=True
    )
    
    # Controle de execução
    sent_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    acknowledged_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    completed_at: Mapped[datetime] = mapped_column(DateTime, nullable=True)
    
    # Resposta do dispositivo
    response: Mapped[dict] = mapped_column(JSON, nullable=True)
    error_message: Mapped[str] = mapped_column(Text, nullable=True)
    
    # Prioridade e timeout
    priority: Mapped[int] = mapped_column(Integer, default=5)  # 1-10, sendo 10 a maior prioridade
    timeout_seconds: Mapped[int] = mapped_column(Integer, default=30)
    
    def __repr__(self):
        return f'<IoTCommand {self.device_id}:{self.command} [{self.status}]>'
