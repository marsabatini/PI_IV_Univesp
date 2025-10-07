from app.resources.iot_events import blp as iot_events_blp
from app.resources.iot_commands import blp as iot_commands_blp
from app.resources.heartbeats import blp as heartbeats_blp
from app.resources.auth import blp as auth_blp

def register_blueprints(api):
    """Registra todos os blueprints na API"""
    api.register_blueprint(auth_blp, url_prefix='/api/v1/auth')
    api.register_blueprint(iot_events_blp, url_prefix='/api/v1')
    api.register_blueprint(iot_commands_blp, url_prefix='/api/v1')
    api.register_blueprint(heartbeats_blp, url_prefix='/api/v1')