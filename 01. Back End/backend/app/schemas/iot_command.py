from marshmallow import Schema, fields, validate
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.iot_command import IoTCommand

class IoTCommandSchema(SQLAlchemyAutoSchema):
    """Schema para serialização de IoTCommand"""
    class Meta:
        model = IoTCommand
        load_instance = True
        dump_only_fields = ('id', 'created_at', 'updated_at', 'sent_at', 'acknowledged_at', 'completed_at')

class IoTCommandCreateSchema(Schema):
    """Schema para criação de novos comandos IoT"""
    device_id = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    command_type = fields.Str(required=True, validate=validate.Length(min=1, max=50))
    command = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    parameters = fields.Dict(allow_none=True)
    priority = fields.Int(load_default=5, validate=validate.Range(min=1, max=10))
    timeout_seconds = fields.Int(load_default=30, validate=validate.Range(min=5, max=3600))

class IoTCommandUpdateSchema(Schema):
    """Schema para atualização de status do comando"""
    status = fields.Str(validate=validate.OneOf(['pending', 'sent', 'acknowledged', 'completed', 'failed']))
    response = fields.Dict(allow_none=True)
    error_message = fields.Str(allow_none=True)

class IoTCommandQuerySchema(Schema):
    """Schema para parâmetros de consulta"""
    device_id = fields.Str()
    command_type = fields.Str()
    status = fields.Str(validate=validate.OneOf(['pending', 'sent', 'acknowledged', 'completed', 'failed']))
    priority = fields.Int(validate=validate.Range(min=1, max=10))
    page = fields.Int(load_default=1, validate=validate.Range(min=1))
    per_page = fields.Int(load_default=10, validate=validate.Range(min=1, max=100))
