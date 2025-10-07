"""
Script de gerenciamento da aplicação
Execute: python manage.py <comando>

Comandos disponíveis:
- init-db: Inicializar banco de dados
- reset-db: Resetar banco de dados
- create-sample-data: Criar dados de exemplo
"""
import click
from app.main import app
from app.extensions import db
from app.models import IoTEvent, IoTCommand, Heartbeat

@click.group()
def cli():
    """Comandos de gerenciamento da Horta IoT API"""
    pass

@cli.command()
def init_db():
    """Inicializar banco de dados"""
    with app.app_context():
        db.create_all()
        click.echo("✅ Banco de dados inicializado!")

@cli.command()
def reset_db():
    """Resetar banco de dados (CUIDADO: apaga todos os dados)"""
    if click.confirm('⚠️  Isso irá apagar todos os dados. Continuar?'):
        with app.app_context():
            db.drop_all()
            db.create_all()
            click.echo("✅ Banco de dados resetado!")

@cli.command()
def create_sample_data():
    """Criar dados de exemplo"""
    with app.app_context():
        # Importar função do init_db.py
        from init_db import create_sample_data
        create_sample_data()

@cli.command()
def show_routes():
    """Mostrar todas as rotas disponíveis"""
    with app.app_context():
        click.echo("\n📍 Rotas disponíveis:")
        for rule in app.url_map.iter_rules():
            methods = ', '.join(rule.methods - {'HEAD', 'OPTIONS'})
            click.echo(f"  {rule.endpoint:30} {methods:10} {rule.rule}")

@cli.command()
def db_status():
    """Mostrar status do banco de dados"""
    with app.app_context():
        try:
            # Testar conexão
            db.session.execute(db.text('SELECT 1'))
            click.echo("✅ Conexão com banco de dados OK")
            
            # Contar registros
            events_count = IoTEvent.query.count()
            commands_count = IoTCommand.query.count()
            heartbeats_count = Heartbeat.query.count()
            
            click.echo(f"\n📊 Estatísticas:")
            click.echo(f"  Eventos IoT: {events_count}")
            click.echo(f"  Comandos: {commands_count}")
            click.echo(f"  Heartbeats: {heartbeats_count}")
            
        except Exception as e:
            click.echo(f"❌ Erro na conexão: {str(e)}")

if __name__ == '__main__':
    cli()