import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DetalhesConta.css";

const Modal = ({ onConfirm, onCancel, onPasswordChange, password }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <p>Para excluir sua conta, informe sua senha!</p>
      <input
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
      />
      <div className="modal-actions">
        <button onClick={onConfirm}>Sim</button>
        <button onClick={onCancel}>Não</button>
      </div>
    </div>
  </div>
);

const DetalhesConta = ({ onBackClick, onEditClick }) => {
  const [userData, setUserData] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const id_conta = localStorage.getItem("id_conta");
    const tipo_conta = localStorage.getItem("tipo_conta");

    if (tipo_conta && id_conta) {
      const url =
        tipo_conta === "prefeitura"
          ? `https://vialimpa-api.vercel.app/prefeitura/${id_conta}`
          : `https://vialimpa-api.vercel.app/usuario/${id_conta}`;

      axios
        .get(url)
        .then((response) => setUserData(response.data))
        .catch((error) => {
          alert(error.response?.data?.message || "Erro ao buscar dados.");
        });
    }
  }, []);

  const handleDelete = async () => {
    const tipo_conta = localStorage.getItem("tipo_conta");
    const id_conta = localStorage.getItem("id_conta");
    const endpoint =
      tipo_conta === "prefeitura"
        ? "https://vialimpa-api.vercel.app/prefeitura"
        : "https://vialimpa-api.vercel.app/usuario";

    try {
      const response = await axios.delete(endpoint, {
        data: {
          [tipo_conta === "prefeitura" ? "id_prefeitura" : "id_usuario"]: id_conta,
          senha: password,
        },
      });

      alert(response.data.message || "Conta excluída com sucesso!");
      setConfirmDelete(true);
      onBackClick();
    } catch (error) {
      alert(error.response?.data?.message || "Erro ao excluir conta.");
    }
  };

  const formataCpfCnpj = (value) => {
    if (!value) return "";
    return value.length <= 11
      ? value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      : value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  };

  const formataTelefone = (value) => {
    if (!value) return "";

    if (value.length <= 10) {
      return value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  };

  const formataNome = (value) => {
    if (!value) return "";
    return value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  if (!userData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="account-details-container">
      <div className="account-details-header">
        <h1>Minha Conta</h1>
      </div>
      <div className="account-details-content">
        <div className="account-details-item">
          <span className="label-details">ID:</span>
          <span className="value-details">
            {userData.id_usuario || userData.id_prefeitura}
          </span>
        </div>
        <div className="account-details-item">
          <span className="label-details">Nome / Responsável:</span>
          <span className="value-details">
            {formataNome(userData.nome || userData.responsavel)}
          </span>
        </div>
        <div className="account-details-item">
          <span className="label-details">CPF / CNPJ:</span>
          <span className="value-details">
            {formataCpfCnpj(userData.cpf || userData.cnpj)}
          </span>
        </div>
        <div className="account-details-item">
          <span className="label-details">Email:</span>
          <span className="value-details">{userData.email}</span>
        </div>
        <div className="account-details-item">
          <span className="label-details">Telefone:</span>
          <span className="value-details">
            {formataTelefone(userData.telefone)}
          </span>
        </div>
        <div className="account-details-item">
          <span className="label-details">Endereço:</span>
          <span className="value-details">
            {formataNome(userData.rua)}, {userData.nr_residencia},{" "}
            {formataNome(userData.bairro)}, {formataNome(userData.cidade)} -{" "}
            {userData.estado.toUpperCase()}
          </span>
        </div>
        <div className="account-details-actions">
          <button type="submit" onClick={onEditClick}>Editar</button>
          <button type="button" onClick={() => setConfirmDelete(true)}>Excluir</button>
        </div>
      </div>
      {confirmDelete && (
        <Modal
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(false)}
          onPasswordChange={setPassword}
          password={password}
        />
      )}
    </div>
  );
};

export default DetalhesConta;
