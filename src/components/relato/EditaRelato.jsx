import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditaRelato.css';

const estadosBrasileiros = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const EditaRelato = ({ report, onConfirmEdit, onCancel }) => {
  const [formData, setFormData] = useState({ ...report });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountId, setAccountId] = useState('');

  useEffect(() => {
    const storedAccountType = localStorage.getItem('tipo_conta');
    const storedAccountId = localStorage.getItem('id_conta');

    if (storedAccountType && storedAccountId) {
      setAccountType(storedAccountType);
      setAccountId(storedAccountId);
    } else {
      setError('Usuário não autenticado.');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    setError('');
    setSuccess('');

    if (accountType === 'usuario' && (
      !formData.descricao ||
      !formData.rua ||
      !formData.tipo_obstrucao ||
      !formData.ponto_referencia ||
      !formData.bairro ||
      !formData.cidade ||
      !formData.estado
    )) {
      setError('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    try {
      const endpoint = accountType === 'usuario'
        ? `https://vialimpa-api.vercel.app/relato/usuario/${accountId}/${formData.id_relato}`
        : `https://vialimpa-api.vercel.app/relato/prefeitura/${accountId}/${formData.id_relato}`;

      const dataToSend = {};
      if (accountType === 'usuario') {
        if (formData.rua) dataToSend.rua = formData.rua;
        if (formData.ponto_referencia) dataToSend.ponto_referencia = formData.ponto_referencia;
        if (formData.bairro) dataToSend.bairro = formData.bairro;
        if (formData.cidade) dataToSend.cidade = formData.cidade;
        if (formData.estado) dataToSend.estado = formData.estado;
        if (formData.descricao) dataToSend.descricao = formData.descricao;
        if (formData.tipo_obstrucao) dataToSend.tipo_obstrucao = formData.tipo_obstrucao;
      } else if (accountType === 'prefeitura') {
        if (formData.status) dataToSend.status = formData.status;
        if (formData.justificativa) dataToSend.justificativa = formData.justificativa;
      }

      const response = await axios.put(endpoint, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccess('Relato atualizado com sucesso.');
        setTimeout(() => {
          onConfirmEdit(formData);
        }, 1500);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Erro ao editar o relato.');
      } else if (err.request) {
        setError('Erro na conexão com o servidor.');
      } else {
        setError('Erro desconhecido.');
      }
    }
  };

  return (
    <div className="report-edit-container">
      <div className="report-edit-header">
        <h1>Editar Relato</h1>
      </div>
      <div className="report-edit-content">
        {accountType === 'usuario' && (
          <>
            <div className="report-edit-item">
              <label className="label-edit">Descrição:</label>
              <input
                type="text"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
              />
            </div>
            <div className="report-edit-item">
              <label className="label-edit">Endereço:</label>
              <input
                type="text"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
              />
            </div>
            <div className="report-edit-item">
              <label className="label-edit">Ponto de Referência:</label>
              <input
                type="text"
                name="ponto_referencia"
                value={formData.ponto_referencia}
                onChange={handleChange}
              />
            </div>
            <div className="report-edit-item">
              <label className="label-edit">Bairro:</label>
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
              />
            </div>
            <div className="report-edit-item">
              <label className="label-edit">Cidade:</label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
              />
            </div>
            <div className="report-edit-item">
              <label className="label-edit">Estado:</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="">Selecione o estado</option>
                {estadosBrasileiros.map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>
            <div className="report-edit-item">
              <label className="label-edit">Tipo de Obstrução:</label>
              <input
                type="text"
                name="tipo_obstrucao"
                value={formData.tipo_obstrucao}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {accountType === 'prefeitura' && (
          <>
            <div className="report-edit-item">
              <label className="label-edit">Status:</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="value-edit"
                required
              >
                <option value="">Selecione o status</option>
                <option value="Aberto">Aberto</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluido">Concluído</option>
              </select>
            </div>
            <div className="report-edit-item">
              <label className="label-edit">Justificativa:</label>
              <input
                type="text"
                name="justificativa"
                value={formData.justificativa}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="report-edit-actions">
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditaRelato;
