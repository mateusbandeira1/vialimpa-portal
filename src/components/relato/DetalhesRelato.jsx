import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DetalhesRelato.css";

const formataNome = (value) => {
  if (!value) return "";
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const Modal = ({ onConfirm, onCancel }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <p>Tem certeza que deseja excluir este relato?</p>
      <div className="modal-actions">
        <button onClick={onConfirm}>Sim</button>
        <button onClick={onCancel}>Não</button>
      </div>
    </div>
  </div>
);

const DetalhesRelato = ({ id_relato, onBackClick, onEditClick }) => {
  const [report, setReport] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const tipoConta = localStorage.getItem("tipo_conta");

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await axios.get(`https://vialimpa-api.vercel.app/relato/${id_relato}`);
        setReport(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Erro ao carregar os detalhes do relato."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReportDetails();
  }, [id_relato]);

  const handleDelete = async () => {
    setError("");
    setSuccess("");

    try {
      const response = await axios.delete(`https://vialimpa-api.vercel.app/relato/${id_relato}`);
      setSuccess(response.data.message || "Relato excluído com sucesso!");
      setTimeout(() => {
        setConfirmDelete(false);
        onBackClick();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao excluir o relato.");
    }
  };

  const handleEditClick = () => {
    onEditClick(report);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!report) {
    return <div>Relato não encontrado.</div>;
  }

  const formataData = (date) =>
    date ? new Date(date).toLocaleDateString("pt-BR") : "N/A";

  return (
    <div className="report-details-container">
      <div className="report-details-header">
        <h1>Detalhes do Relato</h1>
      </div>
      <div className="report-details-content">
        <div className="report-details-item">
          <span className="label-details">ID:</span>
          <span className="value-details">{report.id_relato}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">Status:</span>
          <span className="value-details">{formataNome(report.status)}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">Rua:</span>
          <span className="value-details">{formataNome(report.rua)}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">Bairro:</span>
          <span className="value-details">{formataNome(report.bairro)}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">Cidade:</span>
          <span className="value-details">{formataNome(report.cidade)}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">Estado:</span>
          <span className="value-details">{report.estado.toUpperCase()}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">Ponto de Referência:</span>
          <span className="value-details">{formataNome(report.ponto_referencia)}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">Descrição:</span>
          <span className="value-details">{formataNome(report.descricao)}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">Tipo de Obstrução:</span>
          <span className="value-details">{formataNome(report.tipo_obstrucao)}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">Justificativa:</span>
          <span className="value-details">{formataNome(report.justificativa)}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">Data de Criação:</span>
          <span className="value-details">{formataData(report.data_criacao)}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">Data de Atualização:</span>
          <span className="value-details">{formataData(report.data_atualizacao)}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">ID do Usuário:</span>
          <span className="value-details">{report.id_usuario}</span>
        </div>
        <div className="report-details-item">
          <span className="label-details">ID da Prefeitura:</span>
          <span className="value-details">{report.id_prefeitura}</span>
        </div>
      </div>
      <div className="report-details-actions">
        { }
        {tipoConta === "usuario" && report.status === "aberto" && (
          <>
            <button type="submit" onClick={handleEditClick}>Editar</button>
            <button type="button" onClick={() => setConfirmDelete(true)}>Excluir</button>
          </>
        )}
        {tipoConta === "prefeitura" && (
          <button type="submit" onClick={handleEditClick}>Editar</button>
        )}
        <button type="button" onClick={onBackClick}>Voltar</button>
      </div>
      {confirmDelete && (<Modal onConfirm={handleDelete} onCancel={() => setConfirmDelete(false)} />)}
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default DetalhesRelato;
