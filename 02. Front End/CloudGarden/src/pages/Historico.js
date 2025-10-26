import React, { useState, useEffect } from 'react';
import { 
  Calendar, Download, Filter, TrendingUp, Droplets, 
  Thermometer, Sun, Activity, Clock, ChevronDown,
  BarChart3, LineChart, FileDown, Search, AlertCircle,
  Zap, Leaf, Wind, CloudRain, Info, CheckCircle,
  Play, Pause, XCircle, Settings, Target, Database,
  Eye, Gauge, Timer, RefreshCw, Bell, AlertTriangle,
  Lightbulb, MapPin, TrendingDown, ChevronUp, ArrowUp,
  ArrowDown, Users, Award
} from 'lucide-react';

import Layout from '../components/Layout';
import '../styles/historico.css';

const Historico = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('timeline'); // timeline, graph, table
  const [selectedCategory, setSelectedCategory] = useState('todos'); // todos, irrigacao, sensores, alertas, sistema

  // Gerar dados históricos de sensores
  const generateHistoricalData = (days) => {
    const data = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      const baseTemp = 22 + Math.sin(i / 3) * 5;
      const baseHumidity = 60 + Math.cos(i / 2) * 20;
      
      for (let hour = 0; hour < 24; hour += 4) {
        data.push({
          date: new Date(date.setHours(hour)),
          temperature: baseTemp + Math.random() * 3 - 1.5,
          humidity: Math.max(20, Math.min(90, baseHumidity + Math.random() * 10 - 5)),
          light: Math.max(0, Math.sin((hour - 6) / 12 * Math.PI) * 100),
          soilMoisture: Math.max(30, Math.min(80, 55 + Math.random() * 20 - 10)),
          ph: 6.5 + Math.random() * 0.5 - 0.25,
          nutrients: Math.max(20, Math.min(80, 50 + Math.random() * 15 - 7.5))
        });
      }
    }
    
    return data;
  };

  const [historicalData, setHistoricalData] = useState(() => generateHistoricalData(7));

  // Histórico completo de irrigação (prioridade máxima conforme solicitado)
  const [historicoIrrigacao] = useState([
    {
      id: 1,
      tipo: 'irrigacao',
      zona: 'Zona A - Hortaliças',
      horario: '2025-10-25T10:30:00',
      duracao: 12,
      volume: 30,
      status: 'completo',
      modo: 'automatico',
      umidadeAntes: 35,
      umidadeDepois: 68,
      temperatura: 24,
      observacao: 'Irrigação automática realizada com sucesso'
    },
    {
      id: 2,
      tipo: 'irrigacao',
      zona: 'Zona B - Temperos',
      horario: '2025-10-25T09:15:00',
      duracao: 8,
      volume: 20,
      status: 'completo',
      modo: 'automatico',
      umidadeAntes: 32,
      umidadeDepois: 58,
      temperatura: 23,
      observacao: 'Ciclo regular completado'
    },
    {
      id: 3,
      tipo: 'irrigacao',
      zona: 'Zona C - Frutas',
      horario: '2025-10-25T08:00:00',
      duracao: 15,
      volume: 37.5,
      status: 'interrompido',
      modo: 'manual',
      umidadeAntes: 28,
      umidadeDepois: 45,
      temperatura: 25,
      observacao: 'Interrompido pelo usuário - ajuste manual'
    },
    {
      id: 4,
      tipo: 'irrigacao',
      zona: 'Zona D - Folhosas',
      horario: '2025-10-25T06:45:00',
      duracao: 10,
      volume: 25,
      status: 'completo',
      modo: 'automatico',
      umidadeAntes: 25,
      umidadeDepois: 52,
      temperatura: 26,
      observacao: 'Irrigação emergencial ativada por baixa umidade'
    },
    {
      id: 5,
      tipo: 'irrigacao',
      zona: 'Zona A - Hortaliças',
      horario: '2025-10-24T18:30:00',
      duracao: 12,
      volume: 30,
      status: 'completo',
      modo: 'automatico',
      umidadeAntes: 38,
      umidadeDepois: 65,
      temperatura: 22,
      observacao: 'Irrigação noturna programada'
    },
    {
      id: 6,
      tipo: 'irrigacao',
      zona: 'Zona B - Temperos',
      horario: '2025-10-24T15:00:00',
      duracao: 9,
      volume: 22.5,
      status: 'completo',
      modo: 'automatico',
      umidadeAntes: 34,
      umidadeDepois: 60,
      temperatura: 28,
      observacao: 'Irrigação com compensação por temperatura elevada'
    },
    {
      id: 7,
      tipo: 'irrigacao',
      zona: 'Zona C - Frutas',
      horario: '2025-10-24T12:30:00',
      duracao: 14,
      volume: 35,
      status: 'completo',
      modo: 'automatico',
      umidadeAntes: 30,
      umidadeDepois: 62,
      temperatura: 24,
      observacao: 'Ciclo regular'
    },
    {
      id: 8,
      tipo: 'irrigacao',
      zona: 'Zona A - Hortaliças',
      horario: '2025-10-24T06:00:00',
      duracao: 11,
      volume: 27.5,
      status: 'completo',
      modo: 'programado',
      umidadeAntes: 36,
      umidadeDepois: 64,
      temperatura: 21,
      observacao: 'Primeira irrigação do dia - horário otimizado'
    },
    {
      id: 9,
      tipo: 'irrigacao',
      zona: 'Zona D - Folhosas',
      horario: '2025-10-23T19:15:00',
      duracao: 10,
      volume: 25,
      status: 'completo',
      modo: 'automatico',
      umidadeAntes: 28,
      umidadeDepois: 55,
      temperatura: 23,
      observacao: 'Irrigação compensatória'
    },
    {
      id: 10,
      tipo: 'irrigacao',
      zona: 'Todas as zonas',
      horario: '2025-10-23T14:00:00',
      duracao: 45,
      volume: 112.5,
      status: 'completo',
      modo: 'manual',
      umidadeAntes: 32,
      umidadeDepois: 65,
      temperatura: 26,
      observacao: 'Irrigação geral manual - manutenção do sistema'
    }
  ]);

  // Histórico de alertas e eventos do sistema
  const [historicoAlertas] = useState([
    {
      id: 11,
      tipo: 'alerta',
      categoria: 'critico',
      titulo: 'Umidade Crítica Detectada',
      zona: 'Zona D',
      horario: '2025-10-25T14:30:00',
      descricao: 'Zona D com umidade de 28%, abaixo do limite crítico',
      acao: 'Irrigação emergencial ativada',
      status: 'resolvido'
    },
    {
      id: 12,
      tipo: 'alerta',
      categoria: 'aviso',
      titulo: 'Temperatura Elevada',
      zona: 'Geral',
      horario: '2025-10-25T13:15:00',
      descricao: 'Temperatura atingiu 32°C na horta',
      acao: 'Frequência de irrigação ajustada',
      status: 'em_monitoramento'
    },
    {
      id: 13,
      tipo: 'alerta',
      categoria: 'info',
      titulo: 'Previsão de Chuva',
      zona: 'Geral',
      horario: '2025-10-25T12:00:00',
      descricao: 'Previsão de 15mm de chuva para amanhã',
      acao: 'Programação ajustada automaticamente',
      status: 'aplicado'
    },
    {
      id: 14,
      tipo: 'alerta',
      categoria: 'critico',
      titulo: 'Falha no Sensor de Luz',
      zona: 'Zona B',
      horario: '2025-10-25T09:45:00',
      descricao: 'Sensor não está respondendo',
      acao: 'Verificação técnica necessária',
      status: 'pendente'
    },
    {
      id: 15,
      tipo: 'alerta',
      categoria: 'aviso',
      titulo: 'Nutrientes Baixos',
      zona: 'Zona A',
      horario: '2025-10-25T08:20:00',
      descricao: 'Nível de nutrientes em 35%',
      acao: 'Aplicação de fertilizante recomendada',
      status: 'pendente'
    }
  ]);

  // Eventos do sistema
  const [eventosSistema] = useState([
    {
      id: 21,
      tipo: 'sistema',
      categoria: 'manutencao',
      titulo: 'Manutenção Preventiva Programada',
      horario: '2025-10-25T07:00:00',
      descricao: 'Sistema atingiu 1000h de operação',
      detalhes: 'Verificação de filtros, válvulas e conexões recomendada'
    },
    {
      id: 22,
      tipo: 'sistema',
      categoria: 'atualizacao',
      titulo: 'Firmware Atualizado',
      horario: '2025-10-24T20:00:00',
      descricao: 'Sistema atualizado para versão 2.3.1',
      detalhes: 'Melhorias de eficiência e novos recursos disponíveis'
    },
    {
      id: 23,
      tipo: 'sistema',
      categoria: 'economia',
      titulo: 'Meta de Economia Atingida',
      horario: '2025-10-24T18:00:00',
      descricao: 'Economia de 18% de água esta semana',
      detalhes: 'Comparado à semana anterior'
    },
    {
      id: 24,
      tipo: 'sistema',
      categoria: 'conquista',
      titulo: 'Missão Sustentável Concluída',
      horario: '2025-10-24T16:00:00',
      descricao: 'Umidade mantida acima de 80% por 7 dias',
      detalhes: '+50 pontos adicionados'
    }
  ]);

  // Eventos de crescimento e evolução
  const [eventosCrescimento] = useState([
    {
      id: 31,
      tipo: 'crescimento',
      planta: 'Tomate',
      zona: 'Zona A',
      horario: '2025-10-25T08:00:00',
      medida: '+12cm',
      saude: 95,
      observacao: 'Crescimento acelerado - condições ideais'
    },
    {
      id: 32,
      tipo: 'crescimento',
      planta: 'Alface',
      zona: 'Zona A',
      horario: '2025-10-25T08:00:00',
      medida: '+8cm',
      saude: 88,
      observacao: 'Desenvolvimento saudável'
    },
    {
      id: 33,
      tipo: 'colheita',
      planta: 'Tomate',
      zona: 'Zona A',
      horario: '2025-10-23T10:00:00',
      quantidade: '2.5kg',
      qualidade: 'Excelente',
      observacao: 'Primeira colheita da temporada'
    }
  ]);

  // Combinar todos os eventos
  const todosEventos = [
    ...historicoIrrigacao,
    ...historicoAlertas,
    ...eventosSistema,
    ...eventosCrescimento
  ].sort((a, b) => new Date(b.horario) - new Date(a.horario));

  // Estatísticas do período
  const calculateStats = () => {
    if (historicalData.length === 0) return {};
    
    const temps = historicalData.map(d => d.temperature);
    const humidities = historicalData.map(d => d.humidity);
    const soilMoistures = historicalData.map(d => d.soilMoisture);
    
    const irrigacoesCompletas = historicoIrrigacao.filter(i => i.status === 'completo').length;
    const volumeTotal = historicoIrrigacao.reduce((acc, i) => acc + i.volume, 0);
    const duracaoTotal = historicoIrrigacao.reduce((acc, i) => acc + i.duracao, 0);
    
    return {
      avgTemp: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
      maxTemp: Math.max(...temps).toFixed(1),
      minTemp: Math.min(...temps).toFixed(1),
      avgHumidity: (humidities.reduce((a, b) => a + b, 0) / humidities.length).toFixed(0),
      avgSoilMoisture: (soilMoistures.reduce((a, b) => a + b, 0) / soilMoistures.length).toFixed(0),
      totalIrrigacoes: historicoIrrigacao.length,
      irrigacoesCompletas: irrigacoesCompletas,
      volumeTotal: volumeTotal.toFixed(1),
      duracaoTotal: Math.floor(duracaoTotal / 60) + 'h ' + (duracaoTotal % 60) + 'min',
      alertasCriticos: historicoAlertas.filter(a => a.categoria === 'critico').length,
      alertasTotal: historicoAlertas.length
    };
  };

  const stats = calculateStats();

  useEffect(() => {
    const days = selectedPeriod === '24h' ? 1 : 
                 selectedPeriod === '7d' ? 7 : 
                 selectedPeriod === '30d' ? 30 : 90;
    setHistoricalData(generateHistoricalData(days));
  }, [selectedPeriod]);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const formatDateFull = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const exportData = (format) => {
    console.log(`Exportando dados em formato ${format}`);
    alert(`Exportação em ${format.toUpperCase()} iniciada! Os dados serão baixados em breve.`);
  };

  const getFilteredEvents = () => {
    let filtered = todosEventos;

    // Filtrar por categoria
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(event => event.tipo === selectedCategory);
    }

    // Filtrar por busca
    if (searchTerm) {
      filtered = filtered.filter(event => {
        const searchLower = searchTerm.toLowerCase();
        return (
          (event.titulo?.toLowerCase().includes(searchLower)) ||
          (event.zona?.toLowerCase().includes(searchLower)) ||
          (event.descricao?.toLowerCase().includes(searchLower)) ||
          (event.planta?.toLowerCase().includes(searchLower)) ||
          (event.observacao?.toLowerCase().includes(searchLower))
        );
      });
    }

    return filtered;
  };

  const filteredEvents = getFilteredEvents();

  // Preparar dados para o gráfico
  const prepareChartData = () => {
    const grouped = {};
    
    historicalData.forEach(point => {
      const key = point.date.toLocaleDateString('pt-BR');
      if (!grouped[key]) {
        grouped[key] = {
          date: key,
          temperature: [],
          humidity: [],
          soilMoisture: [],
          light: []
        };
      }
      grouped[key].temperature.push(point.temperature);
      grouped[key].humidity.push(point.humidity);
      grouped[key].soilMoisture.push(point.soilMoisture);
      grouped[key].light.push(point.light);
    });
    
    return Object.values(grouped).map(day => ({
      ...day,
      temperature: day.temperature.reduce((a, b) => a + b, 0) / day.temperature.length,
      humidity: day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length,
      soilMoisture: day.soilMoisture.reduce((a, b) => a + b, 0) / day.soilMoisture.length,
      light: day.light.reduce((a, b) => a + b, 0) / day.light.length
    }));
  };

  const chartData = prepareChartData();

  // Obter ícone para cada tipo de evento
  const getEventIcon = (tipo, categoria) => {
    switch (tipo) {
      case 'irrigacao':
        return <Droplets size={20} />;
      case 'alerta':
        if (categoria === 'critico') return <AlertTriangle size={20} />;
        if (categoria === 'aviso') return <AlertCircle size={20} />;
        return <Info size={20} />;
      case 'sistema':
        if (categoria === 'manutencao') return <Settings size={20} />;
        if (categoria === 'atualizacao') return <RefreshCw size={20} />;
        if (categoria === 'economia') return <TrendingUp size={20} />;
        if (categoria === 'conquista') return <Award size={20} />;
        return <Activity size={20} />;
      case 'crescimento':
        return <Leaf size={20} />;
      case 'colheita':
        return <Target size={20} />;
      default:
        return <Activity size={20} />;
    }
  };

  // Obter classe CSS para cada tipo
  const getEventClass = (tipo, categoria, status) => {
    if (tipo === 'irrigacao') {
      if (status === 'completo') return 'success';
      if (status === 'interrompido') return 'warning';
      return 'info';
    }
    if (tipo === 'alerta') {
      if (categoria === 'critico') return 'danger';
      if (categoria === 'aviso') return 'warning';
      return 'info';
    }
    if (tipo === 'sistema') {
      if (categoria === 'economia' || categoria === 'conquista') return 'success';
      return 'info';
    }
    if (tipo === 'crescimento' || tipo === 'colheita') return 'success';
    return 'info';
  };

  const categorias = [
    { id: 'todos', label: 'Todos', icon: Activity, count: todosEventos.length },
    { id: 'irrigacao', label: 'Irrigação', icon: Droplets, count: historicoIrrigacao.length },
    { id: 'alerta', label: 'Alertas', icon: Bell, count: historicoAlertas.length },
    { id: 'sistema', label: 'Sistema', icon: Settings, count: eventosSistema.length },
    { id: 'crescimento', label: 'Crescimento', icon: Leaf, count: eventosCrescimento.filter(e => e.tipo === 'crescimento').length },
    { id: 'colheita', label: 'Colheitas', icon: Target, count: eventosCrescimento.filter(e => e.tipo === 'colheita').length }
  ];

  return (
    <Layout 
      pageTitle="Histórico Completo" 
      pageSubtitle="Análise detalhada de todos os eventos, irrigações e dados da sua horta"
      activeMenuItem="Histórico"
    >
      <div className="historico-container">
        {/* Header com Controles */}
        <div className="historico-header">
          <div className="header-controls">
            <div className="period-selector">
              <button 
                className={`period-btn ${selectedPeriod === '24h' ? 'active' : ''}`}
                onClick={() => setSelectedPeriod('24h')}
              >
                24h
              </button>
              <button 
                className={`period-btn ${selectedPeriod === '7d' ? 'active' : ''}`}
                onClick={() => setSelectedPeriod('7d')}
              >
                7 dias
              </button>
              <button 
                className={`period-btn ${selectedPeriod === '30d' ? 'active' : ''}`}
                onClick={() => setSelectedPeriod('30d')}
              >
                30 dias
              </button>
              <button 
                className={`period-btn ${selectedPeriod === '90d' ? 'active' : ''}`}
                onClick={() => setSelectedPeriod('90d')}
              >
                3 meses
              </button>
            </div>
            
            <div className="view-controls">
              <button 
                className={`view-btn ${viewMode === 'timeline' ? 'active' : ''}`}
                onClick={() => setViewMode('timeline')}
                title="Visualização em linha do tempo"
              >
                <Clock size={18} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'graph' ? 'active' : ''}`}
                onClick={() => setViewMode('graph')}
                title="Visualização em gráfico"
              >
                <LineChart size={18} />
              </button>
              <button 
                className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                title="Visualização em tabela"
              >
                <BarChart3 size={18} />
              </button>
            </div>
          </div>

          <div className="action-controls">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Buscar nos eventos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              className="filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filtros
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <div className="export-dropdown">
              <button className="export-btn">
                <Download size={18} />
                Exportar
                <ChevronDown size={16} />
              </button>
              <div className="export-menu">
                <button onClick={() => exportData('csv')}>
                  <FileDown size={16} />
                  Exportar CSV
                </button>
                <button onClick={() => exportData('excel')}>
                  <FileDown size={16} />
                  Exportar Excel
                </button>
                <button onClick={() => exportData('pdf')}>
                  <FileDown size={16} />
                  Exportar PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas em Destaque */}
        <div className="stats-dashboard">
          <div className="stat-card primary">
            <div className="stat-icon irrigacao">
              <Droplets size={28} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Total de Irrigações</span>
              <span className="stat-value">{stats.totalIrrigacoes}</span>
              <span className="stat-detail">{stats.irrigacoesCompletas} completas</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon agua">
              <Database size={28} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Volume Total</span>
              <span className="stat-value">{stats.volumeTotal}L</span>
              <span className="stat-detail">{stats.duracaoTotal}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon temp">
              <Thermometer size={28} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Temperatura Média</span>
              <span className="stat-value">{stats.avgTemp}°C</span>
              <span className="stat-detail">Min: {stats.minTemp}°C | Max: {stats.maxTemp}°C</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon umidade">
              <CloudRain size={28} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Umidade do Solo</span>
              <span className="stat-value">{stats.avgSoilMoisture}%</span>
              <span className="stat-detail">Média do período</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon alerta">
              <Bell size={28} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Alertas</span>
              <span className="stat-value">{stats.alertasTotal}</span>
              <span className="stat-detail">{stats.alertasCriticos} críticos</span>
            </div>
          </div>
        </div>

        {/* Filtros por Categoria */}
        <div className="category-filters">
          {categorias.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <cat.icon size={18} />
              <span>{cat.label}</span>
              <span className="badge-count">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Conteúdo Principal baseado no modo de visualização */}
        {viewMode === 'timeline' && (
          <div className="timeline-view">
            <div className="timeline-header">
              <h3>
                <Clock size={20} />
                Linha do Tempo Completa
              </h3>
              <span className="event-count">{filteredEvents.length} eventos</span>
            </div>

            <div className="timeline-container">
              {filteredEvents.length === 0 ? (
                <div className="empty-state">
                  <Activity size={64} className="empty-icon" />
                  <h3>Nenhum evento encontrado</h3>
                  <p>Não há eventos correspondentes aos filtros aplicados.</p>
                </div>
              ) : (
                filteredEvents.map((event, index) => (
                  <div 
                    key={event.id} 
                    className={`timeline-event ${getEventClass(event.tipo, event.categoria, event.status)}`}
                  >
                    <div className="timeline-marker">
                      <div className="marker-icon">
                        {getEventIcon(event.tipo, event.categoria)}
                      </div>
                      {index < filteredEvents.length - 1 && <div className="timeline-line" />}
                    </div>

                    <div className="timeline-content">
                      <div className="event-header">
                        <div className="event-main-info">
                          <h4>{event.titulo || event.zona}</h4>
                          <div className="event-meta">
                            <span className="event-time">
                              <Clock size={14} />
                              {formatDate(event.horario)}
                            </span>
                            {event.zona && (
                              <span className="event-zone">
                                <MapPin size={14} />
                                {event.zona}
                              </span>
                            )}
                            <span className={`event-badge ${event.tipo}`}>
                              {event.tipo === 'irrigacao' ? 'Irrigação' :
                               event.tipo === 'alerta' ? 'Alerta' :
                               event.tipo === 'sistema' ? 'Sistema' :
                               event.tipo === 'crescimento' ? 'Crescimento' : 'Colheita'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="event-details">
                        {/* Detalhes específicos de Irrigação */}
                        {event.tipo === 'irrigacao' && (
                          <div className="irrigation-details">
                            <div className="detail-grid">
                              <div className="detail-item">
                                <Timer size={16} />
                                <span><strong>Duração:</strong> {event.duracao} min</span>
                              </div>
                              <div className="detail-item">
                                <Droplets size={16} />
                                <span><strong>Volume:</strong> {event.volume}L</span>
                              </div>
                              <div className="detail-item">
                                <Gauge size={16} />
                                <span><strong>Modo:</strong> {event.modo}</span>
                              </div>
                              <div className="detail-item">
                                {event.status === 'completo' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                <span><strong>Status:</strong> {event.status}</span>
                              </div>
                            </div>
                            <div className="humidity-change">
                              <span>Umidade: {event.umidadeAntes}%</span>
                              <ArrowUp size={16} className="arrow-success" />
                              <span className="after">{event.umidadeDepois}%</span>
                              <span className="change success">+{event.umidadeDepois - event.umidadeAntes}%</span>
                            </div>
                            {event.observacao && (
                              <div className="observation">
                                <Info size={14} />
                                <span>{event.observacao}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Detalhes específicos de Alertas */}
                        {event.tipo === 'alerta' && (
                          <div className="alert-details">
                            <p className="alert-description">{event.descricao}</p>
                            <div className="alert-action">
                              <Zap size={16} />
                              <span><strong>Ação:</strong> {event.acao}</span>
                            </div>
                            <div className={`alert-status ${event.status}`}>
                              <span>{event.status === 'resolvido' ? 'Resolvido' :
                                     event.status === 'em_monitoramento' ? 'Em Monitoramento' :
                                     event.status === 'aplicado' ? 'Aplicado' : 'Pendente'}</span>
                            </div>
                          </div>
                        )}

                        {/* Detalhes específicos de Sistema */}
                        {event.tipo === 'sistema' && (
                          <div className="system-details">
                            <p>{event.descricao}</p>
                            {event.detalhes && (
                              <div className="system-info">
                                <Info size={14} />
                                <span>{event.detalhes}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Detalhes específicos de Crescimento */}
                        {(event.tipo === 'crescimento' || event.tipo === 'colheita') && (
                          <div className="growth-details">
                            <div className="detail-grid">
                              <div className="detail-item">
                                <Leaf size={16} />
                                <span><strong>Planta:</strong> {event.planta}</span>
                              </div>
                              {event.medida && (
                                <div className="detail-item success">
                                  <TrendingUp size={16} />
                                  <span><strong>Medida:</strong> {event.medida}</span>
                                </div>
                              )}
                              {event.saude && (
                                <div className="detail-item">
                                  <Activity size={16} />
                                  <span><strong>Saúde:</strong> {event.saude}%</span>
                                </div>
                              )}
                              {event.quantidade && (
                                <div className="detail-item">
                                  <Target size={16} />
                                  <span><strong>Quantidade:</strong> {event.quantidade}</span>
                                </div>
                              )}
                              {event.qualidade && (
                                <div className="detail-item">
                                  <Award size={16} />
                                  <span><strong>Qualidade:</strong> {event.qualidade}</span>
                                </div>
                              )}
                            </div>
                            {event.observacao && (
                              <div className="observation">
                                <Info size={14} />
                                <span>{event.observacao}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {viewMode === 'graph' && (
          <div className="graph-view">
            <h3>Métricas dos Sensores</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-header">
                  <Thermometer size={20} className="metric-icon temp" />
                  <span>Temperatura</span>
                </div>
                <div className="metric-chart">
                  <svg viewBox="0 0 200 80">
                    <path
                      d={`M 0 ${80 - (chartData[0]?.temperature || 0) * 2} ${chartData.map((d, i) => `L ${(200 / chartData.length) * i} ${80 - d.temperature * 2}`).join(' ')}`}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="metric-footer">
                  <span className="current">{stats.avgTemp}°C</span>
                  <span className="range">Min: {stats.minTemp}°C | Max: {stats.maxTemp}°C</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <CloudRain size={20} className="metric-icon humid" />
                  <span>Umidade do Ar</span>
                </div>
                <div className="metric-chart">
                  <svg viewBox="0 0 200 80">
                    <path
                      d={`M 0 ${80 - (chartData[0]?.humidity || 0) * 0.8} ${chartData.map((d, i) => `L ${(200 / chartData.length) * i} ${80 - d.humidity * 0.8}`).join(' ')}`}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="metric-footer">
                  <span className="current">{stats.avgHumidity}%</span>
                  <span className="status optimal">Ideal</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <Droplets size={20} className="metric-icon soil" />
                  <span>Umidade do Solo</span>
                </div>
                <div className="metric-chart">
                  <svg viewBox="0 0 200 80">
                    <path
                      d={`M 0 ${80 - (chartData[0]?.soilMoisture || 0) * 0.8} ${chartData.map((d, i) => `L ${(200 / chartData.length) * i} ${80 - d.soilMoisture * 0.8}`).join(' ')}`}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="metric-footer">
                  <span className="current">{stats.avgSoilMoisture}%</span>
                  <span className="status optimal">Ótimo</span>
                </div>
              </div>

              <div className="metric-card">
                <div className="metric-header">
                  <Sun size={20} className="metric-icon light" />
                  <span>Luminosidade</span>
                </div>
                <div className="metric-chart">
                  <svg viewBox="0 0 200 80">
                    <path
                      d={`M 0 ${80 - (chartData[0]?.light || 0) * 0.8} ${chartData.map((d, i) => `L ${(200 / chartData.length) * i} ${80 - d.light * 0.8}`).join(' ')}`}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="metric-footer">
                  <span className="current">75%</span>
                  <span className="info">Luz Solar</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'table' && (
          <div className="table-view">
            <h3>Histórico de Irrigação Detalhado</h3>
            <div className="table-container">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Data/Hora</th>
                    <th>Zona</th>
                    <th>Duração</th>
                    <th>Volume</th>
                    <th>Modo</th>
                    <th>Umidade Antes</th>
                    <th>Umidade Depois</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {historicoIrrigacao.map(item => (
                    <tr key={item.id}>
                      <td>{formatDateFull(item.horario)}</td>
                      <td>{item.zona}</td>
                      <td>{item.duracao} min</td>
                      <td>{item.volume}L</td>
                      <td><span className="badge-modo">{item.modo}</span></td>
                      <td>{item.umidadeAntes}%</td>
                      <td className="success-text">{item.umidadeDepois}%</td>
                      <td>
                        <span className={`badge-status ${item.status}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Análise Comparativa */}
        <div className="comparison-section">
          <h3>Análise Comparativa - Períodos</h3>
          <div className="comparison-grid">
            <div className="comparison-card">
              <div className="comparison-header">
                <span>Período Atual vs Anterior</span>
                <Info size={16} className="info-icon" />
              </div>
              <div className="comparison-metrics">
                <div className="metric-compare">
                  <span className="metric-name">Temperatura</span>
                  <div className="metric-change positive">
                    <TrendingUp size={16} />
                    +2.3°C
                  </div>
                </div>
                <div className="metric-compare">
                  <span className="metric-name">Umidade</span>
                  <div className="metric-change negative">
                    <TrendingDown size={16} />
                    -5%
                  </div>
                </div>
                <div className="metric-compare">
                  <span className="metric-name">Consumo de Água</span>
                  <div className="metric-change positive">
                    <TrendingUp size={16} />
                    -12%
                  </div>
                </div>
              </div>
            </div>

            <div className="efficiency-card">
              <h4>Eficiência do Sistema</h4>
              <div className="efficiency-score">
                <div className="score-circle">
                  <svg viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.85} ${2 * Math.PI * 40}`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="50" textAnchor="middle" fontSize="24" fill="#10b981" dy="8">
                      85%
                    </text>
                  </svg>
                </div>
                <div className="efficiency-details">
                  <div className="detail-item">
                    <Zap size={16} className="detail-icon" />
                    <span>Economia de 30% em água</span>
                  </div>
                  <div className="detail-item">
                    <Leaf size={16} className="detail-icon" />
                    <span>Crescimento 15% acima da média</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recomendações */}
        <div className="recommendations">
          <h3>Recomendações Baseadas no Histórico</h3>
          <div className="recommendations-grid">
            <div className="recommendation-card">
              <div className="rec-icon water">
                <Droplets size={24} />
              </div>
              <div className="rec-content">
                <h4>Ajustar Irrigação</h4>
                <p>Reduzir frequência em 20% baseado na umidade média alta dos últimos 7 dias.</p>
              </div>
            </div>
            <div className="recommendation-card">
              <div className="rec-icon nutrients">
                <Leaf size={24} />
              </div>
              <div className="rec-content">
                <h4>Adicionar Nutrientes</h4>
                <p>Níveis de nutrientes abaixo do ideal. Recomenda-se fertilização esta semana.</p>
              </div>
            </div>
            <div className="recommendation-card">
              <div className="rec-icon light">
                <Sun size={24} />
              </div>
              <div className="rec-content">
                <h4>Otimizar Luz</h4>
                <p>Considerar luz suplementar nas horas de menor incidência solar.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Historico;