from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from app.extensions import db
from app.models.user import User
from app.models.school import School
from app.schemas.auth import UserRegistrationSchema, UserLoginSchema, TokenResponseSchema

blp = Blueprint('auth', __name__, description='Autenticação e registro de usuários')

@blp.route('/register')
class UserRegistration(MethodView):
    @blp.arguments(UserRegistrationSchema)
    @blp.response(201, TokenResponseSchema)
    def post(self, user_data):
        """Registrar novo usuário"""
        # Verificar se usuário já existe
        if User.query.filter_by(name=user_data['name']).first():
            abort(400, message="Username já existe")
        
        if User.query.filter_by(email=user_data['email']).first():
            abort(400, message="Email já está em uso")


        # Criar usuário + escola
        school_data = user_data.pop('school')

        #verifica se a escola já existe a partir do email
        if School.query.filter_by(schoolEmail=school_data['schoolEmail']).first():
            abort(400, message="Email escolar já está em uso")
        
        school = School(**school_data)

        user = User(name=user_data['name'],
                    email=user_data['email'], 
                    phone=user_data['phone'], 
                    cpf=user_data['cpf'], 
                    position=user_data['position'], 
                    university=user_data['university'], 
                    graduationYear=user_data['graduationYear'],
                    school=school
                    )

        user.set_password(user_data['password'])
        
        try:
            db.session.add(school)
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
                    'name': user.name,
                    'email': user.email,
                    'school_id':user.school_id
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
        user = User.query.filter_by(email=login_data['email']).first()
        
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
                'name': user.name,
                'phone':user.phone,
                'cpf':user.cpf,
                'university':user.university,
                'position':user.position,
                'graduationYear':user.graduationYear,
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
            'name': user.name,
            'email': user.email,
            'cpf':user.cpf,
            'phone':user.phone,
            'university':user.university,
            'graduationYear':user.graduationYear,
            'position':user.position,
            'created_at': user.created_at,
            'school': {
                'id': user.school.id,
                'schoolName': user.school.schoolName,
                'directorName': user.school.directorName,
                'coordinatorName': user.school.coordinatorName,
                'schoolAddress': user.school.schoolAddress,
                'schoolCity': user.school.schoolCity,
                'schoolState': user.school.schoolState,
                'schoolZip': user.school.schoolZip,
                'schoolPhone': user.school.schoolPhone,
                'schoolEmail': user.school.schoolEmail,
                'studentsCount': user.school.studentsCount,
                'schoolType': user.school.schoolType
            }
        }