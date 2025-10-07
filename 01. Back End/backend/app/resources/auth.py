from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from app.extensions import db
from app.models.user import User
from app.schemas.auth import UserRegistrationSchema, UserLoginSchema, TokenResponseSchema

blp = Blueprint('auth', __name__, description='Autenticação e registro de usuários')

@blp.route('/register')
class UserRegistration(MethodView):
    @blp.arguments(UserRegistrationSchema)
    @blp.response(201, TokenResponseSchema)
    def post(self, user_data):
        """Registrar novo usuário"""
        # Verificar se usuário já existe
        if User.query.filter_by(username=user_data['username']).first():
            abort(400, message="Username já existe")
        
        if User.query.filter_by(email=user_data['email']).first():
            abort(400, message="Email já está em uso")
        
        # Criar usuário
        user = User(username=user_data['username'], email=user_data['email'])
        user.set_password(user_data['password'])
        
        try:
            db.session.add(user)
            db.session.commit()
            
            # Criar tokens
            access_token = create_access_token(identity=str(user.id))
            refresh_token = create_refresh_token(identity=str(user.id))
            
            return {
                'access_token': access_token,
                'refresh_token': refresh_token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }
        except Exception as e:
            db.session.rollback()
            abort(400, message=f"Erro ao criar usuário: {str(e)}")

@blp.route('/login')
class UserLogin(MethodView):
    @blp.arguments(UserLoginSchema)
    @blp.response(200, TokenResponseSchema)
    def post(self, login_data):
        """Login do usuário"""
        user = User.query.filter_by(username=login_data['username']).first()
        
        if not user or not user.check_password(login_data['password']):
            abort(401, message="Credenciais inválidas")
        
        if not user.is_active:
            abort(401, message="Usuário inativo")
        
        # Criar tokens
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        
        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }

@blp.route('/profile')
class UserProfile(MethodView):
    @jwt_required()
    @blp.response(200)
    def get(self):
        """Obter perfil do usuário logado"""
        user_id = get_jwt_identity()
        user = User.query.get_or_404(user_id)
        
        return {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'created_at': user.created_at
        }