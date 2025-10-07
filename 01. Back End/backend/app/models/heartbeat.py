from sqlalchemy import String, JSON, Float, Boolean, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.extensions import db
from app.models.base import TimestampMixin

class Heartbeat(db.Model, TimestampMixin):
    """Modelo para heartbeats dos dispositivos IoT"""
    __tablename__ = 'heartbeats'
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    device_id: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    
    # Status do dispositivo
    is_online: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    signal_strength: Mapped[float] = mapped_column(Float, nullable=True)  # RSSI ou similar
    battery_level: Mapped[float] = mapped_column(Float, nullable=True)  # Percentual 0-100
    
    # Informações do sistema
    firmware_version: Mapped[str] = mapped_column(String(50), nullable=True)
    uptime_seconds: Mapped[int] = mapped_column(Integer, nullable=True)
    
    # Métricas de performance
    memory_usage: Mapped[float] = mapped_column(Float, nullable=True)  # Percentual
    cpu_usage: Mapped[float] = mapped_column(Float, nullable=True)  # Percentual
    
    # Dados adicionais
    system_info: Mapped[dict] = mapped_column(JSON, nullable=True)
    
    # IP e localização de rede
    ip_address: Mapped[str] = mapped_column(String(45), nullable=True)  # IPv4/IPv6
    
    def __repr__(self):
        status = "online" if self.is_online else "offline"
        return f'<Heartbeat {self.device_id} [{status}] at {self.created_at}>'
