import React, { useState } from 'react';
import { 
  Settings, User, Mail, Phone, MapPin, Camera,
  Bell, AlertTriangle, Droplets, Thermometer, 
  Sun, Lightbulb, Shield, Lock, Eye, EyeOff,
  Calendar, Clock, Target, Award, TrendingUp,
  Download, Upload, RefreshCw, Save, X, Check,
  ChevronDown, ChevronUp, Info, Zap, Wind,
  Activity, Database, Wifi, WifiOff, Globe,
  Smartphone, Monitor, Trash2, Edit, Plus,
  CheckCircle, XCircle, AlertCircle, Gauge,
  Cloud, CloudOff, BarChart3, PieChart, MessageSquare, Leaf,
  Building, Users, GraduationCap
} from 'lucide-react';

import Layout from '../components/Layout';
import '../styles/configuracoes.css';

const Configuracoes = () => {
  // Estados de navegação entre seções
  const [secaoAtiva, setSecaoAtiva] = useState('perfil');
  const [alteracoesNaoSalvas, setAlteracoesNaoSalvas] = useState(false);
  
  // Estados para expansão de seções
  const [secoesExpandidas, setSecoesExpandidas] = useState({
    perfil: true,
    irrigacao: false,
    sensores: false,
    alertas: false,
    horta: false,
    sistema: false
  });

  // ========== PERFIL DO USUÁRIO ==========
  const [dadosPerfil, setDadosPerfil] = useState({
    nome: 'Maria Silva',
    cpf: '123.456.789-00',
    telefone: '(11) 99999-9999',
    email: 'maria@escola.com.br',
    idade: '35',
    universidade: 'USP',
    anoFormacao: '2012',
    cargo: 'Professora',
    foto: null,
    
    // Dados da escola
    nomeEscola: 'Escola Municipal',
    nomeDiretor: 'João Santos',
    nomeCoordenador: 'Ana Costa',
    enderecoEscola: 'Rua das Flores, 123',
    cidadeEscola: 'Osasco',
    estadoEscola: 'SP',
    cepEscola: '06000-000',
    telefoneEscola: '(11) 3333-4444',
    emailEscola: 'contato@escola.com.br',
    numeroAlunos: '500',
    tipoEscola: 'publica_municipal',
    possuiHorta: true
  });

  // ========== CONFIGURAÇÕES DE IRRIGAÇÃO ==========
  const [configIrrigacao, setConfigIrrigacao] = useState({
    modoAutomatico: true,
    vazaoBase: 2.5,
    duracaoPadrao: 15,
    intervaloPadrao: 6,
    limiarUmidadeMin: 30,
    limiarUmidadeMax: 80,
    limiarTemperatura: 28,
    deteccaoChuva: true,
    modoNoturno: false,
    modoEconomia: true,
    horarioPreferencial: '06:00',
    tipoSolo: 'misto',
    capacidadeCampo: 35,
    pontoMurcha: 15
  });

  // ========== CONFIGURAÇÕES DE SENSORES ==========
  const [sensores, setSensores] = useState([
    { 
      id: 1, 
      nome: 'Sensor de Umidade #1', 
      tipo: 'umidade',
      zona: 'Zona A',
      status: 'ativo',
      bateria: 85,
      ultimaLeitura: '2 min atrás',
      calibracao: 'OK',
      intervaloLeitura: 5 // minutos
    },
    { 
      id: 2, 
      nome: 'Sensor de Temperatura #1', 
      tipo: 'temperatura',
      zona: 'Zona A',
      status: 'ativo',
      bateria: 92,
      ultimaLeitura: '1 min atrás',
      calibracao: 'OK',
      intervaloLeitura: 5
    },
    { 
      id: 3, 
      nome: 'Sensor de Luz #1', 
      tipo: 'luz',
      zona: 'Zona B',
      status: 'alerta',
      bateria: 45,
      ultimaLeitura: '15 min atrás',
      calibracao: 'Necessária',
      intervaloLeitura: 10
    },
    { 
      id: 4, 
      nome: 'Sensor de Nutrientes #1', 
      tipo: 'nutrientes',
      zona: 'Zona C',
      status: 'inativo',
      bateria: 12,
      ultimaLeitura: '2 horas atrás',
      calibracao: 'OK',
      intervaloLeitura: 30
    }
  ]);

  // ========== CONFIGURAÇÕES DE ALERTAS ==========
  const [configAlertas, setConfigAlertas] = useState({
    // Canais de notificação
    notifEmail: true,
    notifPush: true,
    notifSMS: false,
    notifWhatsApp: false,
    
    // Tipos de alerta
    alertasCriticos: true,
    alertasAvisos: true,
    alertasInfo: false,
    alertasSucesso: true,
    
    // Horários
    horarioInicio: '08:00',
    horarioFim: '22:00',
    silencioNoturno: true,
    
    // Frequências
    frequenciaUmidade: 'imediata',
    frequenciaTemperatura: 'imediata',
    frequenciaLuz: 'diaria',
    frequenciaNutrientes: 'semanal',
    frequenciaSistema: 'imediata',
    
    // Limiares personalizados
    limiarUmidadeCritico: 25,
    limiarUmidadeAviso: 35,
    limiarTempCritico: 35,
    limiarTempAviso: 30,
    limiarBateriaCritico: 15,
    limiarBateriaAviso: 30
  });

  // ========== CONFIGURAÇÕES DA HORTA ==========
  const [configHorta, setConfigHorta] = useState({
    nomeHorta: 'Horta CloudGarden',
    tipoHorta: 'educacional',
    tamanhoArea: 50, // m²
    numeroZonas: 4,
    objetivoPrincipal: 'educacao',
    
    // Plantas cultivadas
    plantasCultivadas: [
      { nome: 'Tomate', quantidade: 12, zona: 'A' },
      { nome: 'Alface', quantidade: 20, zona: 'B' },
      { nome: 'Pimentão', quantidade: 8, zona: 'A' },
      { nome: 'Cenoura', quantidade: 30, zona: 'C' }
    ],
    
    // Metas
    metaConsumoAgua: 1500, // L/mês
    metaEficiencia: 90, // %
    metaCrescimento: 85, // %
    
    // Preferências climáticas
    climaIdeal: {
      temperaturaMin: 18,
      temperaturaMax: 28,
      umidadeMin: 60,
      umidadeMax: 80
    }
  });

  // ========== CONFIGURAÇÕES DE SISTEMA ==========
  const [configSistema, setConfigSistema] = useState({
    idioma: 'pt-BR',
    furoHorario: 'America/Sao_Paulo',
    unidadeTemperatura: 'celsius',
    unidadeVolume: 'litros',
    formatoData: 'DD/MM/YYYY',
    tema: 'claro',
    
    // Sincronização
    sincronizacaoAuto: true,
    backupAuto: true,
    frequenciaBackup: 'semanal',
    armazenamentoNuvem: true,
    
    // Conectividade
    modoOffline: true,
    qualidadeConexao: 'alta',
    
    // Privacidade
    compartilharDados: false,
    analiseComportamento: true,
    
    // Segurança
    autenticacaoDoisFatores: false,
    sessaoExpira: 30 // minutos
  });

  // ========== ESTATÍSTICAS DO SISTEMA ==========
  const estatisticasSistema = {
    tempoAtivo: '45 dias',
    totalIrrigacoes: 342,
    consumoTotal: '12,450L',
    alertasGerados: 127,
    alertasResolvidos: 118,
    eficienciaMedia: 92,
    uptime: 99.2,
    espacoUsado: 2.3, // GB
    espacoTotal: 10 // GB
  };

  // Estados brasileiros
  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // ========== FUNÇÕES DE MANIPULAÇÃO ==========
  
  const toggleSecao = (secao) => {
    setSecoesExpandidas({
      ...secoesExpandidas,
      [secao]: !secoesExpandidas[secao]
    });
  };

  const atualizarPerfil = (campo, valor) => {
    setDadosPerfil({ ...dadosPerfil, [campo]: valor });
    setAlteracoesNaoSalvas(true);
  };

  const atualizarConfigIrrigacao = (campo, valor) => {
    setConfigIrrigacao({ ...configIrrigacao, [campo]: valor });
    setAlteracoesNaoSalvas(true);
  };

  const atualizarConfigAlertas = (campo, valor) => {
    setConfigAlertas({ ...configAlertas, [campo]: valor });
    setAlteracoesNaoSalvas(true);
  };

  const atualizarConfigHorta = (campo, valor) => {
    setConfigHorta({ ...configHorta, [campo]: valor });
    setAlteracoesNaoSalvas(true);
  };

  const atualizarConfigSistema = (campo, valor) => {
    setConfigSistema({ ...configSistema, [campo]: valor });
    setAlteracoesNaoSalvas(true);
  };

  const salvarConfiguracoes = () => {
    // Aqui você implementaria a lógica de salvamento
    console.log('Salvando configurações...');
    setAlteracoesNaoSalvas(false);
    
    // Simular salvamento
    alert('Configurações salvas com sucesso!');
  };

  const resetarConfiguracoes = () => {
    if (window.confirm('Tem certeza que deseja restaurar as configurações padrão? Esta ação não pode ser desfeita.')) {
      // Lógica para resetar configurações
      console.log('Resetando configurações...');
      alert('Configurações restauradas para o padrão!');
    }
  };

  const exportarDados = () => {
    // Lógica para exportar dados
    console.log('Exportando dados...');
    alert('Dados exportados com sucesso!');
  };

  const calibrarSensor = (sensorId) => {
    setSensores(sensores.map(s => 
      s.id === sensorId ? { ...s, calibracao: 'Em processo...' } : s
    ));
    
    // Simular calibração
    setTimeout(() => {
      setSensores(sensores.map(s => 
        s.id === sensorId ? { ...s, calibracao: 'OK' } : s
      ));
      alert('Sensor calibrado com sucesso!');
    }, 2000);
  };

  const testarSensor = (sensorId) => {
    alert(`Testando sensor ${sensorId}... Resultados OK!`);
  };

  const removerPlanta = (index) => {
    const novasplantas = [...configHorta.plantasCultivadas];
    novasplantas.splice(index, 1);
    atualizarConfigHorta('plantasCultivadas', novasplantas);
  };

  // ========== FUNÇÕES AUXILIARES ==========
  
  const obterIconeSensor = (tipo) => {
    switch(tipo) {
      case 'umidade': return <Droplets size={20} />;
      case 'temperatura': return <Thermometer size={20} />;
      case 'luz': return <Sun size={20} />;
      case 'nutrientes': return <Lightbulb size={20} />;
      default: return <Activity size={20} />;
    }
  };

  const obterCorStatus = (status) => {
    switch(status) {
      case 'ativo': return '#10b981';
      case 'alerta': return '#f59e0b';
      case 'inativo': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const obterClasseBateria = (nivel) => {
    if (nivel > 60) return 'bateria-alta';
    if (nivel > 30) return 'bateria-media';
    return 'bateria-baixa';
  };

  // Seções de navegação
  const secoes = [
    { id: 'perfil', label: 'Perfil', icone: User },
    { id: 'irrigacao', label: 'Irrigação', icone: Droplets },
    { id: 'sensores', label: 'Sensores', icone: Activity },
    { id: 'alertas', label: 'Alertas', icone: Bell },
    { id: 'horta', label: 'Horta', icone: Target },
    { id: 'sistema', label: 'Sistema', icone: Settings }
  ];

  return (
    <Layout
      pageTitle="Configurações"
      pageSubtitle="Personalize e gerencie todos os aspectos da sua horta inteligente"
      activeMenuItem="Configurações"
    >
      {/* Barra de Status de Alterações */}
      {alteracoesNaoSalvas && (
        <div className="barra-alteracoes">
          <div className="conteudo-alteracoes">
            <AlertCircle size={20} />
            <span>Você tem alterações não salvas</span>
          </div>
          <div className="acoes-alteracoes">
            <button className="btn-descartar" onClick={() => setAlteracoesNaoSalvas(false)}>
              Descartar
            </button>
            <button className="btn-salvar-principal" onClick={salvarConfiguracoes}>
              <Save size={18} />
              Salvar Alterações
            </button>
          </div>
        </div>
      )}

      {/* Navegação entre seções */}
      <div className="navegacao-configuracoes">
        {secoes.map(secao => (
          <button
            key={secao.id}
            className={`btn-secao ${secaoAtiva === secao.id ? 'ativo' : ''}`}
            onClick={() => setSecaoAtiva(secao.id)}
          >
            <secao.icone size={20} />
            <span>{secao.label}</span>
          </button>
        ))}
      </div>

      {/* Container principal de configurações */}
      <div className="container-configuracoes">
        
        {/* ========== SEÇÃO: PERFIL DO USUÁRIO ========== */}
        {secaoAtiva === 'perfil' && (
          <div className="secao-config">
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <User size={24} />
                  <h3>Informações Pessoais</h3>
                </div>
                <button className="btn-icone">
                  <Edit size={18} />
                </button>
              </div>

              <div className="conteudo-config">
                {/* Foto de perfil */}
                <div className="campo-foto-perfil">
                  <div className="preview-foto">
                    {dadosPerfil.foto ? (
                      <img src={dadosPerfil.foto} alt="Perfil" />
                    ) : (
                      <User size={48} />
                    )}
                  </div>
                  <div className="acoes-foto">
                    <button className="btn-upload">
                      <Camera size={18} />
                      Alterar Foto
                    </button>
                    <p className="texto-ajuda">JPG, PNG ou GIF. Máx 2MB.</p>
                  </div>
                </div>

                {/* Campos do perfil */}
                <div className="grade-campos">
                  <div className="campo-config">
                    <label>Nome Completo</label>
                    <input
                      type="text"
                      value={dadosPerfil.nome}
                      disabled
                      style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                    />
                  </div>

                  <div className="campo-config">
                    <label>CPF</label>
                    <input
                      type="text"
                      value={dadosPerfil.cpf}
                      onChange={(e) => atualizarPerfil('cpf', e.target.value)}
                    />
                  </div>

                  <div className="campo-config">
                    <label>Telefone</label>
                    <div className="campo-com-icone">
                      <Phone size={18} />
                      <input
                        type="tel"
                        value={dadosPerfil.telefone}
                        onChange={(e) => atualizarPerfil('telefone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>E-mail</label>
                    <div className="campo-com-icone">
                      <Mail size={18} />
                      <input
                        type="email"
                        value={dadosPerfil.email}
                        disabled
                        style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>Idade</label>
                    <input
                      type="number"
                      value={dadosPerfil.idade}
                      onChange={(e) => atualizarPerfil('idade', e.target.value)}
                      min="18"
                      max="100"
                    />
                  </div>

                  <div className="campo-config">
                    <label>Universidade</label>
                    <div className="campo-com-icone">
                      <GraduationCap size={18} />
                      <input
                        type="text"
                        value={dadosPerfil.universidade}
                        onChange={(e) => atualizarPerfil('universidade', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>Ano de Formação</label>
                    <div className="campo-com-icone">
                      <Calendar size={18} />
                      <input
                        type="number"
                        value={dadosPerfil.anoFormacao}
                        onChange={(e) => atualizarPerfil('anoFormacao', e.target.value)}
                        min="1950"
                        max={new Date().getFullYear()}
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>Cargo/Função</label>
                    <input
                      type="text"
                      value={dadosPerfil.cargo}
                      onChange={(e) => atualizarPerfil('cargo', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Informações da Escola */}
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Building size={24} />
                  <h3>Informações da Escola</h3>
                </div>
                <button className="btn-icone">
                  <Edit size={18} />
                </button>
              </div>

              <div className="conteudo-config">
                <div className="grade-campos">
                  <div className="campo-config">
                    <label>Nome da Escola</label>
                    <div className="campo-com-icone">
                      <Building size={18} />
                      <input
                        type="text"
                        value={dadosPerfil.nomeEscola}
                        onChange={(e) => atualizarPerfil('nomeEscola', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>Diretor(a)</label>
                    <div className="campo-com-icone">
                      <User size={18} />
                      <input
                        type="text"
                        value={dadosPerfil.nomeDiretor}
                        onChange={(e) => atualizarPerfil('nomeDiretor', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>Coordenador(a)</label>
                    <div className="campo-com-icone">
                      <User size={18} />
                      <input
                        type="text"
                        value={dadosPerfil.nomeCoordenador}
                        onChange={(e) => atualizarPerfil('nomeCoordenador', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>Endereço da Escola</label>
                    <div className="campo-com-icone">
                      <MapPin size={18} />
                      <input
                        type="text"
                        value={dadosPerfil.enderecoEscola}
                        onChange={(e) => atualizarPerfil('enderecoEscola', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>Cidade</label>
                    <div className="campo-com-icone">
                      <MapPin size={18} />
                      <input
                        type="text"
                        value={dadosPerfil.cidadeEscola}
                        onChange={(e) => atualizarPerfil('cidadeEscola', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>Estado</label>
                    <div className="campo-com-icone">
                      <MapPin size={18} />
                      <select
                        value={dadosPerfil.estadoEscola}
                        onChange={(e) => atualizarPerfil('estadoEscola', e.target.value)}
                      >
                        <option value="">Selecione o estado</option>
                        {brazilianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>CEP</label>
                    <div className="campo-com-icone">
                      <MapPin size={18} />
                      <input
                        type="text"
                        value={dadosPerfil.cepEscola}
                        onChange={(e) => atualizarPerfil('cepEscola', e.target.value)}
                        placeholder="00000-000"
                        maxLength="9"
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>Telefone da Escola</label>
                    <div className="campo-com-icone">
                      <Phone size={18} />
                      <input
                        type="tel"
                        value={dadosPerfil.telefoneEscola}
                        onChange={(e) => atualizarPerfil('telefoneEscola', e.target.value)}
                        placeholder="(00) 0000-0000"
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>Email da Escola</label>
                    <div className="campo-com-icone">
                      <Mail size={18} />
                      <input
                        type="email"
                        value={dadosPerfil.emailEscola}
                        onChange={(e) => atualizarPerfil('emailEscola', e.target.value)}
                        placeholder="contato@escola.com.br"
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>Número de Alunos</label>
                    <div className="campo-com-icone">
                      <Users size={18} />
                      <input
                        type="number"
                        value={dadosPerfil.numeroAlunos}
                        onChange={(e) => atualizarPerfil('numeroAlunos', e.target.value)}
                        placeholder="Quantidade total de alunos"
                        min="1"
                        max="10000"
                      />
                    </div>
                  </div>

                  <div className="campo-config">
                    <label>Tipo de Escola</label>
                    <div className="campo-com-icone">
                      <Building size={18} />
                      <select
                        value={dadosPerfil.tipoEscola}
                        onChange={(e) => atualizarPerfil('tipoEscola', e.target.value)}
                      >
                        <option value="">Selecione o tipo</option>
                        <option value="publica_municipal">Pública Municipal</option>
                        <option value="publica_estadual">Pública Estadual</option>
                        <option value="publica_federal">Pública Federal</option>
                        <option value="privada">Privada</option>
                        <option value="ong">ONG/Filantrópica</option>
                      </select>
                    </div>
                  </div>

                  <div className="campo-config" style={{ gridColumn: '1 / -1' }}>
                    <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input
                        type="checkbox"
                        checked={dadosPerfil.possuiHorta}
                        onChange={(e) => atualizarPerfil('possuiHorta', e.target.checked)}
                      />
                      <span>A escola já possui horta ou espaço para cultivo</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Segurança e Privacidade */}
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Shield size={24} />
                  <h3>Segurança e Privacidade</h3>
                </div>
              </div>

              <div className="conteudo-config">
                <div className="opcoes-lista">
                  <div className="opcao-item">
                    <div className="opcao-info">
                      <Lock size={20} />
                      <div>
                        <h4>Alterar Senha</h4>
                        <p>Atualize sua senha de acesso</p>
                      </div>
                    </div>
                    <button className="btn-secundario">Alterar</button>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <Shield size={20} />
                      <div>
                        <h4>Autenticação em Dois Fatores</h4>
                        <p>Adicione uma camada extra de segurança</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configSistema.autenticacaoDoisFatores}
                        onChange={(e) => atualizarConfigSistema('autenticacaoDoisFatores', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <Database size={20} />
                      <div>
                        <h4>Exportar Meus Dados</h4>
                        <p>Baixe uma cópia de todos os seus dados</p>
                      </div>
                    </div>
                    <button className="btn-secundario" onClick={exportarDados}>
                      <Download size={18} />
                      Exportar
                    </button>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <Trash2 size={20} />
                      <div>
                        <h4>Excluir Conta</h4>
                        <p className="texto-perigo">Esta ação é permanente e irreversível</p>
                      </div>
                    </div>
                    <button className="btn-perigo">Excluir</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== SEÇÃO: CONFIGURAÇÕES DE IRRIGAÇÃO ========== */}
        {secaoAtiva === 'irrigacao' && (
          <div className="secao-config">
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Droplets size={24} />
                  <h3>Sistema de Irrigação</h3>
                </div>
                <div className="badge-status ativo">
                  {configIrrigacao.modoAutomatico ? 'Automático' : 'Manual'}
                </div>
              </div>

              <div className="conteudo-config">
                {/* Modo de operação */}
                <div className="opcao-destaque">
                  <div className="opcao-info">
                    <Zap size={24} />
                    <div>
                      <h4>Modo Automático</h4>
                      <p>Sistema controla irrigação baseado em sensores e programação</p>
                    </div>
                  </div>
                  <label className="switch switch-grande">
                    <input
                      type="checkbox"
                      checked={configIrrigacao.modoAutomatico}
                      onChange={(e) => atualizarConfigIrrigacao('modoAutomatico', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>

                {/* Parâmetros básicos */}
                <div className="subsecao">
                  <h4>Parâmetros Básicos</h4>
                  <div className="grade-campos">
                    <div className="campo-config">
                      <label>
                        Vazão Base (L/min)
                        <Info size={14} className="icone-ajuda" title="Vazão padrão do sistema" />
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={configIrrigacao.vazaoBase}
                        onChange={(e) => atualizarConfigIrrigacao('vazaoBase', parseFloat(e.target.value))}
                      />
                    </div>

                    <div className="campo-config">
                      <label>
                        Duração Padrão (minutos)
                        <Info size={14} className="icone-ajuda" title="Tempo padrão de cada irrigação" />
                      </label>
                      <input
                        type="number"
                        value={configIrrigacao.duracaoPadrao}
                        onChange={(e) => atualizarConfigIrrigacao('duracaoPadrao', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="campo-config">
                      <label>
                        Intervalo Padrão (horas)
                        <Info size={14} className="icone-ajuda" title="Intervalo entre irrigações" />
                      </label>
                      <input
                        type="number"
                        value={configIrrigacao.intervaloPadrao}
                        onChange={(e) => atualizarConfigIrrigacao('intervaloPadrao', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="campo-config">
                      <label>Horário Preferencial</label>
                      <input
                        type="time"
                        value={configIrrigacao.horarioPreferencial}
                        onChange={(e) => atualizarConfigIrrigacao('horarioPreferencial', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Limiares de controle */}
                <div className="subsecao">
                  <h4>Limiares de Controle</h4>
                  <div className="grade-campos">
                    <div className="campo-config">
                      <label>Umidade Mínima (%)</label>
                      <div className="campo-com-slider">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={configIrrigacao.limiarUmidadeMin}
                          onChange={(e) => atualizarConfigIrrigacao('limiarUmidadeMin', parseInt(e.target.value))}
                        />
                        <span className="valor-slider">{configIrrigacao.limiarUmidadeMin}%</span>
                      </div>
                    </div>

                    <div className="campo-config">
                      <label>Umidade Máxima (%)</label>
                      <div className="campo-com-slider">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={configIrrigacao.limiarUmidadeMax}
                          onChange={(e) => atualizarConfigIrrigacao('limiarUmidadeMax', parseInt(e.target.value))}
                        />
                        <span className="valor-slider">{configIrrigacao.limiarUmidadeMax}%</span>
                      </div>
                    </div>

                    <div className="campo-config">
                      <label>Limite de Temperatura (°C)</label>
                      <div className="campo-com-slider">
                        <input
                          type="range"
                          min="15"
                          max="40"
                          value={configIrrigacao.limiarTemperatura}
                          onChange={(e) => atualizarConfigIrrigacao('limiarTemperatura', parseInt(e.target.value))}
                        />
                        <span className="valor-slider">{configIrrigacao.limiarTemperatura}°C</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Configurações avançadas */}
                <div className="subsecao">
                  <h4>Configurações Avançadas</h4>
                  <div className="opcoes-lista">
                    <div className="opcao-item">
                      <div className="opcao-info">
                        <Cloud size={20} />
                        <div>
                          <h5>Detecção de Chuva</h5>
                          <p>Pausar irrigação automaticamente durante chuvas</p>
                        </div>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={configIrrigacao.deteccaoChuva}
                          onChange={(e) => atualizarConfigIrrigacao('deteccaoChuva', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="opcao-item">
                      <div className="opcao-info">
                        <Clock size={20} />
                        <div>
                          <h5>Modo Noturno</h5>
                          <p>Priorizar irrigações durante a noite</p>
                        </div>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={configIrrigacao.modoNoturno}
                          onChange={(e) => atualizarConfigIrrigacao('modoNoturno', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="opcao-item">
                      <div className="opcao-info">
                        <TrendingUp size={20} />
                        <div>
                          <h5>Modo Economia</h5>
                          <p>Otimizar consumo de água automaticamente</p>
                        </div>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={configIrrigacao.modoEconomia}
                          onChange={(e) => atualizarConfigIrrigacao('modoEconomia', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Parâmetros de solo */}
                <div className="subsecao">
                  <h4>Parâmetros do Solo</h4>
                  <div className="grade-campos">
                    <div className="campo-config">
                      <label>Tipo de Solo</label>
                      <select
                        value={configIrrigacao.tipoSolo}
                        onChange={(e) => atualizarConfigIrrigacao('tipoSolo', e.target.value)}
                      >
                        <option value="arenoso">Arenoso</option>
                        <option value="argiloso">Argiloso</option>
                        <option value="misto">Misto</option>
                        <option value="humoso">Humoso</option>
                      </select>
                    </div>

                    <div className="campo-config">
                      <label>Capacidade de Campo (%)</label>
                      <input
                        type="number"
                        value={configIrrigacao.capacidadeCampo}
                        onChange={(e) => atualizarConfigIrrigacao('capacidadeCampo', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="campo-config">
                      <label>Ponto de Murcha (%)</label>
                      <input
                        type="number"
                        value={configIrrigacao.pontoMurcha}
                        onChange={(e) => atualizarConfigIrrigacao('pontoMurcha', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview de economia */}
            <div className="cartao-config cartao-destaque">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <BarChart3 size={24} />
                  <h3>Economia Estimada</h3>
                </div>
              </div>
              <div className="conteudo-config">
                <div className="estatisticas-economia">
                  <div className="stat-economia">
                    <Droplets size={32} className="icone-stat" />
                    <div>
                      <span className="valor-stat">~18%</span>
                      <span className="label-stat">Redução no consumo</span>
                    </div>
                  </div>
                  <div className="stat-economia">
                    <TrendingUp size={32} className="icone-stat" />
                    <div>
                      <span className="valor-stat">+12%</span>
                      <span className="label-stat">Eficiência esperada</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== SEÇÃO: SENSORES ========== */}
        {secaoAtiva === 'sensores' && (
          <div className="secao-config">
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Activity size={24} />
                  <h3>Gerenciamento de Sensores</h3>
                </div>
                <button className="btn-primario">
                  <Plus size={18} />
                  Adicionar Sensor
                </button>
              </div>

              <div className="conteudo-config">
                <div className="lista-sensores">
                  {sensores.map(sensor => (
                    <div key={sensor.id} className="card-sensor">
                      <div className="cabecalho-sensor">
                        <div className="info-sensor">
                          <div className="icone-sensor" style={{ color: obterCorStatus(sensor.status) }}>
                            {obterIconeSensor(sensor.tipo)}
                          </div>
                          <div>
                            <h4>{sensor.nome}</h4>
                            <span className="zona-sensor">{sensor.zona}</span>
                          </div>
                        </div>
                        <div className={`badge-status ${sensor.status}`}>
                          {sensor.status}
                        </div>
                      </div>

                      <div className="metricas-sensor">
                        <div className="metrica-item">
                          <div className={`indicador-bateria ${obterClasseBateria(sensor.bateria)}`}>
                            <div className="barra-bateria" style={{ width: `${sensor.bateria}%` }} />
                          </div>
                          <span>{sensor.bateria}%</span>
                        </div>

                        <div className="metrica-item">
                          <Clock size={14} />
                          <span>{sensor.ultimaLeitura}</span>
                        </div>

                        <div className="metrica-item">
                          <CheckCircle size={14} style={{ 
                            color: sensor.calibracao === 'OK' ? '#10b981' : '#f59e0b' 
                          }} />
                          <span>{sensor.calibracao}</span>
                        </div>
                      </div>

                      <div className="config-sensor">
                        <div className="campo-config-inline">
                          <label>Intervalo de Leitura (min)</label>
                          <input
                            type="number"
                            value={sensor.intervaloLeitura}
                            onChange={(e) => {
                              const novosSensores = sensores.map(s =>
                                s.id === sensor.id ? { ...s, intervaloLeitura: parseInt(e.target.value) } : s
                              );
                              setSensores(novosSensores);
                              setAlteracoesNaoSalvas(true);
                            }}
                            style={{ width: '80px' }}
                          />
                        </div>
                      </div>

                      <div className="acoes-sensor">
                        <button 
                          className="btn-sensor"
                          onClick={() => testarSensor(sensor.id)}
                        >
                          <Activity size={16} />
                          Testar
                        </button>
                        <button 
                          className="btn-sensor"
                          onClick={() => calibrarSensor(sensor.id)}
                          disabled={sensor.calibracao === 'Em processo...'}
                        >
                          <RefreshCw size={16} />
                          Calibrar
                        </button>
                        <button className="btn-sensor btn-perigo">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Diagnóstico do Sistema */}
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Gauge size={24} />
                  <h3>Diagnóstico do Sistema</h3>
                </div>
                <button className="btn-secundario">
                  <RefreshCw size={18} />
                  Atualizar
                </button>
              </div>
              <div className="conteudo-config">
                <div className="diagnostico-grid">
                  <div className="diagnostico-item">
                    <div className="diagnostico-icone sucesso">
                      <Wifi size={24} />
                    </div>
                    <div>
                      <h5>Conectividade</h5>
                      <p className="status-diagnostico sucesso">Excelente</p>
                      <span className="detalhe-diagnostico">Sinal: 98%</span>
                    </div>
                  </div>

                  <div className="diagnostico-item">
                    <div className="diagnostico-icone sucesso">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h5>Sensores Ativos</h5>
                      <p className="status-diagnostico sucesso">2 de 4</p>
                      <span className="detalhe-diagnostico">50% operacional</span>
                    </div>
                  </div>

                  <div className="diagnostico-item">
                    <div className="diagnostico-icone alerta">
                      <AlertTriangle size={24} />
                    </div>
                    <div>
                      <h5>Alertas Ativos</h5>
                      <p className="status-diagnostico alerta">2</p>
                      <span className="detalhe-diagnostico">Atenção necessária</span>
                    </div>
                  </div>

                  <div className="diagnostico-item">
                    <div className="diagnostico-icone sucesso">
                      <Database size={24} />
                    </div>
                    <div>
                      <h5>Armazenamento</h5>
                      <p className="status-diagnostico sucesso">{estatisticasSistema.espacoUsado}GB/{estatisticasSistema.espacoTotal}GB</p>
                      <span className="detalhe-diagnostico">23% utilizado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== SEÇÃO: ALERTAS E NOTIFICAÇÕES ========== */}
        {secaoAtiva === 'alertas' && (
          <div className="secao-config">
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Bell size={24} />
                  <h3>Canais de Notificação</h3>
                </div>
              </div>

              <div className="conteudo-config">
                <div className="opcoes-lista">
                  <div className="opcao-item">
                    <div className="opcao-info">
                      <Mail size={20} />
                      <div>
                        <h5>E-mail</h5>
                        <p>Receber alertas por e-mail</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configAlertas.notifEmail}
                        onChange={(e) => atualizarConfigAlertas('notifEmail', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <Bell size={20} />
                      <div>
                        <h5>Push Notifications</h5>
                        <p>Notificações no navegador e app</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configAlertas.notifPush}
                        onChange={(e) => atualizarConfigAlertas('notifPush', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <Smartphone size={20} />
                      <div>
                        <h5>SMS</h5>
                        <p>Mensagens de texto para alertas críticos</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configAlertas.notifSMS}
                        onChange={(e) => atualizarConfigAlertas('notifSMS', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <MessageSquare size={20} />
                      <div>
                        <h5>WhatsApp</h5>
                        <p>Alertas via WhatsApp Business</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configAlertas.notifWhatsApp}
                        onChange={(e) => atualizarConfigAlertas('notifWhatsApp', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Tipos de alerta */}
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <AlertTriangle size={24} />
                  <h3>Tipos de Alerta</h3>
                </div>
              </div>

              <div className="conteudo-config">
                <div className="opcoes-lista">
                  <div className="opcao-item">
                    <div className="opcao-info">
                      <div className="badge-tipo critico">!</div>
                      <div>
                        <h5>Alertas Críticos</h5>
                        <p>Situações que requerem ação imediata</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configAlertas.alertasCriticos}
                        onChange={(e) => atualizarConfigAlertas('alertasCriticos', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <div className="badge-tipo aviso">⚠</div>
                      <div>
                        <h5>Avisos</h5>
                        <p>Situações que merecem atenção</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configAlertas.alertasAvisos}
                        onChange={(e) => atualizarConfigAlertas('alertasAvisos', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <div className="badge-tipo info">ℹ</div>
                      <div>
                        <h5>Informativos</h5>
                        <p>Informações e atualizações gerais</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configAlertas.alertasInfo}
                        onChange={(e) => atualizarConfigAlertas('alertasInfo', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <div className="badge-tipo sucesso">✓</div>
                      <div>
                        <h5>Sucessos</h5>
                        <p>Conquistas e metas atingidas</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configAlertas.alertasSucesso}
                        onChange={(e) => atualizarConfigAlertas('alertasSucesso', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Horários e frequências */}
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Clock size={24} />
                  <h3>Horários e Frequências</h3>
                </div>
              </div>

              <div className="conteudo-config">
                <div className="subsecao">
                  <h4>Período de Notificações</h4>
                  <div className="grade-campos">
                    <div className="campo-config">
                      <label>Horário de Início</label>
                      <input
                        type="time"
                        value={configAlertas.horarioInicio}
                        onChange={(e) => atualizarConfigAlertas('horarioInicio', e.target.value)}
                      />
                    </div>

                    <div className="campo-config">
                      <label>Horário de Término</label>
                      <input
                        type="time"
                        value={configAlertas.horarioFim}
                        onChange={(e) => atualizarConfigAlertas('horarioFim', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <Clock size={20} />
                      <div>
                        <h5>Modo Silencioso Noturno</h5>
                        <p>Pausar notificações não-críticas durante a noite</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configAlertas.silencioNoturno}
                        onChange={(e) => atualizarConfigAlertas('silencioNoturno', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="subsecao">
                  <h4>Frequência por Métrica</h4>
                  <div className="grade-campos">
                    <div className="campo-config">
                      <label>
                        <Droplets size={16} />
                        Umidade
                      </label>
                      <select
                        value={configAlertas.frequenciaUmidade}
                        onChange={(e) => atualizarConfigAlertas('frequenciaUmidade', e.target.value)}
                      >
                        <option value="imediata">Imediata</option>
                        <option value="horaria">A cada hora</option>
                        <option value="diaria">Diária</option>
                      </select>
                    </div>

                    <div className="campo-config">
                      <label>
                        <Thermometer size={16} />
                        Temperatura
                      </label>
                      <select
                        value={configAlertas.frequenciaTemperatura}
                        onChange={(e) => atualizarConfigAlertas('frequenciaTemperatura', e.target.value)}
                      >
                        <option value="imediata">Imediata</option>
                        <option value="horaria">A cada hora</option>
                        <option value="diaria">Diária</option>
                      </select>
                    </div>

                    <div className="campo-config">
                      <label>
                        <Sun size={16} />
                        Luminosidade
                      </label>
                      <select
                        value={configAlertas.frequenciaLuz}
                        onChange={(e) => atualizarConfigAlertas('frequenciaLuz', e.target.value)}
                      >
                        <option value="imediata">Imediata</option>
                        <option value="diaria">Diária</option>
                        <option value="semanal">Semanal</option>
                      </select>
                    </div>

                    <div className="campo-config">
                      <label>
                        <Lightbulb size={16} />
                        Nutrientes
                      </label>
                      <select
                        value={configAlertas.frequenciaNutrientes}
                        onChange={(e) => atualizarConfigAlertas('frequenciaNutrientes', e.target.value)}
                      >
                        <option value="diaria">Diária</option>
                        <option value="semanal">Semanal</option>
                        <option value="mensal">Mensal</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="subsecao">
                  <h4>Limiares Personalizados</h4>
                  <div className="grade-campos">
                    <div className="campo-config">
                      <label>Umidade Crítica (%)</label>
                      <input
                        type="number"
                        value={configAlertas.limiarUmidadeCritico}
                        onChange={(e) => atualizarConfigAlertas('limiarUmidadeCritico', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="campo-config">
                      <label>Umidade Aviso (%)</label>
                      <input
                        type="number"
                        value={configAlertas.limiarUmidadeAviso}
                        onChange={(e) => atualizarConfigAlertas('limiarUmidadeAviso', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="campo-config">
                      <label>Temperatura Crítica (°C)</label>
                      <input
                        type="number"
                        value={configAlertas.limiarTempCritico}
                        onChange={(e) => atualizarConfigAlertas('limiarTempCritico', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="campo-config">
                      <label>Temperatura Aviso (°C)</label>
                      <input
                        type="number"
                        value={configAlertas.limiarTempAviso}
                        onChange={(e) => atualizarConfigAlertas('limiarTempAviso', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="campo-config">
                      <label>Bateria Crítica (%)</label>
                      <input
                        type="number"
                        value={configAlertas.limiarBateriaCritico}
                        onChange={(e) => atualizarConfigAlertas('limiarBateriaCritico', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="campo-config">
                      <label>Bateria Aviso (%)</label>
                      <input
                        type="number"
                        value={configAlertas.limiarBateriaAviso}
                        onChange={(e) => atualizarConfigAlertas('limiarBateriaAviso', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== SEÇÃO: CONFIGURAÇÕES DA HORTA ========== */}
        {secaoAtiva === 'horta' && (
          <div className="secao-config">
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Target size={24} />
                  <h3>Informações da Horta</h3>
                </div>
              </div>

              <div className="conteudo-config">
                <div className="grade-campos">
                  <div className="campo-config">
                    <label>Nome da Horta</label>
                    <input
                      type="text"
                      value={configHorta.nomeHorta}
                      onChange={(e) => atualizarConfigHorta('nomeHorta', e.target.value)}
                    />
                  </div>

                  <div className="campo-config">
                    <label>Tipo de Horta</label>
                    <select
                      value={configHorta.tipoHorta}
                      onChange={(e) => atualizarConfigHorta('tipoHorta', e.target.value)}
                    >
                      <option value="educacional">Educacional</option>
                      <option value="comercial">Comercial</option>
                      <option value="residencial">Residencial</option>
                      <option value="comunitaria">Comunitária</option>
                    </select>
                  </div>

                  <div className="campo-config">
                    <label>Tamanho da Área (m²)</label>
                    <input
                      type="number"
                      value={configHorta.tamanhoArea}
                      onChange={(e) => atualizarConfigHorta('tamanhoArea', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="campo-config">
                    <label>Número de Zonas</label>
                    <input
                      type="number"
                      value={configHorta.numeroZonas}
                      onChange={(e) => atualizarConfigHorta('numeroZonas', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="campo-config">
                    <label>Objetivo Principal</label>
                    <select
                      value={configHorta.objetivoPrincipal}
                      onChange={(e) => atualizarConfigHorta('objetivoPrincipal', e.target.value)}
                    >
                      <option value="educacao">Educação</option>
                      <option value="producao">Produção</option>
                      <option value="sustentabilidade">Sustentabilidade</option>
                      <option value="pesquisa">Pesquisa</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Plantas cultivadas */}
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Leaf size={24} />
                  <h3>Plantas Cultivadas</h3>
                </div>
                <button className="btn-primario">
                  <Plus size={18} />
                  Adicionar Planta
                </button>
              </div>

              <div className="conteudo-config">
                <div className="lista-plantas">
                  {configHorta.plantasCultivadas.map((planta, index) => (
                    <div key={index} className="item-planta">
                      <div className="info-planta-config">
                        <span className="icone-planta-grande">🌱</span>
                        <div>
                          <h5>{planta.nome}</h5>
                          <span className="detalhe-planta">
                            Zona {planta.zona} • {planta.quantidade} unidades
                          </span>
                        </div>
                      </div>
                      <button 
                        className="btn-remover"
                        onClick={() => removerPlanta(index)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metas */}
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Award size={24} />
                  <h3>Metas e Objetivos</h3>
                </div>
              </div>

              <div className="conteudo-config">
                <div className="grade-campos">
                  <div className="campo-config">
                    <label>Meta de Consumo de Água (L/mês)</label>
                    <input
                      type="number"
                      value={configHorta.metaConsumoAgua}
                      onChange={(e) => atualizarConfigHorta('metaConsumoAgua', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="campo-config">
                    <label>Meta de Eficiência (%)</label>
                    <input
                      type="number"
                      value={configHorta.metaEficiencia}
                      onChange={(e) => atualizarConfigHorta('metaEficiencia', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="campo-config">
                    <label>Meta de Crescimento (%)</label>
                    <input
                      type="number"
                      value={configHorta.metaCrescimento}
                      onChange={(e) => atualizarConfigHorta('metaCrescimento', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="subsecao">
                  <h4>Condições Climáticas Ideais</h4>
                  <div className="grade-campos">
                    <div className="campo-config">
                      <label>Temperatura Mínima (°C)</label>
                      <input
                        type="number"
                        value={configHorta.climaIdeal.temperaturaMin}
                        onChange={(e) => atualizarConfigHorta('climaIdeal', {
                          ...configHorta.climaIdeal,
                          temperaturaMin: parseInt(e.target.value)
                        })}
                      />
                    </div>

                    <div className="campo-config">
                      <label>Temperatura Máxima (°C)</label>
                      <input
                        type="number"
                        value={configHorta.climaIdeal.temperaturaMax}
                        onChange={(e) => atualizarConfigHorta('climaIdeal', {
                          ...configHorta.climaIdeal,
                          temperaturaMax: parseInt(e.target.value)
                        })}
                      />
                    </div>

                    <div className="campo-config">
                      <label>Umidade Mínima (%)</label>
                      <input
                        type="number"
                        value={configHorta.climaIdeal.umidadeMin}
                        onChange={(e) => atualizarConfigHorta('climaIdeal', {
                          ...configHorta.climaIdeal,
                          umidadeMin: parseInt(e.target.value)
                        })}
                      />
                    </div>

                    <div className="campo-config">
                      <label>Umidade Máxima (%)</label>
                      <input
                        type="number"
                        value={configHorta.climaIdeal.umidadeMax}
                        onChange={(e) => atualizarConfigHorta('climaIdeal', {
                          ...configHorta.climaIdeal,
                          umidadeMax: parseInt(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========== SEÇÃO: SISTEMA ========== */}
        {secaoAtiva === 'sistema' && (
          <div className="secao-config">
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Globe size={24} />
                  <h3>Preferências do Sistema</h3>
                </div>
              </div>

              <div className="conteudo-config">
                <div className="grade-campos">
                  <div className="campo-config">
                    <label>Idioma</label>
                    <select
                      value={configSistema.idioma}
                      onChange={(e) => atualizarConfigSistema('idioma', e.target.value)}
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es-ES">Español</option>
                    </select>
                  </div>

                  <div className="campo-config">
                    <label>Fuso Horário</label>
                    <select
                      value={configSistema.furoHorario}
                      onChange={(e) => atualizarConfigSistema('furoHorario', e.target.value)}
                    >
                      <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                      <option value="America/Manaus">Manaus (GMT-4)</option>
                      <option value="America/Rio_Branco">Rio Branco (GMT-5)</option>
                    </select>
                  </div>

                  <div className="campo-config">
                    <label>Unidade de Temperatura</label>
                    <select
                      value={configSistema.unidadeTemperatura}
                      onChange={(e) => atualizarConfigSistema('unidadeTemperatura', e.target.value)}
                    >
                      <option value="celsius">Celsius (°C)</option>
                      <option value="fahrenheit">Fahrenheit (°F)</option>
                    </select>
                  </div>

                  <div className="campo-config">
                    <label>Unidade de Volume</label>
                    <select
                      value={configSistema.unidadeVolume}
                      onChange={(e) => atualizarConfigSistema('unidadeVolume', e.target.value)}
                    >
                      <option value="litros">Litros</option>
                      <option value="galoes">Galões</option>
                    </select>
                  </div>

                  <div className="campo-config">
                    <label>Formato de Data</label>
                    <select
                      value={configSistema.formatoData}
                      onChange={(e) => atualizarConfigSistema('formatoData', e.target.value)}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="campo-config">
                    <label>Tema</label>
                    <select
                      value={configSistema.tema}
                      onChange={(e) => atualizarConfigSistema('tema', e.target.value)}
                    >
                      <option value="claro">Claro</option>
                      <option value="escuro">Escuro</option>
                      <option value="auto">Automático</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Sincronização e Backup */}
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Cloud size={24} />
                  <h3>Sincronização e Backup</h3>
                </div>
              </div>

              <div className="conteudo-config">
                <div className="opcoes-lista">
                  <div className="opcao-item">
                    <div className="opcao-info">
                      <RefreshCw size={20} />
                      <div>
                        <h5>Sincronização Automática</h5>
                        <p>Manter dados sincronizados em tempo real</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configSistema.sincronizacaoAuto}
                        onChange={(e) => atualizarConfigSistema('sincronizacaoAuto', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <Database size={20} />
                      <div>
                        <h5>Backup Automático</h5>
                        <p>Criar backups periódicos dos dados</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configSistema.backupAuto}
                        onChange={(e) => atualizarConfigSistema('backupAuto', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <Cloud size={20} />
                      <div>
                        <h5>Armazenamento na Nuvem</h5>
                        <p>Salvar dados na nuvem para acesso remoto</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configSistema.armazenamentoNuvem}
                        onChange={(e) => atualizarConfigSistema('armazenamentoNuvem', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                {configSistema.backupAuto && (
                  <div className="campo-config">
                    <label>Frequência de Backup</label>
                    <select
                      value={configSistema.frequenciaBackup}
                      onChange={(e) => atualizarConfigSistema('frequenciaBackup', e.target.value)}
                    >
                      <option value="diario">Diário</option>
                      <option value="semanal">Semanal</option>
                      <option value="mensal">Mensal</option>
                    </select>
                  </div>
                )}

                <div className="acoes-backup">
                  <button className="btn-secundario">
                    <Upload size={18} />
                    Fazer Backup Agora
                  </button>
                  <button className="btn-secundario">
                    <Download size={18} />
                    Restaurar Backup
                  </button>
                </div>
              </div>
            </div>

            {/* Conectividade */}
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Wifi size={24} />
                  <h3>Conectividade</h3>
                </div>
              </div>

              <div className="conteudo-config">
                <div className="opcoes-lista">
                  <div className="opcao-item">
                    <div className="opcao-info">
                      <WifiOff size={20} />
                      <div>
                        <h5>Modo Offline</h5>
                        <p>Permitir operação sem conexão com internet</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configSistema.modoOffline}
                        onChange={(e) => atualizarConfigSistema('modoOffline', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="campo-config">
                  <label>Qualidade de Conexão</label>
                  <select
                    value={configSistema.qualidadeConexao}
                    onChange={(e) => atualizarConfigSistema('qualidadeConexao', e.target.value)}
                  >
                    <option value="alta">Alta (mais dados, melhor experiência)</option>
                    <option value="media">Média (balanceado)</option>
                    <option value="baixa">Baixa (economizar dados)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Privacidade */}
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <Shield size={24} />
                  <h3>Privacidade e Dados</h3>
                </div>
              </div>

              <div className="conteudo-config">
                <div className="opcoes-lista">
                  <div className="opcao-item">
                    <div className="opcao-info">
                      <Database size={20} />
                      <div>
                        <h5>Compartilhar Dados Anônimos</h5>
                        <p>Ajudar a melhorar o sistema compartilhando dados anônimos</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configSistema.compartilharDados}
                        onChange={(e) => atualizarConfigSistema('compartilharDados', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="opcao-item">
                    <div className="opcao-info">
                      <Activity size={20} />
                      <div>
                        <h5>Análise de Comportamento</h5>
                        <p>Permitir análise de uso para personalização</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={configSistema.analiseComportamento}
                        onChange={(e) => atualizarConfigSistema('analiseComportamento', e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="campo-config">
                  <label>Tempo de Expiração da Sessão (minutos)</label>
                  <input
                    type="number"
                    value={configSistema.sessaoExpira}
                    onChange={(e) => atualizarConfigSistema('sessaoExpira', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            {/* Estatísticas do Sistema */}
            <div className="cartao-config">
              <div className="cabecalho-config">
                <div className="titulo-config">
                  <PieChart size={24} />
                  <h3>Estatísticas do Sistema</h3>
                </div>
              </div>

              <div className="conteudo-config">
                <div className="grade-estatisticas-sistema">
                  <div className="stat-sistema">
                    <Clock size={20} />
                    <div>
                      <span className="label-stat-sistema">Tempo Ativo</span>
                      <span className="valor-stat-sistema">{estatisticasSistema.tempoAtivo}</span>
                    </div>
                  </div>

                  <div className="stat-sistema">
                    <Droplets size={20} />
                    <div>
                      <span className="label-stat-sistema">Total de Irrigações</span>
                      <span className="valor-stat-sistema">{estatisticasSistema.totalIrrigacoes}</span>
                    </div>
                  </div>

                  <div className="stat-sistema">
                    <Activity size={20} />
                    <div>
                      <span className="label-stat-sistema">Consumo Total</span>
                      <span className="valor-stat-sistema">{estatisticasSistema.consumoTotal}</span>
                    </div>
                  </div>

                  <div className="stat-sistema">
                    <Bell size={20} />
                    <div>
                      <span className="label-stat-sistema">Alertas Gerados</span>
                      <span className="valor-stat-sistema">{estatisticasSistema.alertasGerados}</span>
                    </div>
                  </div>

                  <div className="stat-sistema">
                    <CheckCircle size={20} />
                    <div>
                      <span className="label-stat-sistema">Alertas Resolvidos</span>
                      <span className="valor-stat-sistema">{estatisticasSistema.alertasResolvidos}</span>
                    </div>
                  </div>

                  <div className="stat-sistema">
                    <TrendingUp size={20} />
                    <div>
                      <span className="label-stat-sistema">Eficiência Média</span>
                      <span className="valor-stat-sistema">{estatisticasSistema.eficienciaMedia}%</span>
                    </div>
                  </div>

                  <div className="stat-sistema">
                    <Zap size={20} />
                    <div>
                      <span className="label-stat-sistema">Uptime</span>
                      <span className="valor-stat-sistema">{estatisticasSistema.uptime}%</span>
                    </div>
                  </div>

                  <div className="stat-sistema">
                    <Database size={20} />
                    <div>
                      <span className="label-stat-sistema">Armazenamento</span>
                      <span className="valor-stat-sistema">
                        {estatisticasSistema.espacoUsado}GB / {estatisticasSistema.espacoTotal}GB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações do sistema */}
            <div className="cartao-config cartao-acoes">
              <div className="acoes-sistema">
                <button className="btn-acao-sistema btn-perigo" onClick={resetarConfiguracoes}>
                  <RefreshCw size={18} />
                  Restaurar Padrões
                </button>
                <button className="btn-acao-sistema btn-secundario" onClick={exportarDados}>
                  <Download size={18} />
                  Exportar Configurações
                </button>
                <button className="btn-acao-sistema btn-secundario">
                  <Upload size={18} />
                  Importar Configurações
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rodapé com botões de ação */}
      <div className="rodape-configuracoes">
        <button className="btn-cancelar" onClick={() => window.history.back()}>
          Cancelar
        </button>
        <button className="btn-salvar" onClick={salvarConfiguracoes}>
          <Save size={18} />
          Salvar Todas as Alterações
        </button>
      </div>
    </Layout>
  );
};

export default Configuracoes;