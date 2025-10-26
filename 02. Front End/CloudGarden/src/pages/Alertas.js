import React, { useState } from 'react';
import { 
  Bell, AlertTriangle, CheckCircle, Info, XCircle, 
  Droplets, Thermometer, Lightbulb, Wind, Clock,
  TrendingUp, TrendingDown, Zap, Activity, Settings,
  Filter, Search, Download, Trash2, Eye, EyeOff,
  AlertCircle, Shield, Target, Database, RefreshCw,
  Calendar, MapPin, Mail, MessageSquare, Smartphone,
  X, ChevronDown, ChevronUp
} from 'lucide-react';

import Layout from '../components/Layout';
import '../styles/alertas.css';

const Alertas = () => {
  // Estados principais
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [busca, setBusca] = useState('');
  const [alertasSelecionados, setAlertasSelecionados] = useState([]);
  const [mostrarConfigNotificacoes, setMostrarConfigNotificacoes] = useState(false);
  const [mostrarFiltrosAvancados, setMostrarFiltrosAvancados] = useState(false);

  // Configurações de notificação
  const [configNotificacoes, setConfigNotificacoes] = useState({
    email: true,
    push: true,
    sms: false,
    criticos: true,
    avisos: true,
    informativos: false,
    horarioInicio: '08:00',
    horarioFim: '22:00'
  });

  // Lista de alertas com diferentes tipos e prioridades
  const [alertas, setAlertas] = useState([
    {
      id: 1,
      tipo: 'critico',
      categoria: 'umidade',
      titulo: 'Umidade Crítica - Zona D',
      mensagem: 'Zona D (Folhosas) está com umidade de 28%, abaixo do limite crítico de 30%. Irrigação urgente necessária.',
      timestamp: '2025-10-25T14:30:00',
      lido: false,
      acao: 'Irrigar agora',
      icone: 'Droplets',
      origem: 'Sensor de Umidade #4',
      recomendacao: 'Ativar irrigação manual ou verificar programação automática.',
      impacto: 'Alto - Risco de perda de plantas'
    },
    {
      id: 2,
      tipo: 'aviso',
      categoria: 'temperatura',
      titulo: 'Temperatura Elevada',
      mensagem: 'Temperatura na horta atingiu 32°C, acima do ideal. Considere aumentar frequência de irrigação.',
      timestamp: '2025-10-25T13:15:00',
      lido: false,
      acao: 'Ajustar programação',
      icone: 'Thermometer',
      origem: 'Sensor de Temperatura #1',
      recomendacao: 'Aumentar frequência de irrigação em 20% ou ativar modo de proteção térmica.',
      impacto: 'Médio - Estresse térmico nas plantas'
    },
    {
      id: 3,
      tipo: 'info',
      categoria: 'clima',
      titulo: 'Previsão de Chuva',
      mensagem: 'Previsão de chuva moderada para amanhã (15mm). Sistema ajustou automaticamente a programação.',
      timestamp: '2025-10-25T12:00:00',
      lido: true,
      acao: 'Ver programação',
      icone: 'Info',
      origem: 'Sistema Meteorológico',
      recomendacao: 'Irrigações de manhã e tarde foram canceladas automaticamente.',
      impacto: 'Baixo - Otimização automática'
    },
    {
      id: 4,
      tipo: 'sucesso',
      categoria: 'economia',
      titulo: 'Meta de Economia Atingida',
      mensagem: 'Parabéns! Você economizou 18% de água nesta semana comparado à semana anterior.',
      timestamp: '2025-10-25T10:30:00',
      lido: true,
      acao: 'Ver relatório',
      icone: 'TrendingUp',
      origem: 'Sistema de Análise',
      recomendacao: 'Continue com as práticas atuais de irrigação.',
      impacto: 'Positivo - Economia de recursos'
    },
    {
      id: 5,
      tipo: 'critico',
      categoria: 'sistema',
      titulo: 'Falha no Sensor',
      mensagem: 'Sensor de luz da Zona B não está respondendo. Verificação manual necessária.',
      timestamp: '2025-10-25T09:45:00',
      lido: false,
      acao: 'Diagnosticar',
      icone: 'AlertCircle',
      origem: 'Monitor do Sistema',
      recomendacao: 'Verificar conexão do sensor ou substituir unidade.',
      impacto: 'Alto - Dados de monitoramento comprometidos'
    },
    {
      id: 6,
      tipo: 'aviso',
      categoria: 'nutrientes',
      titulo: 'Nível de Nutrientes Baixo',
      mensagem: 'Zona A apresenta nível de nutrientes em 35%, abaixo do recomendado de 50%.',
      timestamp: '2025-10-25T08:20:00',
      lido: false,
      acao: 'Adicionar fertilizante',
      icone: 'Lightbulb',
      origem: 'Sensor de Nutrientes #1',
      recomendacao: 'Aplicar fertilizante orgânico ou ajustar sistema de fertirrigação.',
      impacto: 'Médio - Crescimento comprometido'
    },
    {
      id: 7,
      tipo: 'info',
      categoria: 'manutencao',
      titulo: 'Manutenção Preventiva',
      mensagem: 'Sistema de irrigação completou 1000 horas de operação. Recomenda-se manutenção preventiva.',
      timestamp: '2025-10-25T07:00:00',
      lido: true,
      acao: 'Agendar',
      icone: 'Settings',
      origem: 'Sistema de Monitoramento',
      recomendacao: 'Verificar filtros, válvulas e conexões.',
      impacto: 'Baixo - Manutenção programada'
    },
    {
      id: 8,
      tipo: 'aviso',
      categoria: 'umidade',
      titulo: 'Umidade em Declínio - Zona C',
      mensagem: 'Zona C (Frutas) apresenta tendência de queda na umidade. Atualmente em 42%.',
      timestamp: '2025-10-25T06:15:00',
      lido: false,
      acao: 'Monitorar',
      icone: 'TrendingDown',
      origem: 'Análise Preditiva',
      recomendacao: 'Antecipar próxima irrigação em 2 horas.',
      impacto: 'Médio - Ação preventiva recomendada'
    },
    {
      id: 9,
      tipo: 'info',
      categoria: 'sistema',
      titulo: 'Atualização Disponível',
      mensagem: 'Nova versão do firmware disponível (v2.3.1) com melhorias de eficiência.',
      timestamp: '2025-10-24T20:00:00',
      lido: true,
      acao: 'Atualizar',
      icone: 'RefreshCw',
      origem: 'Sistema Central',
      recomendacao: 'Atualizar durante período de baixa atividade.',
      impacto: 'Baixo - Melhorias de desempenho'
    },
    {
      id: 10,
      tipo: 'sucesso',
      categoria: 'missao',
      titulo: 'Missão Sustentável Concluída',
      mensagem: 'Você manteve umidade acima de 80% por 7 dias consecutivos. +50 pontos!',
      timestamp: '2025-10-24T18:00:00',
      lido: false,
      acao: 'Ver conquistas',
      icone: 'Target',
      origem: 'Sistema de Gamificação',
      recomendacao: 'Nova missão desbloqueada: "Mestre da Eficiência".',
      impacto: 'Positivo - Progresso no sistema'
    }
  ]);

  // Estatísticas de alertas
  const estatisticas = {
    total: alertas.length,
    criticos: alertas.filter(a => a.tipo === 'critico').length,
    avisos: alertas.filter(a => a.tipo === 'aviso').length,
    info: alertas.filter(a => a.tipo === 'info').length,
    naoLidos: alertas.filter(a => !a.lido).length,
    hoje: alertas.filter(a => {
      const hoje = new Date().toDateString();
      const alertaData = new Date(a.timestamp).toDateString();
      return hoje === alertaData;
    }).length
  };

  // Categorias de alertas
  const categorias = [
    { id: 'todos', label: 'Todos', icone: Bell, count: alertas.length },
    { id: 'critico', label: 'Críticos', icone: AlertTriangle, count: estatisticas.criticos },
    { id: 'aviso', label: 'Avisos', icone: AlertCircle, count: estatisticas.avisos },
    { id: 'info', label: 'Informativos', icone: Info, count: estatisticas.info },
    { id: 'sucesso', label: 'Sucessos', icone: CheckCircle, count: alertas.filter(a => a.tipo === 'sucesso').length }
  ];

  // Funções de manipulação
  const marcarComoLido = (id) => {
    setAlertas(alertas.map(a => a.id === id ? { ...a, lido: true } : a));
  };

  const marcarTodosComoLidos = () => {
    setAlertas(alertas.map(a => ({ ...a, lido: true })));
  };

  const deletarAlerta = (id) => {
    setAlertas(alertas.filter(a => a.id !== id));
  };

  const toggleSelecaoAlerta = (id) => {
    if (alertasSelecionados.includes(id)) {
      setAlertasSelecionados(alertasSelecionados.filter(aId => aId !== id));
    } else {
      setAlertasSelecionados([...alertasSelecionados, id]);
    }
  };

  const deletarSelecionados = () => {
    setAlertas(alertas.filter(a => !alertasSelecionados.includes(a.id)));
    setAlertasSelecionados([]);
  };

  // Filtrar alertas
  const alertasFiltrados = alertas.filter(alerta => {
    // Filtro por tipo
    if (filtroAtivo !== 'todos' && alerta.tipo !== filtroAtivo) {
      return false;
    }
    
    // Filtro por busca
    if (busca) {
      const buscaLower = busca.toLowerCase();
      return (
        alerta.titulo.toLowerCase().includes(buscaLower) ||
        alerta.mensagem.toLowerCase().includes(buscaLower) ||
        alerta.categoria.toLowerCase().includes(buscaLower)
      );
    }
    
    return true;
  });

  // Obter ícone do alerta
  const obterIconeAlerta = (nomeIcone) => {
    const icones = {
      Droplets, Thermometer, Lightbulb, Info, TrendingUp, 
      TrendingDown, AlertCircle, Settings, RefreshCw, Target
    };
    const IconeComponent = icones[nomeIcone] || Bell;
    return <IconeComponent size={24} />;
  };

  // Formatar timestamp
  const formatarTempo = (timestamp) => {
    const data = new Date(timestamp);
    const agora = new Date();
    const diff = agora - data;
    
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);
    
    if (minutos < 1) return 'Agora';
    if (minutos < 60) return `${minutos}m atrás`;
    if (horas < 24) return `${horas}h atrás`;
    return `${dias}d atrás`;
  };

  return (
    <Layout 
      pageTitle="Alertas e Notificações" 
      pageSubtitle="Monitore eventos importantes e receba notificações em tempo real"
      activeMenuItem="Alertas"
    >
      {/* Resumo de Alertas Críticos */}
      <div className="resumo-critico">
        <div className="card-resumo critico">
          <div className="icone-resumo critico-icone">
            <AlertTriangle size={28} />
          </div>
          <div className="info-resumo">
            <span className="numero-resumo">{estatisticas.criticos}</span>
            <span className="label-resumo">Alertas Críticos</span>
          </div>
          {estatisticas.criticos > 0 && (
            <div className="badge-urgente">Requer ação</div>
          )}
        </div>

        <div className="card-resumo aviso">
          <div className="icone-resumo aviso-icone">
            <AlertCircle size={28} />
          </div>
          <div className="info-resumo">
            <span className="numero-resumo">{estatisticas.avisos}</span>
            <span className="label-resumo">Avisos Ativos</span>
          </div>
        </div>

        <div className="card-resumo info">
          <div className="icone-resumo info-icone">
            <Bell size={28} />
          </div>
          <div className="info-resumo">
            <span className="numero-resumo">{estatisticas.naoLidos}</span>
            <span className="label-resumo">Não Lidos</span>
          </div>
        </div>

        <div className="card-resumo sistema">
          <div className="icone-resumo sistema-icone">
            <Activity size={28} />
          </div>
          <div className="info-resumo">
            <span className="numero-resumo">{estatisticas.hoje}</span>
            <span className="label-resumo">Hoje</span>
          </div>
        </div>
      </div>

      {/* Painel de Análise de Alertas */}
      <div className="painel-analise">
        <h3>Análise de Alertas</h3>
        <div className="grade-analise">
          <div className="card-analise">
            <div className="cabecalho-card-analise">
              <TrendingUp size={20} />
              <span>Tendências</span>
            </div>
            <div className="conteudo-card-analise">
              <div className="metrica-tendencia">
                <span className="label-tendencia">Alertas Críticos</span>
                <div className="barra-tendencia">
                  <div className="preenchimento-barra critico" style={{width: '40%'}} />
                </div>
                <span className="valor-tendencia">40% da semana passada</span>
              </div>
              <div className="metrica-tendencia">
                <span className="label-tendencia">Tempo Médio de Resposta</span>
                <div className="barra-tendencia">
                  <div className="preenchimento-barra positivo" style={{width: '75%'}} />
                </div>
                <span className="valor-tendencia">-25% (melhoria)</span>
              </div>
            </div>
          </div>

          <div className="card-analise">
            <div className="cabecalho-card-analise">
              <Shield size={20} />
              <span>Status do Sistema</span>
            </div>
            <div className="conteudo-card-analise">
              <div className="status-sistema">
                <div className="item-status operacional">
                  <CheckCircle size={16} />
                  <span>Sensores Operacionais</span>
                  <strong>15/16</strong>
                </div>
                <div className="item-status atencao">
                  <AlertCircle size={16} />
                  <span>Requer Atenção</span>
                  <strong>1</strong>
                </div>
                <div className="item-status">
                  <Clock size={16} />
                  <span>Última Verificação</span>
                  <strong>5min atrás</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="card-analise">
            <div className="cabecalho-card-analise">
              <Activity size={20} />
              <span>Atividade Recente</span>
            </div>
            <div className="conteudo-card-analise">
              <div className="grafico-atividade">
                <div className="barra-atividade" style={{height: '30%'}}></div>
                <div className="barra-atividade" style={{height: '50%'}}></div>
                <div className="barra-atividade" style={{height: '40%'}}></div>
                <div className="barra-atividade" style={{height: '70%'}}></div>
                <div className="barra-atividade" style={{height: '90%'}}></div>
                <div className="barra-atividade" style={{height: '60%'}}></div>
                <div className="barra-atividade" style={{height: '45%'}}></div>
              </div>
              <div className="labels-atividade">
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
                <span>Dom</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Ferramentas */}
      <div className="barra-ferramentas">
        <div className="secao-esquerda">
          <div className="busca-container">
            <Search size={18} className="icone-busca" />
            <input
              type="text"
              placeholder="Buscar alertas..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="input-busca"
            />
          </div>
          
          <button 
            className="btn-filtros"
            onClick={() => setMostrarFiltrosAvancados(!mostrarFiltrosAvancados)}
          >
            <Filter size={18} />
            Filtros
            {mostrarFiltrosAvancados ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <div className="secao-direita">
          {alertasSelecionados.length > 0 && (
            <button className="btn-deletar-selecionados" onClick={deletarSelecionados}>
              <Trash2 size={18} />
              Deletar ({alertasSelecionados.length})
            </button>
          )}
          
          <button className="btn-marcar-lidos" onClick={marcarTodosComoLidos}>
            <CheckCircle size={18} />
            Marcar todos como lidos
          </button>
          
          <button 
            className="btn-config"
            onClick={() => setMostrarConfigNotificacoes(!mostrarConfigNotificacoes)}
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Filtros Avançados (Expansível) */}
      {mostrarFiltrosAvancados && (
        <div className="painel-filtros-avancados">
          <div className="filtros-categoria">
            <label>Categoria:</label>
            <div className="opcoes-filtro">
              <button className="opcao-filtro ativo">Todas</button>
              <button className="opcao-filtro">Umidade</button>
              <button className="opcao-filtro">Temperatura</button>
              <button className="opcao-filtro">Sistema</button>
              <button className="opcao-filtro">Clima</button>
            </div>
          </div>
          <div className="filtros-periodo">
            <label>Período:</label>
            <select className="select-periodo">
              <option>Últimas 24 horas</option>
              <option>Últimos 7 dias</option>
              <option>Último mês</option>
              <option>Personalizado</option>
            </select>
          </div>
        </div>
      )}

      {/* Configurações de Notificações (Expansível) */}
      {mostrarConfigNotificacoes && (
        <div className="painel-notificacoes">
          <div className="cabecalho-painel">
            <h3>Configurações de Notificações</h3>
            <button onClick={() => setMostrarConfigNotificacoes(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="grade-config-notif">
            <div className="secao-config">
              <h4>Canais de Notificação</h4>
              <div className="lista-canais">
                <label className="item-canal">
                  <input 
                    type="checkbox" 
                    checked={configNotificacoes.email}
                    onChange={(e) => setConfigNotificacoes({...configNotificacoes, email: e.target.checked})}
                  />
                  <Mail size={18} />
                  <span>E-mail</span>
                </label>
                <label className="item-canal">
                  <input 
                    type="checkbox" 
                    checked={configNotificacoes.push}
                    onChange={(e) => setConfigNotificacoes({...configNotificacoes, push: e.target.checked})}
                  />
                  <Bell size={18} />
                  <span>Push Notifications</span>
                </label>
                <label className="item-canal">
                  <input 
                    type="checkbox" 
                    checked={configNotificacoes.sms}
                    onChange={(e) => setConfigNotificacoes({...configNotificacoes, sms: e.target.checked})}
                  />
                  <Smartphone size={18} />
                  <span>SMS</span>
                </label>
              </div>
            </div>

            <div className="secao-config">
              <h4>Tipos de Alerta</h4>
              <div className="lista-tipos">
                <label className="item-tipo">
                  <input 
                    type="checkbox" 
                    checked={configNotificacoes.criticos}
                    onChange={(e) => setConfigNotificacoes({...configNotificacoes, criticos: e.target.checked})}
                  />
                  <span>Alertas Críticos</span>
                </label>
                <label className="item-tipo">
                  <input 
                    type="checkbox" 
                    checked={configNotificacoes.avisos}
                    onChange={(e) => setConfigNotificacoes({...configNotificacoes, avisos: e.target.checked})}
                  />
                  <span>Avisos</span>
                </label>
                <label className="item-tipo">
                  <input 
                    type="checkbox" 
                    checked={configNotificacoes.informativos}
                    onChange={(e) => setConfigNotificacoes({...configNotificacoes, informativos: e.target.checked})}
                  />
                  <span>Informativos</span>
                </label>
              </div>
            </div>

            <div className="secao-config">
              <h4>Horário de Notificações</h4>
              <div className="horarios">
                <div className="item-horario">
                  <label>Início:</label>
                  <input 
                    type="time" 
                    value={configNotificacoes.horarioInicio}
                    onChange={(e) => setConfigNotificacoes({...configNotificacoes, horarioInicio: e.target.value})}
                  />
                </div>
                <div className="item-horario">
                  <label>Fim:</label>
                  <input 
                    type="time" 
                    value={configNotificacoes.horarioFim}
                    onChange={(e) => setConfigNotificacoes({...configNotificacoes, horarioFim: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categorias de Filtro */}
      <div className="categorias-filtro">
        {categorias.map(cat => (
          <button
            key={cat.id}
            className={`btn-categoria ${filtroAtivo === cat.id ? 'ativo' : ''}`}
            onClick={() => setFiltroAtivo(cat.id)}
          >
            <cat.icone size={18} />
            <span>{cat.label}</span>
            <span className="badge-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Lista de Alertas */}
      <div className="container-alertas">
        {alertasFiltrados.length === 0 ? (
          <div className="estado-vazio">
            <Bell size={64} className="icone-vazio" />
            <h3>Nenhum alerta encontrado</h3>
            <p>Não há alertas correspondentes aos filtros aplicados.</p>
          </div>
        ) : (
          <div className="lista-alertas">
            {alertasFiltrados.map(alerta => (
              <div 
                key={alerta.id} 
                className={`card-alerta ${alerta.tipo} ${!alerta.lido ? 'nao-lido' : ''} ${alertasSelecionados.includes(alerta.id) ? 'selecionado' : ''}`}
              >
                <div className="selecao-alerta">
                  <input
                    type="checkbox"
                    checked={alertasSelecionados.includes(alerta.id)}
                    onChange={() => toggleSelecaoAlerta(alerta.id)}
                  />
                </div>

                <div className="icone-alerta">
                  {obterIconeAlerta(alerta.icone)}
                </div>

                <div className="conteudo-alerta">
                  <div className="cabecalho-alerta">
                    <div className="info-principal">
                      <h4>{alerta.titulo}</h4>
                      <div className="metadados-alerta">
                        <span className="origem-alerta">
                          <Database size={12} />
                          {alerta.origem}
                        </span>
                        <span className="categoria-alerta">{alerta.categoria}</span>
                        <span className="tempo-alerta">
                          <Clock size={12} />
                          {formatarTempo(alerta.timestamp)}
                        </span>
                      </div>
                    </div>
                    {!alerta.lido && <span className="indicador-nao-lido" />}
                  </div>

                  <p className="mensagem-alerta">{alerta.mensagem}</p>

                  <div className="detalhes-expandidos">
                    <div className="recomendacao-alerta">
                      <Lightbulb size={14} />
                      <span><strong>Recomendação:</strong> {alerta.recomendacao}</span>
                    </div>
                    <div className="impacto-alerta">
                      <Target size={14} />
                      <span><strong>Impacto:</strong> {alerta.impacto}</span>
                    </div>
                  </div>

                  <div className="acoes-alerta">
                    <button className={`btn-acao-principal ${alerta.tipo}`}>
                      <Zap size={16} />
                      {alerta.acao}
                    </button>
                    {!alerta.lido && (
                      <button 
                        className="btn-marcar-lido"
                        onClick={() => marcarComoLido(alerta.id)}
                      >
                        <Eye size={16} />
                        Marcar como lido
                      </button>
                    )}
                    <button 
                      className="btn-deletar"
                      onClick={() => deletarAlerta(alerta.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Alertas;