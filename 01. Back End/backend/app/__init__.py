from flask import Flask
from app.config import config
from app.extensions import init_extensions, db, api
from app.resources import register_blueprints

def create_app(config_name='development'):
    """Factory function para criar a aplicação Flask"""
    app = Flask(__name__)
    
    # Carregar configuração
    app.config.from_object(config[config_name])
    
    # Inicializar extensões
    init_extensions(app)
        
    # Registrar blueprints
    register_blueprints(api)

    # Criar tabelas do banco de dados
    with app.app_context():
        db.create_all()

    # Health check endpoint
    @app.route('/health')
    def health_check():
        return {'status': 'healthy', 'message': 'Horta IoT API is running'}
    
    return app