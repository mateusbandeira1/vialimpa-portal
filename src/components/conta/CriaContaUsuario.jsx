import React, { useState } from 'react';
import axios from 'axios';
import './CriaConta.css';

const CriaContaUsuario = ({ onRegister, onCancel }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [nrResidencia, setNrResidencia] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [mensagens, setMensagens] = useState([]);

  const estadosBrasileiros = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
    "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const handleRegister = async (e) => {
    e.preventDefault();

    const newUser = {
      nome,
      cpf,
      email,
      telefone,
      senha,
      rua: endereco,
      nr_residencia: nrResidencia,
      bairro,
      cidade,
      estado,
    };

    try {
      const response = await axios.post('https://vialimpa-api.vercel.app/usuario', newUser);

      if (response.data) {
        onRegister(response.data);
        setMensagens([{ tipo: 'sucesso', texto: response.data.message || 'Cadastro realizado com sucesso!' }]);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const erros = Array.isArray(error.response.data.message)
          ? error.response.data.message
          : [error.response.data.message];
        setMensagens(erros.map((msg) => ({ tipo: 'erro', texto: msg })));
      } else {
        setMensagens([{ tipo: 'erro', texto: 'Erro inesperado. Tente novamente mais tarde.' }]);
      }
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="register-form-container">
      <div className="register-form-header">
        <h1>Cadastrar Usuário</h1>
      </div>
      <div className="register-form-content">
        {mensagens.length > 0 && (
          <div className="mensagens">
            {mensagens.map((mensagem, index) => (
              <div key={index} className={`mensagem ${mensagem.tipo}`}>
                {mensagem.texto}
              </div>
            ))}
          </div>
        )}
        <form onSubmit={handleRegister}>
          <div className="register-form-item">
            <label className="label" htmlFor="nome">Nome:</label>
            <input
              className="value"
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
            <label className="label" htmlFor="cpf">CPF:</label>
            <input
              className="value"
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
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
            <label className="label" htmlFor="endereco">Rua/Avenida:</label>
            <input
              className="value"
              type="text"
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
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
            <button type="button" onClick={handleCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CriaContaUsuario;
