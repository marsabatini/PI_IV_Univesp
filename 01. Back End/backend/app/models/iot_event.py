from sqlalchemy import String, Text, JSON, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column
from app.extensions import db
from app.models.base import TimestampMixin

class IoTEvent(db.Model, TimestampMixin):
    """Modelo para eventos recebidos dos sensores IoT"""
    __tablename__ = 'iot_events'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    device_id: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    event_type: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    sensor_type: Mapped[str] = mapped_column(String(50), nullable=False)
    
    # Dados do sensor
    value: Mapped[float] = mapped_column(Float, nullable=True)
    unit: Mapped[str] = mapped_column(String(20), nullable=True)
    
    # Dados adicionais em JSON
    data: Mapped[dict] = mapped_column(JSON, nullable=True)
    raw_data: Mapped[dict] = mapped_column(JSON, nullable=True)
    
    # Localização (opcional)
    location: Mapped[str] = mapped_column(String(100), nullable=True)
    
    # Status e qualidade dos dados
    quality: Mapped[str] = mapped_column(String(20), default='good')  # good, warning, error
    status: Mapped[str] = mapped_column(String(20), default='processed')  # received, processed, error

    def __repr__(self):
        return f'<IoTEvent {self.device_id}:{self.event_type} at {self.created_at}>'
