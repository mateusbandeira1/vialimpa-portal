import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin, onRegister, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/login', {
        cpf_cnpj: username,
        senha: password,
      });

      const { id, tipo } = response.data;
      localStorage.setItem('id_conta', id);
      localStorage.setItem('tipo_conta', tipo);
      onLogin();
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Erro ao fazer login');
      } else if (err.request) {
        setError('Erro na conexão com o servidor');
      } else {
        setError('Erro desconhecido');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Faça o login</h1>
      </div>
      <div className="login-content">
        <form onSubmit={handleSubmit}>
          <div className="login-item">
            <label htmlFor="username">CPF/CNPJ:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-item">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <div className="button-container">
            <button type="submit">Entrar</button>
          </div>
        </form>
        <div className="register-link">
          <p>Não tem uma conta? <span onClick={onRegister} className="register-span">Registre-se</span></p>
        </div>
        <div className="register-link">
          <p>Esqueceu sua senha?{' '}<span onClick={onForgotPassword} className="forgot-password-span">Redefinir senha</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
