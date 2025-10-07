from marshmallow import Schema, fields, validate
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.heartbeat import Heartbeat

class HeartbeatSchema(SQLAlchemyAutoSchema):
    """Schema para serialização de Heartbeat"""
    class Meta:
        model = Heartbeat
        load_instance = True
        dump_only_fields = ('id', 'created_at', 'updated_at')

class HeartbeatCreateSchema(Schema):
    """Schema para criação/atualização de heartbeat"""
    device_id = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    is_online = fields.Bool(load_default=True)
    signal_strength = fields.Float(allow_none=True)
    battery_level = fields.Float(allow_none=True, validate=validate.Range(min=0, max=100))
    firmware_version = fields.Str(allow_none=True, validate=validate.Length(max=50))
    uptime_seconds = fields.Int(allow_none=True, validate=validate.Range(min=0))
    memory_usage = fields.Float(allow_none=True, validate=validate.Range(min=0, max=100))
    cpu_usage = fields.Float(allow_none=True, validate=validate.Range(min=0, max=100))
    system_info = fields.Dict(allow_none=True)
    ip_address = fields.Str(allow_none=True, validate=validate.Length(max=45))

class HeartbeatQuerySchema(Schema):
    """Schema para parâmetros de consulta"""
    device_id = fields.Str()
    is_online = fields.Bool()
    page = fields.Int(load_default=1, validate=validate.Range(min=1))
    per_page = fields.Int(load_default=10, validate=validate.Range(min=1, max=100))
