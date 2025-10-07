from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy import and_, or_
from datetime import datetime
from app.extensions import db
from app.models.iot_event import IoTEvent
from app.schemas.iot_event import IoTEventSchema, IoTEventCreateSchema, IoTEventQuerySchema
from flask_jwt_extended import jwt_required

blp = Blueprint('iot_events', __name__, description='Operações de eventos IoT')

@blp.route("/events")
class IoTEventList(MethodView):
    @jwt_required()
    @blp.arguments(IoTEventQuerySchema, location='query')
    @blp.response(200, IoTEventSchema(many=True))
    def get(self, query_args):
        """Lista todos os eventos IoT"""
        query = IoTEvent.query
        
        # Aplicar filtros
        if query_args.get('device_id'):
            query = query.filter(IoTEvent.device_id == query_args['device_id'])
        
        if query_args.get('event_type'):
            query = query.filter(IoTEvent.event_type == query_args['event_type'])
            
        if query_args.get('sensor_type'):
            query = query.filter(IoTEvent.sensor_type == query_args['sensor_type'])
            
        if query_args.get('location'):
            query = query.filter(IoTEvent.location == query_args['location'])
            
        if query_args.get('quality'):
            query = query.filter(IoTEvent.quality == query_args['quality'])
            
        if query_args.get('start_date'):
            query = query.filter(IoTEvent.created_at >= query_args['start_date'])
            
        if query_args.get('end_date'):
            query = query.filter(IoTEvent.created_at <= query_args['end_date'])
        
        # Ordenar por data de criação (mais recente primeiro)
        query = query.order_by(IoTEvent.created_at.desc())
        
        # Paginação
        page = query_args.get('page', 1)
        per_page = query_args.get('per_page', 10)
        
        events = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return events.items

    @jwt_required()
    @blp.arguments(IoTEventCreateSchema)
    @blp.response(201, IoTEventSchema)
    def post(self, event_data):
        """Cria um novo evento IoT"""
        event = IoTEvent(**event_data)
        
        try:
            db.session.add(event)
            db.session.commit()
            return event
        except Exception as e:
            db.session.rollback()
            abort(400, message=f"Erro ao criar evento: {str(e)}")

@blp.route('/events/<int:event_id>')
class IoTEventById(MethodView):
    @jwt_required()
    @blp.response(200, IoTEventSchema)
    def get(self, event_id):
        """Obter evento específico por ID"""
        event = IoTEvent.query.get_or_404(event_id)
        return event

@blp.route('/events/device/<string:device_id>/latest')
class IoTEventLatestByDevice(MethodView):
    @jwt_required()
    @blp.response(200, IoTEventSchema)
    def get(self, device_id):
        """Obter último evento de um dispositivo específico"""
        event = IoTEvent.query.filter_by(device_id=device_id).order_by(IoTEvent.created_at.desc()).first()
        
        if not event:
            abort(404, message=f"Nenhum evento encontrado para o dispositivo {device_id}")
            
        return event
