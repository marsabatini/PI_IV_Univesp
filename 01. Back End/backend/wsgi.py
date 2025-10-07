from app import create_app
import os

config_name = os.environ.get('FLASK_ENV', 'development')
app = create_app(config_name)