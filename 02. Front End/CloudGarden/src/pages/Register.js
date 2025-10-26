import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, EyeOff, Mail, Lock, User, ArrowLeft, ArrowRight,
  Phone, MapPin, Building, Users, GraduationCap, Calendar,
  Check, ChevronLeft, ChevronRight
} from 'lucide-react';


import '../styles/register.css'



const Register = () => {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [formData, setFormData] = useState({
    // Dados da pessoa responsável
    name: '',
    cpf: '',
    phone: '',
    email: '',
    age: '',
    university: '',
    graduationYear: '',
    position: '',
    password: '',
    confirmPassword: '',
    
    // Dados da escola
    schoolName: '',
    directorName: '',
    coordinatorName: '',
    schoolAddress: '',
    schoolCity: '',
    schoolState: '',
    schoolZip: '',
    schoolPhone: '',
    schoolEmail: '',
    studentsCount: '',
    schoolType: '',
    hasGarden: false
  });
  
  const [errors, setErrors] = useState({});
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estados brasileiros
  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // Validações
  const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');
    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial
    };
  };

  const validateZip = (zip) => {
    const zipRegex = /^\d{5}-\d{3}$/;
    return zipRegex.test(zip);
  };

  // Formatação de campos
  const formatCPF = (value) => {
    const cpf = value.replace(/[^\d]/g, '');
    return cpf
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value) => {
    const phone = value.replace(/[^\d]/g, '');
    if (phone.length <= 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    } else {
      return phone.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    }
  };

  const formatZip = (value) => {
    const zip = value.replace(/[^\d]/g, '');
    return zip.replace(/(\d{5})(\d{0,3})/, '$1-$2').replace(/-$/, '');
  };

  // Manipulação de campos
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let formattedValue = value;

    // Aplicar formatações específicas
    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'phone' || name === 'schoolPhone') {
      formattedValue = formatPhone(value);
    } else if (name === 'schoolZip') {
      formattedValue = formatZip(value);
    } else if (name === 'name' || name === 'schoolName' || name === 'directorName' || name === 'coordinatorName') {
      // Capitalizar nomes
      formattedValue = value.replace(/\b\w/g, l => l.toUpperCase());
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue
    }));

    // Limpar erro específico
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validação da primeira etapa
  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.phone) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefone inválido';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.age) {
      newErrors.age = 'Idade é obrigatória';
    } else if (formData.age < 18 || formData.age > 100) {
      newErrors.age = 'Idade deve estar entre 18 e 100 anos';
    }

    if (!formData.university.trim()) {
      newErrors.university = 'Universidade é obrigatória';
    }

    if (!formData.graduationYear) {
      newErrors.graduationYear = 'Ano de formação é obrigatório';
    } else {
      const currentYear = new Date().getFullYear();
      if (formData.graduationYear < 1950 || formData.graduationYear > currentYear) {
        newErrors.graduationYear = `Ano deve estar entre 1950 e ${currentYear}`;
      }
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Cargo é obrigatório';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = 'Senha não atende aos critérios de segurança';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validação da segunda etapa
  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = 'Nome da escola é obrigatório';
    }

    if (!formData.directorName.trim()) {
      newErrors.directorName = 'Nome do(a) diretor(a) é obrigatório';
    }

    if (!formData.coordinatorName.trim()) {
      newErrors.coordinatorName = 'Nome do(a) coordenador(a) é obrigatório';
    }

    if (!formData.schoolAddress.trim()) {
      newErrors.schoolAddress = 'Endereço é obrigatório';
    }

    if (!formData.schoolCity.trim()) {
      newErrors.schoolCity = 'Cidade é obrigatória';
    }

    if (!formData.schoolState) {
      newErrors.schoolState = 'Estado é obrigatório';
    }

    if (!formData.schoolZip) {
      newErrors.schoolZip = 'CEP é obrigatório';
    } else if (!validateZip(formData.schoolZip)) {
      newErrors.schoolZip = 'CEP inválido';
    }

    if (!formData.schoolPhone) {
      newErrors.schoolPhone = 'Telefone da escola é obrigatório';
    } else if (!validatePhone(formData.schoolPhone)) {
      newErrors.schoolPhone = 'Telefone inválido';
    }

    if (!formData.schoolEmail) {
      newErrors.schoolEmail = 'Email da escola é obrigatório';
    } else if (!validateEmail(formData.schoolEmail)) {
      newErrors.schoolEmail = 'Email inválido';
    }

    if (!formData.studentsCount) {
      newErrors.studentsCount = 'Número de alunos é obrigatório';
    } else if (formData.studentsCount < 1 || formData.studentsCount > 10000) {
      newErrors.studentsCount = 'Número deve estar entre 1 e 10.000';
    }

    if (!formData.schoolType) {
      newErrors.schoolType = 'Tipo de escola é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navegar entre etapas
  const nextStep = () => {
    if (etapaAtual === 1 && validateStep1()) {
      setEtapaAtual(2);
    }
  };

  const prevStep = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (etapaAtual === 1) {
      nextStep();
      return;
    }

    if (!validateStep2()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log('Cadastro completo:', formData);
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao processar cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const passwordValidation = validatePassword(formData.password);

  return (
    <div className="register-container">
      {/* Background */}
      <div className="register-background">
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
      <div className="register-card">
        {/* Progress indicator */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className={`progress-step ${etapaAtual >= 1 ? 'active' : ''}`}>
              <div className="step-circle">
                {etapaAtual > 1 ? <Check size={16} /> : '1'}
              </div>
              <span>Responsável</span>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${etapaAtual >= 2 ? 'active' : ''}`}>
              <div className="step-circle">2</div>
              <span>Escola</span>
            </div>
          </div>
        </div>

        {/* Header do card */}
        <div className="card-header">
          <h1>
            {etapaAtual === 1 ? 'Responsável' : 'Escola'}
          </h1>
          <p>
            {etapaAtual === 1 
              ? 'Informe seus dados pessoais e acadêmicos'
              : 'Informe os dados da instituição de ensino'
            }
          </p>
        </div>

        {/* Formulário */}
        <form className="register-form" onSubmit={handleSubmit}>
          {etapaAtual === 1 ? (
            // PRIMEIRA ETAPA - Dados Pessoais
            <>
              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="name">Nome completo *</label>
                  <div className="input-wrapper">
                    <User size={20} className="input-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Digite seu nome completo"
                      className={errors.name ? 'error' : ''}
                    />
                  </div>
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="cpf">CPF *</label>
                  <div className="input-wrapper">
                    <User size={20} className="input-icon" />
                    <input
                      type="text"
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleInputChange}
                      placeholder="000.000.000-00"
                      maxLength="14"
                      className={errors.cpf ? 'error' : ''}
                    />
                  </div>
                  {errors.cpf && <span className="error-message">{errors.cpf}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="phone">Telefone *</label>
                  <div className="input-wrapper">
                    <Phone size={20} className="input-icon" />
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(00) 00000-0000"
                      className={errors.phone ? 'error' : ''}
                    />
                  </div>
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="age">Idade *</label>
                  <div className="input-wrapper">
                    <Calendar size={20} className="input-icon" />
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Digite sua idade"
                      min="18"
                      max="100"
                      className={errors.age ? 'error' : ''}
                    />
                  </div>
                  {errors.age && <span className="error-message">{errors.age}</span>}
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="email">Email *</label>
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

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="university">Universidade *</label>
                  <div className="input-wrapper">
                    <GraduationCap size={20} className="input-icon" />
                    <input
                      type="text"
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      placeholder="Nome da universidade"
                      className={errors.university ? 'error' : ''}
                    />
                  </div>
                  {errors.university && <span className="error-message">{errors.university}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="graduationYear">Ano de formação *</label>
                  <div className="input-wrapper">
                    <Calendar size={20} className="input-icon" />
                    <input
                      type="number"
                      id="graduationYear"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      placeholder="2020"
                      min="1950"
                      max={new Date().getFullYear()}
                      className={errors.graduationYear ? 'error' : ''}
                    />
                  </div>
                  {errors.graduationYear && <span className="error-message">{errors.graduationYear}</span>}
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="position">Cargo/Função *</label>
                <div className="input-wrapper">
                  <Users size={20} className="input-icon" />
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Professor, Coordenador, etc."
                    className={errors.position ? 'error' : ''}
                  />
                </div>
                {errors.position && <span className="error-message">{errors.position}</span>}
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="password">Senha *</label>
                  <div className="input-wrapper">
                    <Lock size={20} className="input-icon" />
                    <input
                      type={mostrarSenha ? 'text' : 'password'}
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
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                    >
                      {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="confirmPassword">Confirmar senha *</label>
                  <div className="input-wrapper">
                    <Lock size={20} className="input-icon" />
                    <input
                      type={mostrarConfirmarSenha ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirme sua senha"
                      className={errors.confirmPassword ? 'error' : ''}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                    >
                      {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              </div>

              {/* Indicador de força da senha */}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-indicators">
                    <div className={`indicator ${passwordValidation.minLength ? 'valid' : ''}`}>
                      8+ caracteres
                    </div>
                    <div className={`indicator ${passwordValidation.hasUpper ? 'valid' : ''}`}>
                      Maiúscula
                    </div>
                    <div className={`indicator ${passwordValidation.hasLower ? 'valid' : ''}`}>
                      Minúscula
                    </div>
                    <div className={`indicator ${passwordValidation.hasNumber ? 'valid' : ''}`}>
                      Número
                    </div>
                    <div className={`indicator ${passwordValidation.hasSpecial ? 'valid' : ''}`}>
                      Especial
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            // SEGUNDA ETAPA - Dados da Escola
            <>
              <div className="input-group">
                <label htmlFor="schoolName">Nome da Escola *</label>
                <div className="input-wrapper">
                  <Building size={20} className="input-icon" />
                  <input
                    type="text"
                    id="schoolName"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    placeholder="Nome completo da escola"
                    className={errors.schoolName ? 'error' : ''}
                  />
                </div>
                {errors.schoolName && <span className="error-message">{errors.schoolName}</span>}
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="directorName">Diretor(a) *</label>
                  <div className="input-wrapper">
                    <User size={20} className="input-icon" />
                    <input
                      type="text"
                      id="directorName"
                      name="directorName"
                      value={formData.directorName}
                      onChange={handleInputChange}
                      placeholder="Nome completo"
                      className={errors.directorName ? 'error' : ''}
                    />
                  </div>
                  {errors.directorName && <span className="error-message">{errors.directorName}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="coordinatorName">Coordenador(a) *</label>
                  <div className="input-wrapper">
                    <User size={20} className="input-icon" />
                    <input
                      type="text"
                      id="coordinatorName"
                      name="coordinatorName"
                      value={formData.coordinatorName}
                      onChange={handleInputChange}
                      placeholder="Nome completo"
                      className={errors.coordinatorName ? 'error' : ''}
                    />
                  </div>
                  {errors.coordinatorName && <span className="error-message">{errors.coordinatorName}</span>}
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="schoolAddress">Endereço da Escola *</label>
                <div className="input-wrapper">
                  <MapPin size={20} className="input-icon" />
                  <input
                    type="text"
                    id="schoolAddress"
                    name="schoolAddress"
                    value={formData.schoolAddress}
                    onChange={handleInputChange}
                    placeholder="Rua, número, bairro"
                    className={errors.schoolAddress ? 'error' : ''}
                  />
                </div>
                {errors.schoolAddress && <span className="error-message">{errors.schoolAddress}</span>}
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="schoolCity">Cidade *</label>
                  <div className="input-wrapper">
                    <MapPin size={20} className="input-icon" />
                    <input
                      type="text"
                      id="schoolCity"
                      name="schoolCity"
                      value={formData.schoolCity}
                      onChange={handleInputChange}
                      placeholder="Nome da cidade"
                      className={errors.schoolCity ? 'error' : ''}
                    />
                  </div>
                  {errors.schoolCity && <span className="error-message">{errors.schoolCity}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="schoolState">Estado *</label>
                  <div className="input-wrapper">
                    <MapPin size={20} className="input-icon" />
                    <select
                      id="schoolState"
                      name="schoolState"
                      value={formData.schoolState}
                      onChange={handleInputChange}
                      className={errors.schoolState ? 'error' : ''}
                    >
                      <option value="">Selecione o estado</option>
                      {brazilianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  {errors.schoolState && <span className="error-message">{errors.schoolState}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="schoolZip">CEP *</label>
                  <div className="input-wrapper">
                    <MapPin size={20} className="input-icon" />
                    <input
                      type="text"
                      id="schoolZip"
                      name="schoolZip"
                      value={formData.schoolZip}
                      onChange={handleInputChange}
                      placeholder="00000-000"
                      maxLength="9"
                      className={errors.schoolZip ? 'error' : ''}
                    />
                  </div>
                  {errors.schoolZip && <span className="error-message">{errors.schoolZip}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="schoolPhone">Telefone da Escola *</label>
                  <div className="input-wrapper">
                    <Phone size={20} className="input-icon" />
                    <input
                      type="text"
                      id="schoolPhone"
                      name="schoolPhone"
                      value={formData.schoolPhone}
                      onChange={handleInputChange}
                      placeholder="(00) 0000-0000"
                      className={errors.schoolPhone ? 'error' : ''}
                    />
                  </div>
                  {errors.schoolPhone && <span className="error-message">{errors.schoolPhone}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="schoolEmail">Email da Escola *</label>
                  <div className="input-wrapper">
                    <Mail size={20} className="input-icon" />
                    <input
                      type="email"
                      id="schoolEmail"
                      name="schoolEmail"
                      value={formData.schoolEmail}
                      onChange={handleInputChange}
                      placeholder="contato@escola.com.br"
                      className={errors.schoolEmail ? 'error' : ''}
                    />
                  </div>
                  {errors.schoolEmail && <span className="error-message">{errors.schoolEmail}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label htmlFor="studentsCount">Número de Alunos *</label>
                  <div className="input-wrapper">
                    <Users size={20} className="input-icon" />
                    <input
                      type="number"
                      id="studentsCount"
                      name="studentsCount"
                      value={formData.studentsCount}
                      onChange={handleInputChange}
                      placeholder="Quantidade total de alunos"
                      min="1"
                      max="10000"
                      className={errors.studentsCount ? 'error' : ''}
                    />
                  </div>
                  {errors.studentsCount && <span className="error-message">{errors.studentsCount}</span>}
                </div>

                <div className="input-group">
                  <label htmlFor="schoolType">Tipo de Escola *</label>
                  <div className="input-wrapper">
                    <Building size={20} className="input-icon" />
                    <select
                      id="schoolType"
                      name="schoolType"
                      value={formData.schoolType}
                      onChange={handleInputChange}
                      className={errors.schoolType ? 'error' : ''}
                    >
                      <option value="">Selecione o tipo</option>
                      <option value="publica_municipal">Pública Municipal</option>
                      <option value="publica_estadual">Pública Estadual</option>
                      <option value="publica_federal">Pública Federal</option>
                      <option value="privada">Privada</option>
                      <option value="ong">ONG/Filantrópica</option>
                    </select>
                  </div>
                  {errors.schoolType && <span className="error-message">{errors.schoolType}</span>}
                </div>
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="hasGarden"
                    checked={formData.hasGarden}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  A escola já possui horta ou espaço para cultivo
                </label>
              </div>
            </>
          )}

          {/* Botões de navegação */}
          <div className="form-actions">
            {etapaAtual > 1 && (
              <button
                type="button"
                className="btn-secondary"
                onClick={prevStep}
              >
                <ChevronLeft size={20} />
                Anterior
              </button>
            )}

            <button
              type="submit"
              className={`btn-primary ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Processando...
                </>
              ) : etapaAtual === 1 ? (
                <>
                  Próximo
                  <ChevronRight size={20} />
                </>
              ) : (
                'Cadastrar'
              )}
            </button>
          </div>
        </form>

        {/* Footer do card */}
        <div className="card-footer">
          <p>
            Já tem uma conta?
            <Link to="/login" className="toggle-mode">
              Fazer login
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

export default Register;