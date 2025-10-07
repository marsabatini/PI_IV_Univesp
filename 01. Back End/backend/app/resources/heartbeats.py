from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy import func, and_
from datetime import datetime, timedelta
from app.extensions import db
from app.models.heartbeat import Heartbeat
from app.schemas.heartbeat import HeartbeatSchema, HeartbeatCreateSchema, HeartbeatQuerySchema

blp = Blueprint('heartbeats', __name__, description='Operações de Heartbeat')

@blp.route('/heartbeats')
class HeartbeatList(MethodView):
    @blp.arguments(HeartbeatQuerySchema, location='query')
    @blp.response(200, HeartbeatSchema(many=True))
    def get(self, query_args):
        """Lista heartbeats com filtros opcionais"""
        query = Heartbeat.query
        
        # Aplicar filtros
        if query_args.get('device_id'):
            query = query.filter(Heartbeat.device_id == query_args['device_id'])
        
        if query_args.get('is_online') is not None:
            query = query.filter(Heartbeat.is_online == query_args['is_online'])
        
        # Ordenar por data de criação (mais recente primeiro)
        query = query.order_by(Heartbeat.created_at.desc())
        
        # Paginação
        page = query_args.get('page', 1)
        per_page = query_args.get('per_page', 10)
        
        heartbeats = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return heartbeats.items

    @blp.arguments(HeartbeatCreateSchema)
    @blp.response(201, HeartbeatSchema)
    def post(self, heartbeat_data):
        """Cria/atualiza heartbeat"""
        device_id = heartbeat_data['device_id']
        
        # Verificar se já existe um heartbeat recente para este dispositivo
        recent_heartbeat = Heartbeat.query.filter(
            Heartbeat.device_id == device_id,
            Heartbeat.created_at >= datetime.utcnow() - timedelta(minutes=5)
        ).order_by(Heartbeat.created_at.desc()).first()
        
        if recent_heartbeat:
            # Atualizar heartbeat existente
            for key, value in heartbeat_data.items():
                if key != 'device_id':  # Não alterar device_id
                    setattr(recent_heartbeat, key, value)
            recent_heartbeat.updated_at = datetime.utcnow()
            
            try:
                db.session.commit()
                return recent_heartbeat
            except Exception as e:
                db.session.rollback()
                abort(400, message=f"Erro ao atualizar heartbeat: {str(e)}")
        else:
            # Criar novo heartbeat
            heartbeat = Heartbeat(**heartbeat_data)
            
            try:
                db.session.add(heartbeat)
                db.session.commit()
                return heartbeat
            except Exception as e:
                db.session.rollback()
                abort(400, message=f"Erro ao criar heartbeat: {str(e)}")

@blp.route('/heartbeats/device/<string:device_id>/latest')
class HeartbeatLatestByDevice(MethodView):
    @blp.response(200, HeartbeatSchema)
    def get(self, device_id):
        """Obtem último heartbeat de um dispositivo específico"""
        heartbeat = Heartbeat.query.filter_by(device_id=device_id).order_by(Heartbeat.created_at.desc()).first()
        
        if not heartbeat:
            abort(404, message=f"Nenhum heartbeat encontrado para o dispositivo {device_id}")
            
        return heartbeat

@blp.route('/heartbeats/devices/status')
class DevicesStatus(MethodView):
    @blp.response(200)
    def get(self):
        """Obtem status resumido de todos os dispositivos"""
        # Subquery para obter o heartbeat mais recente de cada device
        subquery = db.session.query(
            Heartbeat.device_id,
            func.max(Heartbeat.created_at).label('max_created_at')
        ).group_by(Heartbeat.device_id).subquery()
        
        # Query principal para obter os heartbeats mais recentes
        latest_heartbeats = db.session.query(Heartbeat).join(
            subquery,
            and_(
                Heartbeat.device_id == subquery.c.device_id,
                Heartbeat.created_at == subquery.c.max_created_at
            )
        ).all()
        
        devices_status = []
        for heartbeat in latest_heartbeats:
            # Considerar dispositivo offline se último heartbeat foi há mais de 10 minutos
            is_recent = (datetime.utcnow() - heartbeat.created_at) < timedelta(minutes=10)
            status = "online" if heartbeat.is_online and is_recent else "offline"
            
            devices_status.append({
                "device_id": heartbeat.device_id,
                "status": status,
                "last_seen": heartbeat.created_at,
                "battery_level": heartbeat.battery_level,
                "signal_strength": heartbeat.signal_strength
            })
        
        return {"devices": devices_status, "total": len(devices_status)}
