import React, { useState } from 'react';
import axios from 'axios';
import './CriaConta.css';

const CriaContaPrefeitura = ({ onRegister, onCancel }) => {
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [senha, setSenha] = useState('');
  const [rua, setRua] = useState('');
  const [nrResidencia, setNrResidencia] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const estadosBrasileiros = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
    "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    const newCityHall = {
      cnpj,
      email,
      telefone,
      senha,
      responsavel,
      rua,
      nr_residencia: nrResidencia,
      bairro,
      cidade,
      estado,
    };

    try {
      const response = await axios.post('https://vialimpa-api.vercel.app/prefeitura', newCityHall);

      if (response.data) {
        alert(response.data.message || 'Cadastro realizado com sucesso!');
        onRegister(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const erros = Array.isArray(error.response.data.message)
          ? error.response.data.message
          : [error.response.data.message];
        erros.forEach((msg) => alert(`Erro: ${msg}`));
      } else {
        alert('Erro inesperado. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="register-form-container">
      <div className="register-form-header">
        <h1>Cadastrar Prefeitura</h1>
      </div>
      <div className="register-form-content">
        <form onSubmit={handleRegister}>
          <div className="register-form-item">
            <label className="label" htmlFor="cnpj">CNPJ:</label>
            <input
              className="value"
              type="text"
              id="cnpj"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              required
            />
          </div>
          <div className="register-form-item">
            <label className="label" htmlFor="email">Email:</label>
            <input
              className="value"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="register-form-item">
            <label className="label" htmlFor="telefone">Telefone:</label>
            <input
              className="value"
              type="text"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
          <div className="register-form-item">
            <label className="label" htmlFor="responsavel">Responsável:</label>
            <input
              className="value"
              type="text"
              id="responsavel"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              required
            />
          </div>
          <div className="register-form-item">
            <label className="label" htmlFor="senha">Senha:</label>
            <input
              className="value"
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="register-form-item">
            <label className="label" htmlFor="rua">Rua/Avenida:</label>
            <input
              className="value"
              type="text"
              id="rua"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              required
            />
          </div>
          <div className="register-form-item">
            <label className="label" htmlFor="nrResidencia">Número:</label>
            <input
              className="value"
              type="text"
              id="nrResidencia"
              value={nrResidencia}
              onChange={(e) => setNrResidencia(e.target.value)}
              required
            />
          </div>
          <div className="register-form-item">
            <label className="label" htmlFor="bairro">Bairro:</label>
            <input
              className="value"
              type="text"
              id="bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              required
            />
          </div>
          <div className="register-form-item">
            <label className="label" htmlFor="cidade">Cidade:</label>
            <input
              className="value"
              type="text"
              id="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
            />
          </div>
          <div className="register-form-item">
            <label className="label" htmlFor="estado">Estado:</label>
            <select
              className="value"
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            >
              <option value="">Selecione o Estado</option>
              {estadosBrasileiros.map((sigla) => (
                <option key={sigla} value={sigla}>{sigla}</option>
              ))}
            </select>
          </div>
          <div className="register-form-actions">
            <button type="submit">Cadastrar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CriaContaPrefeitura;
