import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';

import '../styles/login.css';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Validação de email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Atualizar campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpar erro específico quando usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulário
  const validateForm = () => {
    const newErrors = {};

    // Validar email
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simular chamada de API
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Login realizado:', { email: formData.email, password: formData.password });
      // Redirecionar para dashboard
      alert('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar solicitação');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background com efeito parallax */}
      <div className="login-background">
        <div className="bg-overlay"></div>
      </div>

      {/* Botão voltar */}
      <Link to="/" className="back-button">
        <ArrowLeft size={20} />
        Voltar
      </Link>

      {/* Logo flutuante */}
      <div className="floating-logo">
        <img 
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmx1ZUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwYWNmZjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDA3OGZmO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JlZW5HcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2Y2ZmNjc7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzRjYWY1MDtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDwhLS0gRHJvcCBzaGFwZSAtLT4KICA8cGF0aCBkPSJNMjAgM0MxNSAzIDEwIDggMTAgMTVDMTAgMjIgMTUgMzAgMjAgMzBTMzAgMjIgMzAgMTVDMzAgOCAyNSAzIDIwIDNaIiBmaWxsPSJ1cmwoI2JsdWVHcmFkaWVudCkiLz4KICA8IS0tIExlYWYgc2hhcGUgLS0+CiAgPGVsbGlwc2UgY3g9IjEyIiBjeT0iMjAiIHJ4PSI4IiByeT0iMTIiIGZpbGw9InVybCgjZ3JlZW5HcmFkaWVudCkiLz4KICA8IS0tIExlYWYgZGV0YWlsIC0tPgogIDxwYXRoIGQ9Ik04IDIwUTEyIDI0IDE2IDIwIiBzdHJva2U9IiMyZTdkMzIiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIERpZ2l0YWwgZWxlbWVudHMgLS0+CiAgPHJlY3QgeD0iMjEiIHk9IjEyIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBmaWxsPSJ3aGl0ZSIgcng9IjAuNSIvPgogIDxyZWN0IHg9IjI2IiB5PSIxMiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0id2hpdGUiIHJ4PSIwLjMiLz4KICA8cmVjdCB4PSIyMSIgeT0iMTciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IndoaXRlIiByeD0iMC4zIi8+CiAgPHJlY3QgeD0iMjUiIHk9IjE3IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBmaWxsPSJ3aGl0ZSIgcng9IjAuNSIvPgogIDxyZWN0IHg9IjIxIiB5PSIyMiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgZmlsbD0id2hpdGUiIHJ4PSIwLjUiLz4KPC9zdmc+" 
          alt="CloudGarden" 
        />
        <span>CloudGarden</span>
      </div>

      {/* Container principal */}
      <div className="login-card">
        {/* Header do card */}
        <div className="card-header">
          <h1>Bem-vindo de volta!</h1>
          <p>Entre na sua conta CloudGarden</p>
        </div>

        {/* Formulário */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Campo Email */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail size={20} className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Digite seu email"
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Campo Senha */}
          <div className="input-group">
            <label htmlFor="password">Senha</label>
            <div className="input-wrapper">
              <Lock size={20} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Digite sua senha"
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Link "Esqueci minha senha" */}
          <div className="forgot-password">
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </div>

          {/* Botão de submit */}
          <button 
            type="submit" 
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Processando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </form>

        {/* Footer do card */}
        <div className="card-footer">
          <p>
            Não tem uma conta?
            <Link to="/register" className="toggle-mode">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      {/* Partículas animadas */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
    </div>
  );
};

export default Login;