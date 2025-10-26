import '../../styles/home.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import foto_02 from "../../assets/Foto_02.jpeg";



const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      {/* Header fixo */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmx1ZUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwYWNmZjtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDA3OGZmO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JlZW5HcmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2Y2ZmNjc7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzRjYWY1MDtzdG9wLW9wYWNpdHk6MSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDwhLS0gRHJvcCBzaGFwZSAtLT4KICA8cGF0aCBkPSJNMjAgM0MxNSAzIDEwIDggMTAgMTVDMTAgMjIgMTUgMzAgMjAgMzBTMzAgMjIgMzAgMTVDMzAgOCAyNSAzIDIwIDNaIiBmaWxsPSJ1cmwoI2JsdWVHcmFkaWVudCkiLz4KICA8IS0tIExlYWYgc2hhcGUgLS0+CiAgPGVsbGlwc2UgY3g9IjEyIiBjeT0iMjAiIHJ4PSI4IiByeT0iMTIiIGZpbGw9InVybCgjZ3JlZW5HcmFkaWVudCkiLz4KICA8IS0tIExlYWYgZGV0YWlsIC0tPgogIDxwYXRoIGQ9Ik04IDIwUTEyIDI0IDE2IDIwIiBzdHJva2U9IiMyZTdkMzIiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIERpZ2l0YWwgZWxlbWVudHMgLS0+CiAgPHJlY3QgeD0iMjEiIHk9IjEyIiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBmaWxsPSJ3aGl0ZSIgcng9IjAuNSIvPgogIDxyZWN0IHg9IjI2IiB5PSIxMiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0id2hpdGUiIHJ4PSIwLjMiLz4KICA8cmVjdCB4PSIyMSIgeT0iMTciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IndoaXRlIiByeD0iMC4zIi8+CiAgPHJlY3QgeD0iMjUiIHk9IjE3IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBmaWxsPSJ3aGl0ZSIgcng9IjAuNSIvPgogIDxyZWN0IHg9IjIxIiB5PSIyMiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgZmlsbD0id2hpdGUiIHJ4PSIwLjUiLz4KPC9zdmc+" alt="CloudGarden" className="logo-icon" />
            <span>CloudGarden</span>
          </div>
          <nav className="nav">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#projeto" className="nav-link">Projeto</a>
            <a href="#ferramentas" className="nav-link">Ferramentas</a>
            <a href="#dashboard" className="nav-link">Sobre nós</a>
            <a href="#contact" className="nav-link">Contato</a>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Entrar</Link>
            <Link to="/register" className="signup-btn">Cadastrar</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">CloudGarden</h1>
          <p className="hero-subtitle">
            Monitoramento inteligente e automação para jardins e estufas
            <br />
            através da Internet das Coisas.
          </p>
          <Link to="/register" className="cta-button">Começar Agora</Link>
        </div>
      </section>

      {/* Seção Como Funciona */}
      <section className="deploy-section">
        <div className="container">
          <h2 className="section-title">Como Funciona</h2>
          
          <div className="how-it-works">
            <div className="step-card">
              <div className="step-icon">
                <div className="plant-icon">🌱</div>
              </div>
              <h3>Instalação</h3>
              <p>Configure sensores IoT na horta para coletar dados ambientais</p>
            </div>
            
            <div className="step-card">
              <div className="step-icon">
                <div className="wifi-icon">📶</div>
              </div>
              <h3>Monitoramento</h3>
              <p>Visualize dados em tempo real através do dashboard interativo</p>
            </div>
            
            <div className="step-card">
              <div className="step-icon">
                <div className="chart-icon">📊</div>
              </div>
              <h3>Decisão</h3>
              <p>Tome decisões baseadas em dados para otimizar sua produção</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Projeto */}
      <section id="projeto" className="suprirection-section">
        <div className="container">
          <h2 className="section-title">Projeto</h2>
          
          <div className="suprirection-content">
            <div className="text-content">
              <h3>CloudGarden</h3>
              <p>
                Esse projeto conecta sensores IoT a hortas escolares, permitindo monitorar temperatura, umidade e clima em tempo real. Pela plataforma, professores e alunos podem programar a irrigação e acompanhar o cultivo de forma prática e acessível. Com apoio de Machine Learning, o sistema aprende padrões e sugere melhorias no manejo da horta. Assim, o projeto CloudGarden une <strong>Educação</strong>, <strong>Inovação</strong> e <strong>Sustentabilidade</strong> em um só projeto.
              </p>
            </div>
            <div className="illustration">
              <div className="nature-scene">
                <img src={foto_02} alt="Morango na horta" className="project-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Ferramentas */}
      <section id="ferramentas" className="benefits-section">
        <div className="container">
          <h2 className="section-title">Ferramentas</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">📊</div>
              <h3>Dashboard</h3>
              <p>Acompanhe todos os dados dos seus sensores em tempo real através do dashboard intuitivo.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💧</div>
              <h3>Irrigação</h3>
              <p>Sistema automatizado de irrigação baseado nos dados de umidade do solo e plantas.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔔</div>
              <h3>Alertas</h3>
              <p>Receba notificações instantâneas sobre condições críticas na sua horta ou estufa.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📈</div>
              <h3>Histórico</h3>
              <p>Acesse relatórios detalhados e histórico completo de todos os dados coletados.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🥬</div>
              <h3>Colheita</h3>
              <p>Planeje e otimize seus ciclos de colheita com base nos dados de crescimento das plantas.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🌿</div>
              <h3>Horta</h3>
              <p>Gerencie múltiplas áreas de plantio e monitore cada seção da sua horta individualmente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Contato/CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para começar?</h2>
            <p>Transforme seu ambiente com tecnologia IoT inteligente</p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary">Começar</Link>
              <button className="btn-secondary">Saber Mais</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>CloudGarden</h3>
              <p>Soluções inteligentes para monitoramento e automação através da Internet das Coisas.</p>
            </div>
            
            <div className="footer-section">
              <h4>Links Rápidos</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">Sobre</a></li>
                <li><a href="#dashboard">Dashboard</a></li>
                <li><a href="#contact">Contato</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Produtos</h4>
              <ul>
                <li><a href="#sensors">Sensores</a></li>
                <li><a href="#monitoring">Monitoramento</a></li>
                <li><a href="#analytics">Analytics</a></li>
                <li><a href="#api">API</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contato</h4>
              <ul>
                <li>📧 contato@cloudgarden.com</li>
                <li>📱 (11) 9999-9999</li>
                <li>📍 São Paulo, SP</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2025 CloudGarden. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;