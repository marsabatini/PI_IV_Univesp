from marshmallow import Schema, fields, validate
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models.iot_event import IoTEvent

class IoTEventSchema(SQLAlchemyAutoSchema):
    """Schema para serialização de IoTEvent"""
    class Meta:
        model = IoTEvent
        load_instance = True
        dump_only_fields = ('id', 'created_at', 'updated_at')

class IoTEventCreateSchema(Schema):
    """Schema para criação de novos eventos IoT"""
    device_id = fields.Str(required=True, validate=validate.Length(min=1, max=100))
    event_type = fields.Str(required=True, validate=validate.Length(min=1, max=50))
    sensor_type = fields.Str(required=True, validate=validate.Length(min=1, max=50))
    value = fields.Float(allow_none=True)
    unit = fields.Str(allow_none=True, validate=validate.Length(max=20))
    data = fields.Dict(allow_none=True)
    raw_data = fields.Dict(allow_none=True)
    location = fields.Str(allow_none=True, validate=validate.Length(max=100))
    quality = fields.Str(load_default='good', validate=validate.OneOf(['good', 'warning', 'error']))

class IoTEventQuerySchema(Schema):
    """Schema para parâmetros de consulta"""
    device_id = fields.Str()
    event_type = fields.Str()
    sensor_type = fields.Str()
    location = fields.Str()
    quality = fields.Str(validate=validate.OneOf(['good', 'warning', 'error']))
    start_date = fields.DateTime()
    end_date = fields.DateTime()
    page = fields.Int(load_default=1, validate=validate.Range(min=1))
    per_page = fields.Int(load_default=10, validate=validate.Range(min=1, max=100))
