from marshmallow import Schema, fields, validate

class SchoolRegistrationSchema(Schema):
    """Schema para registro de escola"""
    schoolName = fields.Str(required=True)
    directorName = fields.Str(required=True)
    coordinatorName = fields.Str(required=True)
    schoolAddress = fields.Str(required=True)
    schoolCity = fields.Str(required=True)
    schoolState = fields.Str(required=True)
    schoolZip = fields.Str(required=True)
    schoolPhone = fields.Str(required=True)
    schoolEmail = fields.Email(required=True)
    studentsCount = fields.Int(required=True)
    schoolType = fields.Str(
        required=True,
        validate=validate.OneOf(["Privada", "Publica Municipal", "Publica Estadual", "Publica Federal", "ONG/Filantrópica"])
    )
    
class UserRegistrationSchema(Schema):
    """Schema para registro de usuário"""
    name = fields.Str(required=True, validate=validate.Length(min=3, max=80))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6))
    phone = fields.Str(required=True)
    cpf = fields.Str(required=True)
    position = fields.Str(required=True)
    university = fields.Str(required=True)
    graduationYear = fields.Str(required=True)

    school = fields.Nested(SchoolRegistrationSchema, required=True)

class UserLoginSchema(Schema):
    """Schema para login"""
    email = fields.Email(required=True)
    password = fields.Str(required=True)

class TokenResponseSchema(Schema):
    """Schema para resposta de token"""
    access_token = fields.Str()
    refresh_token = fields.Str()
    user = fields.Dict()
