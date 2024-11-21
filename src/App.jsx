import React, { useState, useEffect } from 'react';
import './App.css';
import CriaRelato from './components/relato/CriaRelato';
import ListaRelato from './components/relato/ListaRelato';
import DetalhesRelato from './components/relato/DetalhesRelato';
import EditaRelato from './components/relato/EditaRelato';
import Login from './components/login/Login';
import DetalhesConta from './components/conta/DetalhesConta';
import EditaConta from './components/conta/EditaConta';
import CriaContaUsuario from './components/conta/CriaContaUsuario';
import CriaContaPrefeitura from './components/conta/CriaContaPrefeitura';
import RedefinirSenha from './components/conta/RedefinirSenha';

function App() {
  const [view, setView] = useState('login');
  const [isUserRegistration, setIsUserRegistration] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);

  const accountType = localStorage.getItem('tipo_conta');

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = () => {
    setView('listaRelato');
  };

  const handleRegister = () => {
    setView('register');
  };

  const handleToggleRegistrationType = () => {
    setIsUserRegistration(!isUserRegistration);
  };

  const handleRegisterUser = (newUser) => {
    setView('login');
  };

  const handleReportSubmit = (newReport) => {
    setReports([...reports, newReport]);
    setView('listaRelato');
  };

  const handleReportClick = (id_relato) => {
    setSelectedReport(id_relato);
    setView('detalhesRelato');
  };

  const handleBackClick = () => {
    setView('login');
  };

  const handleEditReportClick = (id_relato) => {
    setSelectedReport(id_relato);
    setView('editaRelato');
  };

  const handleConfirmEditReport = (updatedReport) => {
    setReports(updatedReport);
    setView('listaRelato');
  };

  const handleEditAccountClick = () => {
    setView('editaConta');
  };

  const handleConfirmEditAccount = (updatedUser) => {
    setUser(updatedUser);
    setView('conta');
  };

  const handleForgotPassword = () => {
    setView('redefinirSenha');
  };

  return (
    <div className="App">
      {view === 'login' && (
        <Login onLogin={handleLogin} onRegister={handleRegister} onForgotPassword={handleForgotPassword} />
      )}

      {view === 'register' && (
        <div className="registration-container">
          <div className="registration-toggle">
            <label>
              <input
                type="radio"
                name="registrationType"
                value="user"
                checked={isUserRegistration}
                onChange={handleToggleRegistrationType}
              />
              Usuário
            </label>
            <label>
              <input
                type="radio"
                name="registrationType"
                value="cityHall"
                checked={!isUserRegistration}
                onChange={handleToggleRegistrationType}
              />
              Prefeitura
            </label>
          </div>

          {isUserRegistration ? (
            <CriaContaUsuario onRegister={handleRegisterUser} onCancel={() => setView('login')} />
          ) : (
            <CriaContaPrefeitura onRegister={handleRegisterUser} onCancel={() => setView('login')} />
          )}
        </div>
      )}

      {view === 'redefinirSenha' && <RedefinirSenha onCancel={() => setView('login')} />}

      {view !== 'login' && view !== 'register' && view !== 'redefinirSenha' && (
        <>
          <header className="App-header">
            <nav className="App-nav">
              <ul>
                {accountType !== 'prefeitura' && (
                  <li>
                    <button onClick={() => setView('criaRelato')}>Relatar obstrução</button>
                  </li>
                )}
                <li>
                  <button onClick={() => setView('listaRelato')}>Consultar relatos</button>
                </li>
                <li>
                  <button onClick={() => setView('conta')}>Minha conta</button>
                </li>
                <li>
                  <button onClick={() => { setUser(null); setView('login'); }}>Sair</button>
                </li>
              </ul>
            </nav>
            <img src="images/Imagem1.png" alt="Logo" className="header-logo" />
          </header>
          <main className="App-body">
            <div className="App-content">
              {view === 'criaRelato' && <CriaRelato onSubmit={handleReportSubmit} />}
              {view === 'listaRelato' && <ListaRelato reports={reports} onReportClick={handleReportClick} />}
              {view === 'detalhesRelato' && (<DetalhesRelato id_relato={selectedReport} onBackClick={handleBackClick} onEditClick={handleEditReportClick} />)}
              {view === 'editaRelato' && (<EditaRelato report={selectedReport} onConfirmEdit={handleConfirmEditReport} onCancel={() => setView('listaRelato')} />)}
              {view === 'conta' && (<DetalhesConta user={user} onEditClick={handleEditAccountClick} />)}
              {view === 'editaConta' && (<EditaConta user={user} onConfirmEdit={handleConfirmEditAccount} onCancel={() => setView('conta')} />)}
            </div>
          </main>
          <footer className="App-footer">
            <p>&copy; ViaLimpa 2024. Todos os direitos reservados.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
