from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_smorest import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Inicialização das extensões
db = SQLAlchemy()
migrate = Migrate()
api = Api()
jwt = JWTManager()
cors = CORS()

def init_extensions(app):
    """Inicializa todas as extensões"""
    db.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)
    jwt.init_app(app)
    cors.init_app(app, supports_credentials=True)
