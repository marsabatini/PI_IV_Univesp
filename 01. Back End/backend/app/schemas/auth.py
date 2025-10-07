from marshmallow import Schema, fields, validate

class UserRegistrationSchema(Schema):
    """Schema para registro de usuário"""
    username = fields.Str(required=True, validate=validate.Length(min=3, max=80))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6))

class UserLoginSchema(Schema):
    """Schema para login"""
    username = fields.Str(required=True)
    password = fields.Str(required=True)

class TokenResponseSchema(Schema):
    """Schema para resposta de token"""
    access_token = fields.Str()
    refresh_token = fields.Str()
    user = fields.Dict()