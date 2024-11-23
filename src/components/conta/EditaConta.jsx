import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditaConta.css";

const estadosBrasileiros = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
  "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

const EditaConta = ({ user, onConfirmEdit, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const tipo_conta = localStorage.getItem("tipo_conta");

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirm = async () => {
    setLoading(true);
    setErrorMessage("");

    const id_conta = localStorage.getItem("id_conta");

    if (!tipo_conta || !id_conta) {
      setErrorMessage("Erro: Não foi possível obter informações da conta. Tente fazer login novamente.");
      setLoading(false);
      return;
    }

    if (tipo_conta === "usuario" && (
      !formData.nome || !formData.cpf || !formData.email ||
      !formData.telefone || !formData.senha || !formData.rua ||
      !formData.nr_residencia || !formData.bairro || !formData.cidade || !formData.estado
    )) {
      setErrorMessage("Todos os campos obrigatórios devem ser preenchidos.");
      setLoading(false);
      return;
    }

    if (tipo_conta === "prefeitura" && (
      !formData.responsavel || !formData.cnpj || !formData.email ||
      !formData.telefone || !formData.senha || !formData.rua ||
      !formData.nr_residencia || !formData.bairro || !formData.cidade || !formData.estado
    )) {
      setErrorMessage("Todos os campos obrigatórios devem ser preenchidos.");
      setLoading(false);
      return;
    }

    const apiData = tipo_conta === "usuario"
      ? {
        nome: formData.nome,
        cpf: formData.cpf,
        email: formData.email,
        telefone: formData.telefone,
        senha: formData.senha,
        rua: formData.rua,
        nr_residencia: formData.nr_residencia,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
      }
      : {
        responsavel: formData.responsavel,
        cnpj: formData.cnpj,
        email: formData.email,
        telefone: formData.telefone,
        senha: formData.senha,
        rua: formData.rua,
        nr_residencia: formData.nr_residencia,
        bairro: formData.bairro,
        cidade: formData.cidade,
        estado: formData.estado,
      };

    try {
      const apiUrl = tipo_conta === "usuario"
        ? `https://vialimpa-api.vercel.app/usuario/${id_conta}`
        : `https://vialimpa-api.vercel.app/prefeitura/${id_conta}`;

      const response = await axios.put(apiUrl, apiData);

      alert(`Sucesso: ${response.data.message || "Dados atualizados com sucesso!"}`);
      onConfirmEdit(response.data);
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.message || "Erro ao atualizar os dados.");
      } else {
        setErrorMessage("Erro: Não foi possível se comunicar com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-account-container">
      <div className="edit-account-header">
        <h1>Editar Conta</h1>
      </div>
      <div className="edit-account-content">
        { }
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        {tipo_conta === "usuario" ? (
          <>
            <div className="edit-account-item">
              <label className="label-details">Nome:</label>
              <input
                type="text"
                name="nome"
                value={formData.nome || ""}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="edit-account-item">
              <label className="label-details">CPF:</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf || ""}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </>
        ) : (
          <>
            <div className="edit-account-item">
              <label className="label-details">Responsável:</label>
              <input
                type="text"
                name="responsavel"
                value={formData.responsavel || ""}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div className="edit-account-item">
              <label className="label-details">CNPJ:</label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj || ""}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </>
        )}
        <div className="edit-account-item">
          <label className="label-details">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="edit-account-item">
          <label className="label-details">Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone || ""}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="edit-account-item">
          <label className="label-details">Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha || ""}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="edit-account-item">
          <label className="label-details">Rua:</label>
          <input
            type="text"
            name="rua"
            value={formData.rua || ""}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="edit-account-item">
          <label className="label-details">Número da Residência:</label>
          <input
            type="text"
            name="nr_residencia"
            value={formData.nr_residencia || ""}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="edit-account-item">
          <label className="label-details">Bairro:</label>
          <input
            type="text"
            name="bairro"
            value={formData.bairro || ""}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="edit-account-item">
          <label className="label-details">Cidade:</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade || ""}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        <div className="edit-account-item">
          <label className="label-details">Estado:</label>
          <select
            name="estado"
            value={formData.estado || ""}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Selecione o estado</option>
            {estadosBrasileiros.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
        <div className="edit-account-actions">
          <button onClick={handleConfirm} disabled={loading}>Confirmar</button>
          <button onClick={onCancel} disabled={loading}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default EditaConta;
