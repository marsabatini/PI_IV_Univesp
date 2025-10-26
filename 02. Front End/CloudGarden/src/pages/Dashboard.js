import React, { useState } from 'react';
import { 
  Thermometer, Cloud, Sun, CloudRain, Droplets, TrendingUp, Activity, 
  Lightbulb, MapPin, Bell, AlertTriangle, CheckCircle, Info, Clock,
  Target, Zap, Leaf, ArrowUp, ArrowDown, Eye, Play
} from 'lucide-react';

import Layout from '../components/Layout';
import '../styles/dashboard.css';

const Dashboard = () => {
  // Dados mockados
  const userData = {
    city: 'Osasco'
  };

  const weatherData = {
    current: {
      temp: 23,
      condition: 'Ensolarado',
      humidity: 65,
      iconName: 'Sun'
    },
    forecast: [
      { day: 'Seg', temp: 25, iconName: 'Sun' },
      { day: 'Ter', temp: 22, iconName: 'Cloud' },
      { day: 'Qua', temp: 19, iconName: 'CloudRain' },
      { day: 'Qui', temp: 21, iconName: 'Sun' },
      { day: 'Sex', temp: 24, iconName: 'Sun' },
      { day: 'Sáb', temp: 26, iconName: 'Sun' },
      { day: 'Dom', temp: 23, iconName: 'Cloud' }
    ]
  };

  const sensorData = {
    temperature: 18,
    soilMoisture: 65,
    lightLevel: 78,
    nutrients: 42
  };

  // Dados de irrigação
  const irrigacaoData = {
    status: 'agendado',
    proximaIrrigacao: 'Hoje, 18:00',
    consumoSemanal: 340,
    metaSemanal: 450,
    ultimaIrrigacao: '30/10/2025 às 08:30'
  };

  // Alertas resumidos (3 mais recentes/importantes)
  const alertasResumo = [
    { tipo: 'critico', mensagem: 'Zona D com umidade crítica (28%)' },
    { tipo: 'aviso', mensagem: 'Temperatura elevada na horta (32°C)' },
    { tipo: 'info', mensagem: 'Previsão de chuva para amanhã' }
  ];

  // Métricas de evolução
  const metricas = [
    { label: 'Temperatura', valor: 24.8, unidade: '°C', variacao: '+2.3%', tendencia: 'alta', icon: Thermometer },
    { label: 'Umidade', valor: 68, unidade: '%', variacao: '-0.5%', tendencia: 'estavel', icon: Droplets },
    { label: 'Luminosidade', valor: 75, unidade: '%', variacao: '+8.2%', tendencia: 'alta', icon: Sun },
    { label: 'Nutrientes', valor: 82, unidade: '%', variacao: '-3.1%', tendencia: 'baixa', icon: Leaf }
  ];

  // Crescimento das plantas
  const plantasDestaque = [
    { nome: 'Tomate', crescimento: '+12cm', saude: 95 },
    { nome: 'Alface', crescimento: '+8cm', saude: 88 }
  ];

  const getWeatherIcon = (iconName) => {
    switch(iconName) {
      case 'Sun':
        return <Sun size={20} />;
      case 'Cloud':
        return <Cloud size={20} />;
      case 'CloudRain':
        return <CloudRain size={20} />;
      default:
        return <Sun size={20} />;
    }
  };

  const getAlertIcon = (tipo) => {
    switch(tipo) {
      case 'critico':
        return <AlertTriangle size={16} style={{ color: '#ef4444' }} />;
      case 'aviso':
        return <Info size={16} style={{ color: '#f59e0b' }} />;
      case 'info':
        return <CheckCircle size={16} style={{ color: '#3b82f6' }} />;
      default:
        return <Info size={16} />;
    }
  };

  const getTendenciaIcon = (tendencia) => {
    if (tendencia === 'alta') return <ArrowUp size={14} />;
    if (tendencia === 'baixa') return <ArrowDown size={14} />;
    return null;
  };

  return (
    <Layout 
      pageTitle="Dashboard" 
      pageSubtitle="Visão geral da sua horta inteligente"
      activeMenuItem="Início"
    >
        <div className="grid-container">
          {/* Weather Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Clima na cidade</h3>
              <MapPin size={18} className="icon-gray-500" />
            </div>
            <div className="weather-current">
              <div className="weather-temp-container">
                <Sun size={48} className="weather-icon-large" />
                <div>
                  <div className="temp">{weatherData.current.temp}°C</div>
                  <div className="condition">{weatherData.current.condition}</div>
                </div>
              </div>
              <div className="location">
                <MapPin size={14} className="icon-gray-500" />
                <span>{userData.city}, SP</span>
              </div>
            </div>
            <div className="forecast-grid">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="forecast-day">
                  <span className="day-abbr">{day.day}</span>
                  {getWeatherIcon(day.iconName)}
                  <span className="day-temp">{day.temp}°</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sensor Data */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Dados da Horta</h3>
              <Activity size={18} className="icon-gray-500" />
            </div>
            <div className="sensor-grid">
              <div className="sensor-item sensor-temp">
                <div className="icon-circle temp-icon-bg">
                  <Thermometer size={24} className="sensor-icon temp-icon" />
                </div>
                <div className="sensor-text">
                  <div className="sensor-label">Temperatura</div>
                  <div className="sensor-value">{sensorData.temperature}°C</div>
                </div>
              </div>
              <div className="sensor-item sensor-humidity">
                <div className="icon-circle humidity-icon-bg">
                  <Droplets size={24} className="sensor-icon humidity-icon" />
                </div>
                <div className="sensor-text">
                  <div className="sensor-label">Umidade</div>
                  <div className="sensor-value">{sensorData.soilMoisture}%</div>
                </div>
              </div>
              <div className="sensor-item sensor-light">
                <div className="icon-circle light-icon-bg">
                  <Sun size={24} className="sensor-icon light-icon" />
                </div>
                <div className="sensor-text">
                  <div className="sensor-label">Luminosidade</div>
                  <div className="sensor-value">{sensorData.lightLevel}%</div>
                </div>
              </div>
              <div className="sensor-item sensor-nutrients">
                <div className="icon-circle nutrients-icon-bg">
                  <Lightbulb size={24} className="sensor-icon nutrients-icon" />
                </div>
                <div className="sensor-text">
                  <div className="sensor-label">Nutrientes</div>
                  <div className="sensor-value">{sensorData.nutrients}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo de Irrigação */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Irrigação</h3>
              <Droplets size={18} className="icon-gray-500" />
            </div>
            <div className="irrigacao-controls">
              <div className="irrigacao-next">
                <div className="status-icon status-icon-scheduled">
                  <Droplets size={28} />
                </div>
                <div className="irrigacao-text">
                  <div className="next-label">Próxima Irrigação</div>
                  <div className="next-time">{irrigacaoData.proximaIrrigacao}</div>
                </div>
              </div>
              <div className="consumption">
                <div className="consumption-header">
                  <span className="consumption-label">Consumo Semanal</span>
                  <span className="consumption-value">{Math.round((irrigacaoData.consumoSemanal / irrigacaoData.metaSemanal) * 100)}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(irrigacaoData.consumoSemanal / irrigacaoData.metaSemanal) * 100}%` }} />
                </div>
              </div>
              <div className="last-irrigacao">
                <div className="last-label">Última irrigação</div>
                <div className="last-time">{irrigacaoData.ultimaIrrigacao}</div>
              </div>
            </div>
          </div>

          {/* Alertas Recentes */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Alertas Recentes</h3>
              <Bell size={18} className="icon-gray-500" />
            </div>
            <div className="ranking-list">
              {alertasResumo.map((alerta, index) => (
                <div key={index} className="ranking-item">
                  <div className="position-container">
                    {getAlertIcon(alerta.tipo)}
                  </div>
                  <div className="school-info" style={{ flex: 1 }}>
                    <span className="school-name" style={{ fontSize: '0.875rem' }}>{alerta.mensagem}</span>
                  </div>
                  <button className="btn-acao" style={{ padding: '0.5rem', border: 'none', background: 'transparent' }}>
                    <Eye size={16} className="icon-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Métricas de Evolução */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Evolução - Métricas</h3>
              <TrendingUp size={18} className="icon-gray-500" />
            </div>
            <div className="sensor-grid">
              {metricas.map((metrica, index) => (
                <div key={index} className="sensor-item" style={{ 
                  background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)',
                  border: '1px solid #e5e7eb'
                }}>
                  <div className="icon-circle" style={{ 
                    background: 'linear-gradient(to bottom right, #dbeafe, #bfdbfe)' 
                  }}>
                    <metrica.icon size={24} style={{ color: '#3b82f6' }} />
                  </div>
                  <div className="sensor-text">
                    <div className="sensor-label">{metrica.label}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="sensor-value">{metrica.valor}{metrica.unidade}</div>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        color: metrica.tendencia === 'alta' ? '#16a34a' : metrica.tendencia === 'baixa' ? '#dc2626' : '#6b7280',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        {getTendenciaIcon(metrica.tendencia)}
                        {metrica.variacao}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Crescimento das Plantas */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Crescimento das Plantas</h3>
              <Leaf size={18} className="icon-gray-500" />
            </div>
            <div className="ranking-list">
              {plantasDestaque.map((planta, index) => (
                <div key={index} className="ranking-item">
                  <div className="school-info">
                    <span className="school-name">{planta.nome}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ 
                      fontSize: '0.875rem',
                      color: '#16a34a',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <ArrowUp size={14} />
                      {planta.crescimento}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="progress-bar" style={{ width: '80px', height: '6px' }}>
                        <div className="progress-fill" style={{ 
                          width: `${planta.saude}%`,
                          background: 'linear-gradient(to right, #10b981, #059669)'
                        }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '600' }}>
                        {planta.saude}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eficiência do Sistema */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Eficiência do Sistema</h3>
              <Zap size={18} className="icon-gray-500" />
            </div>
            <div className="mission-container">
              <div className="mission-icon" style={{ 
                background: 'linear-gradient(to bottom right, #dcfce7, #bbf7d0)',
                border: '2px solid #a7f3d0'
              }}>
                <Target size={24} style={{ color: '#16a34a' }} />
              </div>
              <div className="mission-content">
                <h4 className="mission-title">Economia de água esta semana</h4>
                <div className="mission-progress">
                  <div className="progress-header">
                    <span className="progress-label">vs semana anterior</span>
                    <span className="progress-value" style={{ color: '#16a34a' }}>-19%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ 
                      width: '81%',
                      background: 'linear-gradient(to right, #10b981, #059669)'
                    }} />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ 
              marginTop: '1rem',
              padding: '0.75rem',
              background: '#f9fafb',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: '#4b5563'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Eficiência Média</span>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>92%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Ciclos de Irrigação</span>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>48 este mês</span>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default Dashboard;