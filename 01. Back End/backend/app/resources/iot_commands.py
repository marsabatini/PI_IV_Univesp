from flask.views import MethodView
from flask_smorest import Blueprint, abort
from datetime import datetime
from app.extensions import db
from app.models.iot_command import IoTCommand
from app.schemas.iot_command import IoTCommandSchema, IoTCommandCreateSchema, IoTCommandQuerySchema, IoTCommandUpdateSchema
from flask_jwt_extended import jwt_required

blp = Blueprint('iot_commands', __name__, description='Operações de comandos IoT')

@blp.route('/commands')
class IoTCommandList(MethodView):
    @jwt_required()
    @blp.arguments(IoTCommandQuerySchema, location='query')
    @blp.response(200, IoTCommandSchema(many=True))
    def get(self, query_args):
        """Lista comandos IoT"""
        query = IoTCommand.query
        
        # Aplicar filtros
        if query_args.get('device_id'):
            query = query.filter(IoTCommand.device_id == query_args['device_id'])
        
        if query_args.get('command_type'):
            query = query.filter(IoTCommand.command_type == query_args['command_type'])
            
        if query_args.get('status'):
            query = query.filter(IoTCommand.status == query_args['status'])
            
        if query_args.get('priority'):
            query = query.filter(IoTCommand.priority == query_args['priority'])
        
        # Ordenar por prioridade (desc) e data de criação (asc)
        query = query.order_by(IoTCommand.priority.desc(), IoTCommand.created_at.asc())
        
        # Paginação
        page = query_args.get('page', 1)
        per_page = query_args.get('per_page', 10)
        
        commands = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return commands.items

    @jwt_required()
    @blp.arguments(IoTCommandCreateSchema)
    @blp.response(201, IoTCommandSchema)
    def post(self, command_data):
        """Cria novo comando IoT"""
        command = IoTCommand(**command_data)
        
        try:

            # Exemplo de publicação MQTT (descomentado se necessário)
            # from app.extensions import mqtt_client as client
            # import json
            # from datetime import datetime
            # dados = request.get_json()

            # comando = {
            #     "device_id": dados.get("device_id"),
            #     "tipo": "comando",
            #     "comando": dados.get("comando"),
            #     "duracao": dados.get("duracao", 0),
            #     "unidade": dados.get("unidade", "segundos"),
            #     "timestamp": datetime.utcnow().isoformat()
            # }

            # # Publica no tópico do atuador
            # topic = f"{TOPIC_BASE}{comando['device_id']}/comandos"
            # client.publish(topic, json.dumps(comando))
            # comandos.append(comando)

            # print(f"[API] Publicado no MQTT -> {topic}: {comando}")
            # return jsonify({"status": "comando_enviado", "dados": comando}), 200


            db.session.add(command)
            db.session.commit()
            return command
        except Exception as e:
            db.session.rollback()
            abort(400, message=f"Erro ao criar comando: {str(e)}")

@blp.route('/commands/<int:command_id>')
class IoTCommandById(MethodView):
    @jwt_required()
    @blp.response(200, IoTCommandSchema)
    def get(self, command_id):
        """Obtem comando específico por ID"""
        command = IoTCommand.query.get_or_404(command_id)
        return command

    @jwt_required()
    @blp.arguments(IoTCommandUpdateSchema)
    @blp.response(200, IoTCommandSchema)
    def put(self, command_data, command_id):
        """Atualiza status do comando"""
        command = IoTCommand.query.get_or_404(command_id)
        
        # Atualizar timestamps baseado no status
        if command_data.get('status'):
            new_status = command_data['status']
            now = datetime.utcnow()
            
            if new_status == 'sent' and not command.sent_at:
                command.sent_at = now
            elif new_status == 'acknowledged' and not command.acknowledged_at:
                command.acknowledged_at = now
            elif new_status in ['completed', 'failed'] and not command.completed_at:
                command.completed_at = now
        
        # Atualizar campos
        for key, value in command_data.items():
            setattr(command, key, value)
        
        try:
            db.session.commit()
            return command
        except Exception as e:
            db.session.rollback()
            abort(400, message=f"Erro ao atualizar comando: {str(e)}")

@blp.route('/commands/device/<string:device_id>/pending')
class IoTCommandPendingByDevice(MethodView):
    @jwt_required()
    @blp.response(200, IoTCommandSchema(many=True))
    def get(self, device_id):
        """Obtem comandos pendentes para um dispositivo específico"""
        commands = IoTCommand.query.filter_by(
            device_id=device_id,
            status='pending'
        ).order_by(IoTCommand.priority.desc(), IoTCommand.created_at.asc()).all()
        
        return commands