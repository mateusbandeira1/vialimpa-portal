import React, { useState } from 'react';
import axios from 'axios';
import './CriaRelato.css';

const ReportForm = () => {
  const [location, setLocalizacao] = useState('');
  const [obstructionType, setTipoObstrucao] = useState('');
  const [description, setDescricao] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pontoReferencia, setPontoReferencia] = useState('');
  const [message, setMessage] = useState('');

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
      const response = await axios.post('http://localhost:4000/relato', reportData);

      if (response.status === 200) {
        setMessage('Relatório enviado com sucesso!');
        handleCancel();
      } else {
        setMessage('Erro ao enviar o relatório. Tente novamente.');
      }
    } catch (error) {
      setMessage('Erro ao enviar o relatório. Tente novamente.');
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
    setMessage('');
  };

  return (
    <div className="report-form-container">
      <div className="report-form-header">
        <h1>Relatar Obstrução</h1>
        {message && <p>{message}</p>}
      </div>
      <div className="report-form-content">
        <form onSubmit={handleSubmit}>
          <div className="report-form-item">
            <label className="label" htmlFor="location">Localização (Rua):</label>
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
            <input
              className="value"
              type="text"
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            />
          </div>
          <div className="report-form-item">
            <label className="label" htmlFor="obstructionType">Tipo de Obstrução:</label>
            <select
              className="value"
              id="obstructionType"
              value={obstructionType}
              onChange={(e) => setTipoObstrucao(e.target.value)}
              required
            >
              <option value="">Selecione um tipo</option>
              <option value="buraco">Buraco</option>
              <option value="mau estado">Mau Estado</option>
              <option value="obras">Obras</option>
              <option value="calçada danificada">Calçada Danificada</option>
            </select>
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
