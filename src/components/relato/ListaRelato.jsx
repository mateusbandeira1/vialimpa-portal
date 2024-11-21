import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListaRelato.css';

const ListReport = ({ onReportClick }) => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    cidade: '',
    status: '',
    tipo_obstrucao: '',
  });

  const formataNome = (str) =>
    str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const formataData = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
  };

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError('');

      const tipo_conta = localStorage.getItem('tipo_conta');
      const id_conta = localStorage.getItem('id_conta');
      let endpoint = '';

      const params = new URLSearchParams();

      if (filters.status) params.append('status', filters.status);
      if (filters.tipo_obstrucao) params.append('tipo_obstrucao', filters.tipo_obstrucao);
      if (filters.cidade) params.append('cidade', filters.cidade);
      params.append('page', 1);
      params.append('limit', 10);

      if (tipo_conta === 'usuario') {
        endpoint = `http://localhost:4000/relato/usuario?${params.toString()}`;
      } else if (tipo_conta === 'prefeitura') {
        endpoint = `http://localhost:4000/relato/prefeitura/${id_conta}?${params.toString()}`;
      }

      if (endpoint) {
        const response = await axios.get(endpoint);
        setReports(response.data.relatos);
      } else {
        setReports([]);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Erro ao carregar os relatos.');
      } else if (err.request) {
        setError('Erro de conexão com o servidor.');
      } else {
        setError('Erro desconhecido.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    fetchReports();
  };

  const handleClearFilters = () => {
    setFilters({
      cidade: '',
      status: '',
      tipo_obstrucao: '',
    });
    fetchReports();
  };

  return (
    <div className="report-list-container">
      <div className="report-list-header">
        <h1>Lista de Relatos</h1>
      </div>

      <div className="filters">
        <label>
          Cidade:
          <input
            type="text"
            name="cidade"
            value={filters.cidade}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Selecione</option>
            <option value="aberto">Aberto</option>
            <option value="em andamento">Em andamento</option>
            <option value="concluido">Concluído</option>
          </select>
        </label>
        <label>
          Tipo de Obstrução:
          <input
            type="text"
            name="tipo_obstrucao"
            value={filters.tipo_obstrucao}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      <div className="report-list-content">
        {loading && <p>Carregando relatos...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <table className="report-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Tipo de Obstrução</th>
                <th>Cidade</th>
                <th>Data de Criação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id_relato}>
                  <td>{report.id_relato}</td>
                  <td
                    className={`status-${report.status.replace(/\s+/g, '-')}`}
                  >
                    {formataNome(report.status)}
                  </td>
                  <td>{formataNome(report.tipo_obstrucao)}</td>
                  <td>{formataNome(report.cidade)}</td>
                  <td>{formataData(report.data_criacao)}</td>
                  <td>
                    <button
                      type="submit"
                      onClick={() => onReportClick(report.id_relato)}
                    >
                      Detalhar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ListReport;