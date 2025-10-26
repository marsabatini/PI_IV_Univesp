import React, { useState } from 'react';
import { 
  TrendingUp, Calendar, Download, Share2, Filter,
  Activity, Droplets, Sun, Thermometer, Leaf,
  BarChart3, LineChart as LineChartIcon, Target,
  Clock, ChevronDown, ChevronUp, AlertCircle,
  CheckCircle, ArrowUp, ArrowDown, Minus,
  Zap, Database, Eye, Wind, Gauge,
  Award, TrendingDown, RefreshCw, Info
} from 'lucide-react';

import Layout from '../components/Layout';
import '../styles/evolucao.css';

const Evolucao = () => {
  // Estados principais
  const [periodoSelecionado, setPeriodoSelecionado] = useState('30dias');
  const [metricaSelecionada, setMetricaSelecionada] = useState('todas');
  const [comparativoAberto, setComparativoAberto] = useState(false);
  const [detalhesExpandidos, setDetalhesExpandidos] = useState({});

  // Dados mockados - Métricas principais
  const metricas = [
    { 
      id: 'temperatura', 
      label: 'Temperatura', 
      valor: 24.8, 
      unidade: '°C',
      tendencia: 'alta',
      variacao: '+2.3%',
      icon: Thermometer,
      cor: '#ef4444',
      historico: [22, 23, 24, 25, 24, 23, 24.8]
    },
    { 
      id: 'umidade', 
      label: 'Umidade do Solo', 
      valor: 68, 
      unidade: '%',
      tendencia: 'estavel',
      variacao: '-0.5%',
      icon: Droplets,
      cor: '#3b82f6',
      historico: [70, 68, 69, 67, 68, 69, 68]
    },
    { 
      id: 'luminosidade', 
      label: 'Luminosidade', 
      valor: 75, 
      unidade: '%',
      tendencia: 'alta',
      variacao: '+8.2%',
      icon: Sun,
      cor: '#f59e0b',
      historico: [65, 68, 70, 72, 71, 74, 75]
    },
    { 
      id: 'nutrientes', 
      label: 'Nutrientes', 
      valor: 82, 
      unidade: '%',
      tendencia: 'baixa',
      variacao: '-3.1%',
      icon: Leaf,
      cor: '#10b981',
      historico: [88, 87, 85, 84, 83, 82, 82]
    }
  ];

  // Crescimento das plantas
  const crescimentoPlantas = [
    { planta: 'Tomate', altura: 42, crescimento: '+12cm', saude: 95, status: 'excelente', icone: '🍅' },
    { planta: 'Alface', altura: 18, crescimento: '+8cm', saude: 88, status: 'boa', icone: '🥬' },
    { planta: 'Pimentão', altura: 35, crescimento: '+10cm', saude: 92, status: 'excelente', icone: '🫑' },
    { planta: 'Cenoura', altura: 15, crescimento: '+5cm', saude: 78, status: 'boa', icone: '🥕' },
  ];

  // Histórico de ações
  const historicoAcoes = [
    { 
      data: '2025-10-24 14:30', 
      acao: 'Irrigação Automática', 
      duracao: '15 min', 
      consumo: '45L',
      impacto: 'Umidade +15%',
      tipo: 'irrigacao'
    },
    { 
      data: '2025-10-23 09:15', 
      acao: 'Fertilização', 
      duracao: '10 min', 
      consumo: '2.5L',
      impacto: 'Nutrientes +20%',
      tipo: 'fertilizacao'
    },
    { 
      data: '2025-10-22 16:45', 
      acao: 'Irrigação Manual', 
      duracao: '20 min', 
      consumo: '60L',
      impacto: 'Umidade +18%',
      tipo: 'irrigacao'
    },
    { 
      data: '2025-10-21 11:00', 
      acao: 'Ajuste de pH', 
      duracao: '5 min', 
      consumo: '1L',
      impacto: 'pH: 6.5→6.8',
      tipo: 'ajuste'
    },
  ];

  // Dados comparativos
  const dadosComparativos = {
    semanaAtual: { irrigacoes: 12, consumo: 340, eficiencia: 92 },
    semanaAnterior: { irrigacoes: 15, consumo: 420, eficiencia: 85 },
    mesAtual: { irrigacoes: 48, consumo: 1280, eficiencia: 90 },
    mesAnterior: { irrigacoes: 52, consumo: 1450, eficiencia: 87 }
  };

  // Previsões e insights
  const previsoes = [
    { 
      metrica: 'Consumo de Água', 
      previsao: 'Redução de 15%', 
      confianca: 87,
      tendencia: 'positiva',
      detalhes: 'Baseado em padrões climáticos e histórico de irrigação dos últimos 30 dias'
    },
    { 
      metrica: 'Crescimento', 
      previsao: 'Aceleração esperada', 
      confianca: 92,
      tendencia: 'positiva',
      detalhes: 'Condições ótimas previstas para os próximos 7 dias com temperatura ideal'
    },
    { 
      metrica: 'Necessidade de Nutrientes', 
      previsao: 'Aumento de 10%', 
      confianca: 78,
      tendencia: 'neutra',
      detalhes: 'Fase de crescimento intensivo aproximando-se, recomenda-se ajuste'
    },
  ];

  // Funções auxiliares
  const toggleDetalhes = (id) => {
    setDetalhesExpandidos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getTendenciaIcon = (tendencia) => {
    switch(tendencia) {
      case 'alta': return <ArrowUp size={16} />;
      case 'baixa': return <ArrowDown size={16} />;
      default: return <Minus size={16} />;
    }
  };

  const getTendenciaClass = (tendencia) => {
    switch(tendencia) {
      case 'alta': return 'tendencia-alta';
      case 'baixa': return 'tendencia-baixa';
      default: return 'tendencia-estavel';
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'excelente': return 'status-excelente';
      case 'boa': return 'status-boa';
      case 'atencao': return 'status-atencao';
      default: return 'status-normal';
    }
  };

  return (
    <Layout
      pageTitle="Evolução"
      pageSubtitle="Acompanhe o desenvolvimento da sua horta e analise tendências ao longo do tempo"
      activeMenuItem="Evolução"
    >
      {/* Barra de Ferramentas */}
      <div className="barra-ferramentas">
        <div className="controles-periodo">
          <button 
            className={`btn-periodo ${periodoSelecionado === '7dias' ? 'ativo' : ''}`}
            onClick={() => setPeriodoSelecionado('7dias')}
          >
            7 dias
          </button>
          <button 
            className={`btn-periodo ${periodoSelecionado === '30dias' ? 'ativo' : ''}`}
            onClick={() => setPeriodoSelecionado('30dias')}
          >
            30 dias
          </button>
          <button 
            className={`btn-periodo ${periodoSelecionado === '90dias' ? 'ativo' : ''}`}
            onClick={() => setPeriodoSelecionado('90dias')}
          >
            90 dias
          </button>
          <button 
            className={`btn-periodo ${periodoSelecionado === 'personalizado' ? 'ativo' : ''}`}
            onClick={() => setPeriodoSelecionado('personalizado')}
          >
            <Calendar size={16} />
            Personalizado
          </button>
        </div>

        <div className="acoes-rapidas">
          <button className="btn-acao">
            <Filter size={18} />
            Filtros
          </button>
          <button className="btn-acao">
            <Download size={18} />
            Exportar
          </button>
          <button className="btn-acao">
            <Share2 size={18} />
            Compartilhar
          </button>
        </div>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grade-metricas-principais">
        {metricas.map((metrica) => (
          <div key={metrica.id} className="card-metrica-principal">
            <div className="header-metrica">
              <div className="icone-metrica" style={{ backgroundColor: `${metrica.cor}15` }}>
                <metrica.icon size={24} style={{ color: metrica.cor }} />
              </div>
              <div className="info-metrica">
                <span className="label-metrica">{metrica.label}</span>
                <div className="valor-container">
                  <span className="valor-metrica">
                    {metrica.valor}{metrica.unidade}
                  </span>
                  <span className={`badge-tendencia ${getTendenciaClass(metrica.tendencia)}`}>
                    {getTendenciaIcon(metrica.tendencia)}
                    {metrica.variacao}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Mini gráfico sparkline */}
            <div className="mini-grafico">
              <svg width="100%" height="60" viewBox="0 0 200 60">
                <defs>
                  <linearGradient id={`gradient-${metrica.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={metrica.cor} stopOpacity="0.3"/>
                    <stop offset="100%" stopColor={metrica.cor} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path
                  d={`M 0,${60 - (metrica.historico[0] / Math.max(...metrica.historico) * 50)} ${metrica.historico.map((val, idx) => 
                    `L ${idx * 33},${60 - (val / Math.max(...metrica.historico) * 50)}`
                  ).join(' ')}`}
                  fill="none"
                  stroke={metrica.cor}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d={`M 0,${60 - (metrica.historico[0] / Math.max(...metrica.historico) * 50)} ${metrica.historico.map((val, idx) => 
                    `L ${idx * 33},${60 - (val / Math.max(...metrica.historico) * 50)}`
                  ).join(' ')} L 200,60 L 0,60 Z`}
                  fill={`url(#gradient-${metrica.id})`}
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Crescimento das Plantas */}
      <div className="secao-crescimento">
        <div className="cartao">
          <div className="cabecalho-cartao">
            <div className="titulo-com-icone">
              <Activity size={20} />
              <h3>Crescimento das Plantas</h3>
            </div>
            <button className="btn-detalhes">
              <Eye size={16} />
              Ver tudo
            </button>
          </div>
          <div className="lista-plantas">
            {crescimentoPlantas.map((planta, idx) => (
              <div key={idx} className="item-planta">
                <div className="info-planta">
                  <span className="icone-planta">{planta.icone}</span>
                  <div className="dados-planta">
                    <span className="nome-planta">{planta.planta}</span>
                    <div className="metricas-planta">
                      <span className="altura">{planta.altura}cm</span>
                      <span className="crescimento-badge">{planta.crescimento}</span>
                    </div>
                  </div>
                </div>
                <div className="saude-planta">
                  <div className="barra-saude">
                    <div 
                      className={`progresso-saude ${getStatusClass(planta.status)}`}
                      style={{ width: `${planta.saude}%` }}
                    />
                  </div>
                  <span className="valor-saude">{planta.saude}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparativo de Período */}
      <div className="secao-comparativo">
        <div className="cartao">
          <div className="cabecalho-cartao">
            <div className="titulo-com-icone">
              <BarChart3 size={20} />
              <h3>Comparativo de Desempenho</h3>
            </div>
            <button 
              className="btn-expandir"
              onClick={() => setComparativoAberto(!comparativoAberto)}
            >
              {comparativoAberto ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {comparativoAberto ? 'Recolher' : 'Expandir'}
            </button>
          </div>

          <div className="resumo-comparativo">
            <div className="comparativo-item">
              <span className="comparativo-label">Irrigações</span>
              <div className="comparativo-valores">
                <div className="valor-comparativo">
                  <span className="numero-comparativo">
                    {dadosComparativos.semanaAtual.irrigacoes}
                  </span>
                  <span className="label-pequeno">esta semana</span>
                </div>
                <div className="diferenca-badge positiva">
                  <ArrowDown size={14} />
                  -20%
                </div>
              </div>
            </div>

            <div className="comparativo-item">
              <span className="comparativo-label">Consumo de Água</span>
              <div className="comparativo-valores">
                <div className="valor-comparativo">
                  <span className="numero-comparativo">
                    {dadosComparativos.semanaAtual.consumo}L
                  </span>
                  <span className="label-pequeno">esta semana</span>
                </div>
                <div className="diferenca-badge positiva">
                  <ArrowDown size={14} />
                  -19%
                </div>
              </div>
            </div>

            <div className="comparativo-item">
              <span className="comparativo-label">Eficiência</span>
              <div className="comparativo-valores">
                <div className="valor-comparativo">
                  <span className="numero-comparativo">
                    {dadosComparativos.semanaAtual.eficiencia}%
                  </span>
                  <span className="label-pequeno">média atual</span>
                </div>
                <div className="diferenca-badge positiva">
                  <ArrowUp size={14} />
                  +8%
                </div>
              </div>
            </div>
          </div>

          {comparativoAberto && (
            <div className="detalhes-comparativo">
              <div className="grafico-comparativo">
                <div className="barra-comparativa">
                  <span className="label-barra">Mês Anterior</span>
                  <div className="barra">
                    <div 
                      className="preenchimento-barra anterior"
                      style={{ width: '88%' }}
                    />
                  </div>
                  <span className="valor-barra">1450L</span>
                </div>
                <div className="barra-comparativa">
                  <span className="label-barra">Mês Atual</span>
                  <div className="barra">
                    <div 
                      className="preenchimento-barra atual"
                      style={{ width: '76%' }}
                    />
                  </div>
                  <span className="valor-barra">1280L</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grade: Histórico de Ações + Previsões */}
      <div className="grade-historico-previsoes">
        {/* Histórico de Ações */}
        <div className="cartao">
          <div className="cabecalho-cartao">
            <div className="titulo-com-icone">
              <Clock size={20} />
              <h3>Histórico de Ações</h3>
            </div>
          </div>
          <div className="timeline-historico">
            {historicoAcoes.map((acao, idx) => (
              <div key={idx} className="item-timeline">
                <div className={`marcador-timeline tipo-${acao.tipo}`} />
                <div className={`linha-timeline ${idx === historicoAcoes.length - 1 ? 'ultima' : ''}`} />
                <div className="conteudo-timeline">
                  <div className="cabecalho-timeline">
                    <span className="titulo-acao">{acao.acao}</span>
                    <span className="data-acao">{acao.data}</span>
                  </div>
                  <div className="detalhes-acao">
                    <div className="detalhe-item">
                      <Clock size={14} />
                      <span>{acao.duracao}</span>
                    </div>
                    <div className="detalhe-item">
                      <Droplets size={14} />
                      <span>{acao.consumo}</span>
                    </div>
                    <div className="detalhe-item impacto">
                      <Activity size={14} />
                      <span>{acao.impacto}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Previsões e Insights */}
        <div className="cartao">
          <div className="cabecalho-cartao">
            <div className="titulo-com-icone">
              <Target size={20} />
              <h3>Previsões e Insights</h3>
            </div>
          </div>
          <div className="lista-previsoes">
            {previsoes.map((previsao, idx) => (
              <div key={idx} className="item-previsao">
                <div className="cabecalho-previsao">
                  <div className="info-previsao">
                    <span className="metrica-previsao">{previsao.metrica}</span>
                    <span className="valor-previsao">{previsao.previsao}</span>
                  </div>
                  <button 
                    className="btn-detalhes-mini"
                    onClick={() => toggleDetalhes(`previsao-${idx}`)}
                  >
                    {detalhesExpandidos[`previsao-${idx}`] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
                <div className="barra-confianca">
                  <div className="label-confianca">
                    <span>Confiança</span>
                    <span className="valor-confianca">{previsao.confianca}%</span>
                  </div>
                  <div className="barra-progresso">
                    <div 
                      className={`preenchimento-progresso confianca-${
                        previsao.confianca > 85 ? 'alta' : 
                        previsao.confianca > 70 ? 'media' : 'baixa'
                      }`}
                      style={{ width: `${previsao.confianca}%` }}
                    />
                  </div>
                </div>
                {detalhesExpandidos[`previsao-${idx}`] && (
                  <div className="detalhes-previsao">
                    <Info size={14} />
                    <p>{previsao.detalhes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Painel de Estatísticas Gerais */}
      <div className="painel-estatisticas">
        <div className="cartao">
          <div className="cabecalho-cartao">
            <div className="titulo-com-icone">
              <Database size={20} />
              <h3>Estatísticas Gerais do Período</h3>
            </div>
          </div>
          <div className="grade-estatisticas">
            <div className="stat-card">
              <div className="stat-icone agua">
                <Droplets size={28} />
              </div>
              <div className="stat-info">
                <span className="stat-valor">1,280L</span>
                <span className="stat-label">Água Consumida</span>
                <span className="stat-meta">Meta: 1,500L</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icone energia">
                <Zap size={28} />
              </div>
              <div className="stat-info">
                <span className="stat-valor">48</span>
                <span className="stat-label">Ciclos de Irrigação</span>
                <span className="stat-meta">Média: 1.6/dia</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icone eficiencia">
                <CheckCircle size={28} />
              </div>
              <div className="stat-info">
                <span className="stat-valor">92%</span>
                <span className="stat-label">Eficiência Média</span>
                <span className="stat-meta">+7% vs mês anterior</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icone crescimento">
                <TrendingUp size={28} />
              </div>
              <div className="stat-info">
                <span className="stat-valor">+35cm</span>
                <span className="stat-label">Crescimento Total</span>
                <span className="stat-meta">Todas as plantas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Evolucao;