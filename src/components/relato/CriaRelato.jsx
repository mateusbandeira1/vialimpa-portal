import React, { useState } from 'react';
import axios from 'axios';
import './CriaRelato.css';

const estadosBrasil = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const ReportForm = () => {
  const [location, setLocalizacao] = useState('');
  const [obstructionType, setTipoObstrucao] = useState('');
  const [description, setDescricao] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pontoReferencia, setPontoReferencia] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reportData = {
      rua: location,
      ponto_referencia: pontoReferencia,
      bairro,
      cidade,
      estado,
      descricao: description,
      tipo_obstrucao: obstructionType,
      id_usuario: localStorage.id_conta,
    };

    try {
      const response = await axios.post('https://vialimpa-api.vercel.app/relato', reportData);

      if (response.data.message) {
        alert(response.data.message);
      }
      handleCancel();
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Erro ao enviar o relatório. Tente novamente.');
      }
    }
  };

  const handleCancel = () => {
    setLocalizacao('');
    setTipoObstrucao('');
    setDescricao('');
    setBairro('');
    setCidade('');
    setEstado('');
    setPontoReferencia('');
  };

  return (
    <div className="report-form-container">
      <div className="report-form-header">
        <h1>Relatar Obstrução</h1>
      </div>
      <div className="report-form-content">
        <form onSubmit={handleSubmit}>
          <div className="report-form-item">
            <label className="label" htmlFor="location">Rua:</label>
            <input
              className="value"
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocalizacao(e.target.value)}
              required
            />
          </div>
          <div className="report-form-item">
            <label className="label" htmlFor="pontoReferencia">Ponto de Referência:</label>
            <input
              className="value"
              type="text"
              id="pontoReferencia"
              value={pontoReferencia}
              onChange={(e) => setPontoReferencia(e.target.value)}
              required
            />
          </div>
          <div className="report-form-item">
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
          <div className="report-form-item">
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
          <div className="report-form-item">
            <label className="label" htmlFor="estado">Estado:</label>
            <select
              className="value"
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            >
              <option value="">Selecione um estado</option>
              {estadosBrasil.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>
          <div className="report-form-item">
            <label className="label" htmlFor="obstructionType">Tipo de Obstrução:</label>
            <input
              className="value"
              type="text"
              id="obstructionType"
              value={obstructionType}
              onChange={(e) => setTipoObstrucao(e.target.value)}
              required
            />
          </div>
          <div className="report-form-item">
            <label className="label" htmlFor="description">Descrição:</label>
            <textarea
              className="value"
              id="description"
              value={description}
              onChange={(e) => setDescricao(e.target.value)}
              rows="4"
              required
            />
          </div>
          <div className="report-form-actions">
            <button type="submit">Enviar</button>
            <button type="button" onClick={handleCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
