import React, { useState } from 'react';
import { 
  Droplets, Clock, Calendar, TrendingUp, AlertTriangle, 
  Settings, Play, Pause, RefreshCw, Zap, CloudRain,
  Thermometer, Wind, Sun, Activity, CheckCircle,
  XCircle, Info, ChevronDown, ChevronUp, Timer,
  Target, Gauge, Database, Download, Filter
} from 'lucide-react';

import Layout from '../components/Layout';
import '../styles/irrigacao.css';

const Irrigacao = () => {
  // Estados principais
  const [modoAutomatico, setModoAutomatico] = useState(true);
  const [statusIrrigacao, setStatusIrrigacao] = useState('inativo'); // ativo, pausado, agendado
  const [zonasSelecionada, setZonaSelecionada] = useState('todas');
  const [mostrarConfiguracoesAvancadas, setMostrarConfiguracoesAvancadas] = useState(false);
  
  // Estados para configurações
  const [configuracoes, setConfiguracoes] = useState({
    vazao: 2.5, // L/min
    duracao: 15, // minutos
    intervalo: 6, // horas
    limiarUmidade: 30, // %
    limiarTemperatura: 28, // °C
    deteccaoChuva: true,
    modoNoturno: false,
    modoEconomia: false
  });

  // Dados de zonas de irrigação
  const [zonas, setZonas] = useState([
    { 
      id: 1, 
      nome: 'Zona A - Hortaliças', 
      status: 'ativo',
      umidade: 45, 
      ultimaIrrigacao: '08:30',
      proximaIrrigacao: '14:30',
      consumo: 12.5,
      saude: 'excelente',
      sensores: { temp: 24, umidade: 65, luz: 750 }
    },
    { 
      id: 2, 
      nome: 'Zona B - Temperos', 
      status: 'agendado',
      umidade: 38, 
      ultimaIrrigacao: '07:15',
      proximaIrrigacao: '15:00',
      consumo: 8.3,
      saude: 'bom',
      sensores: { temp: 23, umidade: 58, luz: 680 }
    },
    { 
      id: 3, 
      nome: 'Zona C - Frutas', 
      status: 'inativo',
      umidade: 52, 
      ultimaIrrigacao: '09:45',
      proximaIrrigacao: '16:00',
      consumo: 15.7,
      saude: 'atencao',
      sensores: { temp: 25, umidade: 70, luz: 820 }
    },
    { 
      id: 4, 
      nome: 'Zona D - Folhosas', 
      status: 'inativo',
      umidade: 28, 
      ultimaIrrigacao: '06:00',
      proximaIrrigacao: '12:00',
      consumo: 10.2,
      saude: 'critico',
      sensores: { temp: 26, umidade: 48, luz: 600 }
    }
  ]);

  // Programações de irrigação
  const [programacoes, setProgramacoes] = useState([
    { id: 1, nome: 'Manhã Cedo', horario: '06:00', zonas: [1, 2, 3, 4], ativo: true, dias: ['Seg', 'Qua', 'Sex'] },
    { id: 2, nome: 'Meio-dia', horario: '12:00', zonas: [1, 4], ativo: false, dias: ['Todos'] },
    { id: 3, nome: 'Fim de Tarde', horario: '18:00', zonas: [2, 3], ativo: true, dias: ['Ter', 'Qui', 'Sáb'] },
    { id: 4, nome: 'Noturna', horario: '22:00', zonas: [1, 2, 3, 4], ativo: false, dias: ['Dom'] }
  ]);

  // Histórico recente
  const [historicoRecente] = useState([
    { horario: '10:30', zona: 'Zona A', duracao: '12 min', volume: '30L', status: 'completo' },
    { horario: '09:15', zona: 'Zona C', duracao: '15 min', volume: '37.5L', status: 'completo' },
    { horario: '08:00', zona: 'Zona B', duracao: '8 min', volume: '20L', status: 'interrompido' },
    { horario: '06:45', zona: 'Zona D', duracao: '10 min', volume: '25L', status: 'completo' }
  ]);

  // Alertas e sugestões
  const [alertas] = useState([
    { tipo: 'aviso', mensagem: 'Zona D com umidade baixa (28%). Irrigação recomendada.' },
    { tipo: 'info', mensagem: 'Previsão de chuva para amanhã. Considere ajustar programação.' },
    { tipo: 'sucesso', mensagem: 'Economia de 15% de água nesta semana comparado à anterior.' }
  ]);

  // Dados climáticos
  const climaAtual = {
    temperatura: 24,
    umidade: 65,
    vento: 12,
    previsao: 'Parcialmente nublado'
  };

  // Funções de controle
  const iniciarIrrigacao = (zonaId = null) => {
    if (zonaId) {
      setZonas(zonas.map(z => 
        z.id === zonaId ? { ...z, status: 'ativo' } : z
      ));
    } else {
      setStatusIrrigacao('ativo');
      setZonas(zonas.map(z => ({ ...z, status: 'ativo' })));
    }
  };

  const pausarIrrigacao = () => {
    setStatusIrrigacao('pausado');
    setZonas(zonas.map(z => ({ ...z, status: 'inativo' })));
  };

  const pararIrrigacao = () => {
    setStatusIrrigacao('inativo');
    setZonas(zonas.map(z => ({ ...z, status: 'inativo' })));
  };

  const alternarProgramacao = (programacaoId) => {
    setProgramacoes(programacoes.map(p => 
      p.id === programacaoId ? { ...p, ativo: !p.ativo } : p
    ));
  };

  const atualizarConfiguracao = (chave, valor) => {
    setConfiguracoes({ ...configuracoes, [chave]: valor });
  };

  // Cálculos
  const consumoDiarioTotal = zonas.reduce((acc, zona) => acc + zona.consumo, 0);
  const umidadeMedia = zonas.reduce((acc, zona) => acc + zona.umidade, 0) / zonas.length;
  const zonasAtivasContagem = zonas.filter(z => z.status === 'ativo').length;

  // Renderização de ícone de status
  const obterIconeStatus = (status) => {
    switch(status) {
      case 'ativo': return <CheckCircle className="status-ativo" size={16} />;
      case 'agendado': return <Clock className="status-agendado" size={16} />;
      case 'pausado': return <Pause className="status-pausado" size={16} />;
      default: return <XCircle className="status-inativo" size={16} />;
    }
  };

  // Renderização de cor de saúde
  const obterClasseSaude = (saude) => {
    switch(saude) {
      case 'excelente': return 'saude-excelente';
      case 'bom': return 'saude-bom';
      case 'atencao': return 'saude-atencao';
      case 'critico': return 'saude-critico';
      default: return '';
    }
  };

  return (
    <Layout 
      pageTitle="Irrigação" 
      pageSubtitle="Controle e monitore o sistema de irrigação da sua horta inteligente"
      activeMenuItem="Irrigação"
    >
      {/* Alertas e Sugestões */}
      <div className="alertas-secao">
        {alertas.map((alerta, index) => (
          <div key={index} className={`alerta alerta-${alerta.tipo}`}>
            <div className="alerta-icone">
              {alerta.tipo === 'aviso' && <AlertTriangle size={18} />}
              {alerta.tipo === 'info' && <Info size={18} />}
              {alerta.tipo === 'sucesso' && <CheckCircle size={18} />}
            </div>
            <span className="alerta-mensagem">{alerta.mensagem}</span>
          </div>
        ))}
      </div>

      {/* Linha 1: Controle Principal + Condições Ambientais */}
      <div className="grade-controle">
        {/* Controle Principal */}
        <div className="cartao-controle controle-principal">
          <div className="cabecalho-controle">
            <h2>Controle Principal</h2>
            <div className="alternador-modo">
              <span className={!modoAutomatico ? 'ativo' : ''}>Manual</span>
              <button 
                className="botao-alternador"
                onClick={() => setModoAutomatico(!modoAutomatico)}
              >
                <div className={`alternador-bolinha ${modoAutomatico ? 'ligado' : ''}`} />
              </button>
              <span className={modoAutomatico ? 'ativo' : ''}>Automático</span>
            </div>
          </div>

          <div className="exibicao-status">
            <div className="indicador-status">
              <div className={`circulo-status ${statusIrrigacao === 'ativo' ? 'ativo' : statusIrrigacao === 'pausado' ? 'pausado' : statusIrrigacao === 'agendado' ? 'agendado' : 'inativo'}`}>
                <Droplets size={32} className={statusIrrigacao === 'ativo' ? 'pulse' : ''} />
              </div>
              <div className="texto-status">
                <span className="rotulo-status">Status Atual</span>
                <span className="valor-status">
                  {statusIrrigacao === 'ativo' ? 'Irrigando' : 
                   statusIrrigacao === 'pausado' ? 'Pausado' : 
                   statusIrrigacao === 'agendado' ? 'Agendado' : 'Inativo'}
                </span>
              </div>
            </div>

            <div className="botoes-controle">
              <button 
                className="btn-controle btn-iniciar"
                onClick={() => iniciarIrrigacao()}
                disabled={statusIrrigacao === 'ativo'}
              >
                <Play size={18} />
                Iniciar
              </button>
              <button 
                className="btn-controle btn-pausar"
                onClick={pausarIrrigacao}
                disabled={statusIrrigacao !== 'ativo'}
              >
                <Pause size={18} />
                Pausar
              </button>
              <button 
                className="btn-controle btn-parar"
                onClick={pararIrrigacao}
                disabled={statusIrrigacao === 'inativo'}
              >
                <RefreshCw size={18} />
                Parar
              </button>
            </div>
          </div>

          <div className="estatisticas-rapidas">
            <div className="item-estatistica">
              <Droplets size={20} />
              <span className="rotulo-estatistica">Zonas Ativas</span>
              <span className="valor-estatistica">{zonasAtivasContagem}/4</span>
            </div>
            <div className="item-estatistica">
              <Gauge size={20} />
              <span className="rotulo-estatistica">Umidade Média</span>
              <span className="valor-estatistica">{umidadeMedia.toFixed(0)}%</span>
            </div>
            <div className="item-estatistica">
              <Activity size={20} />
              <span className="rotulo-estatistica">Consumo Hoje</span>
              <span className="valor-estatistica">{consumoDiarioTotal.toFixed(1)}L</span>
            </div>
          </div>
        </div>

        {/* Condições Ambientais */}
        <div className="cartao-controle cartao-ambiente">
          <h3>Condições Ambientais</h3>
          <div className="grade-ambiente">
            <div className="item-ambiente">
              <div className="icone-ambiente temp">
                <Thermometer size={20} />
              </div>
              <div className="dados-ambiente">
                <span className="valor-ambiente">{climaAtual.temperatura}°C</span>
                <span className="rotulo-ambiente">Temperatura</span>
              </div>
            </div>
            <div className="item-ambiente">
              <div className="icone-ambiente umidade">
                <Droplets size={20} />
              </div>
              <div className="dados-ambiente">
                <span className="valor-ambiente">{climaAtual.umidade}%</span>
                <span className="rotulo-ambiente">Umidade do Ar</span>
              </div>
            </div>
            <div className="item-ambiente">
              <div className="icone-ambiente vento">
                <Wind size={20} />
              </div>
              <div className="dados-ambiente">
                <span className="valor-ambiente">{climaAtual.vento} km/h</span>
                <span className="rotulo-ambiente">Vento</span>
              </div>
            </div>
            <div className="item-ambiente">
              <div className="icone-ambiente sol">
                <Sun size={20} />
              </div>
              <div className="dados-ambiente">
                <span className="valor-ambiente">Alto</span>
                <span className="rotulo-ambiente">Índice UV</span>
              </div>
            </div>
          </div>
          <div className="previsao-clima">
            <CloudRain size={16} />
            <span>{climaAtual.previsao}</span>
          </div>
        </div>
      </div>

      {/* Linha 2: Status de Zonas (largura completa) */}
      <div className="grade-status-zonas">
        <div className="cartao-controle">
          <div className="cabecalho-controle">
            <h2>Status de Zonas</h2>
            <select 
              className="seletor-zona"
              value={zonasSelecionada}
              onChange={(e) => setZonaSelecionada(e.target.value)}
            >
              <option value="todas">Todas as Zonas</option>
              {zonas.map(zona => (
                <option key={zona.id} value={zona.id}>{zona.nome}</option>
              ))}
            </select>
          </div>

          <div className="grade-zonas">
            {zonas.map(zona => (
              <div key={zona.id} className="cartao-zona">
                <div className="titulo-zona">
                  <h4>{zona.nome}</h4>
                  {obterIconeStatus(zona.status)}
                </div>
                
                <div className="info-zona">
                  <div className="metrica-zona">
                    <Droplets size={16} />
                    <span>{zona.umidade}%</span>
                    <span className="rotulo-metrica">Umidade</span>
                  </div>
                  <div className={`indicador-saude ${obterClasseSaude(zona.saude)}`}>
                    {zona.saude === 'excelente' ? 'Excelente' :
                     zona.saude === 'bom' ? 'Bom' :
                     zona.saude === 'atencao' ? 'Atenção' : 'Crítico'}
                  </div>
                </div>

                <div className="programacao-zona">
                  <div className="item-programacao">
                    <Clock size={14} />
                    <span>Última: {zona.ultimaIrrigacao}</span>
                  </div>
                  <div className="item-programacao">
                    <Calendar size={14} />
                    <span>Próxima: {zona.proximaIrrigacao}</span>
                  </div>
                </div>

                <div className="acoes-zona">
                  <button 
                    className="btn-acao-zona btn-acao-irrigar"
                    onClick={() => iniciarIrrigacao(zona.id)}
                    disabled={zona.status === 'ativo'}
                  >
                    <Play size={14} />
                    Irrigar Agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programações */}
      <div className="cartao-programacoes">
        <div className="cabecalho-cartao">
          <h3>Programações de Irrigação</h3>
          <button className="btn-adicionar-programacao">
            <Calendar size={16} />
            Nova Programação
          </button>
        </div>

        <div className="lista-programacoes">
          {programacoes.map(programacao => (
            <div key={programacao.id} className={`item-programacao ${programacao.ativo ? 'ativo' : ''}`}>
              <div className="info-programacao">
                <div className="principal-programacao">
                  <h4>{programacao.nome}</h4>
                  <div className="horario-programacao">
                    <Clock size={16} />
                    <span>{programacao.horario}</span>
                  </div>
                </div>
                <div className="detalhes-programacao">
                  <span className="zonas-programacao">
                    Zonas: {programacao.zonas.map(z => zonas.find(zona => zona.id === z)?.nome.split(' - ')[1]).join(', ')}
                  </span>
                  <span className="dias-programacao">
                    {programacao.dias.join(', ')}
                  </span>
                </div>
              </div>
              <div className="acoes-programacao">
                <button 
                  className={`btn-alternar ${programacao.ativo ? 'ativo' : ''}`}
                  onClick={() => alternarProgramacao(programacao.id)}
                >
                  {programacao.ativo ? 'Ativo' : 'Inativo'}
                </button>
                <button className="btn-editar">
                  <Settings size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Histórico e Análise */}
      <div className="grade-historico-analise">
        <div className="cartao-historico">
          <div className="cabecalho-cartao">
            <h3>Histórico Recente</h3>
            <button className="btn-ver-tudo">Ver tudo</button>
          </div>
          <div className="lista-historico">
            {historicoRecente.map((item, index) => (
              <div key={index} className="item-historico">
                <div className="horario-historico">
                  <Clock size={14} />
                  <span>{item.horario}</span>
                </div>
                <div className="detalhes-historico">
                  <span className="zona-historico">{item.zona}</span>
                  <div className="metricas-historico">
                    <span>{item.duracao}</span>
                    <span>•</span>
                    <span>{item.volume}</span>
                  </div>
                </div>
                <div className={`status-historico ${item.status}`}>
                  {item.status === 'completo' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cartao-analise">
          <div className="cabecalho-cartao">
            <h3>Análise de Consumo</h3>
            <select className="seletor-periodo">
              <option>Últimos 7 dias</option>
              <option>Último mês</option>
              <option>Último ano</option>
            </select>
          </div>
          <div className="estatisticas-consumo">
            <div className="caixa-estatistica">
              <div className="icone-estatistica agua">
                <Droplets size={24} />
              </div>
              <div className="info-estatistica">
                <span className="rotulo-estatistica">Consumo Total</span>
                <span className="valor-estatistica">348.5L</span>
                <span className="tendencia-estatistica positiva">
                  <TrendingUp size={14} />
                  -12% vs semana anterior
                </span>
              </div>
            </div>
            <div className="caixa-estatistica">
              <div className="icone-estatistica eficiencia">
                <Zap size={24} />
              </div>
              <div className="info-estatistica">
                <span className="rotulo-estatistica">Eficiência</span>
                <span className="valor-estatistica">87%</span>
                <span className="tendencia-estatistica positiva">
                  <TrendingUp size={14} />
                  +5% de melhoria
                </span>
              </div>
            </div>
            <div className="caixa-estatistica">
              <div className="icone-estatistica tempo">
                <Timer size={24} />
              </div>
              <div className="info-estatistica">
                <span className="rotulo-estatistica">Tempo Total</span>
                <span className="valor-estatistica">12h 45min</span>
                <span className="tendencia-estatistica neutra">
                  Dentro do esperado
                </span>
              </div>
            </div>
          </div>
          <div className="grafico-consumo">
            <div className="placeholder-grafico">
              <Activity size={32} />
              <span>Gráfico de Consumo Semanal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Configurações Avançadas (Expansível) */}
      <div className="configuracoes-avancadas">
        <button 
          className="alternador-avancado"
          onClick={() => setMostrarConfiguracoesAvancadas(!mostrarConfiguracoesAvancadas)}
        >
          <Settings size={20} />
          <span>Configurações Avançadas</span>
          {mostrarConfiguracoesAvancadas ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {mostrarConfiguracoesAvancadas && (
          <div className="painel-avancado">
            <div className="grade-avancada">
              <div className="secao-avancada">
                <h4>Parâmetros de Solo</h4>
                <div className="lista-parametros">
                  <div className="item-parametro">
                    <label>Tipo de Solo</label>
                    <select>
                      <option>Argiloso</option>
                      <option>Arenoso</option>
                      <option>Misto</option>
                    </select>
                  </div>
                  <div className="item-parametro">
                    <label>Capacidade de Campo (%)</label>
                    <input type="number" defaultValue="35" />
                  </div>
                  <div className="item-parametro">
                    <label>Ponto de Murcha (%)</label>
                    <input type="number" defaultValue="15" />
                  </div>
                </div>
              </div>

              <div className="secao-avancada">
                <h4>Algoritmos de Otimização</h4>
                <div className="lista-algoritmos">
                  <label className="item-algoritmo">
                    <input type="checkbox" defaultChecked />
                    <span>Previsão Meteorológica</span>
                  </label>
                  <label className="item-algoritmo">
                    <input type="checkbox" defaultChecked />
                    <span>Aprendizado de Padrões</span>
                  </label>
                  <label className="item-algoritmo">
                    <input type="checkbox" />
                    <span>Modo Noturno Adaptativo</span>
                  </label>
                  <label className="item-algoritmo">
                    <input type="checkbox" defaultChecked />
                    <span>Distribuição por Prioridade</span>
                  </label>
                </div>
              </div>

              <div className="secao-avancada">
                <h4>Limites e Alertas</h4>
                <div className="lista-limites">
                  <div className="item-limite">
                    <label>Consumo Máximo Diário (L)</label>
                    <input type="number" defaultValue="500" />
                  </div>
                  <div className="item-limite">
                    <label>Alerta de Umidade Baixa (%)</label>
                    <input type="number" defaultValue="25" />
                  </div>
                  <div className="item-limite">
                    <label>Alerta de Temperatura (°C)</label>
                    <input type="number" defaultValue="35" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Irrigacao;