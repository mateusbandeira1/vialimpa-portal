import React, { useState } from "react";
import axios from "axios";

const ModalAtualizarSenha = ({ token, onConfirm, onCancel }) => {
    const [novaSenha, setNovaSenha] = useState("");
    const [inputToken, setInputToken] = useState(token || "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/atualizar-senha", {
                token: inputToken,
                novaSenha,
            });
            setSuccess(response.data.message);
            onConfirm();
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao atualizar a senha.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="edit-account-item">
                        <label className="label-details">Token de Recuperação</label>
                        <input
                            type="text"
                            value={inputToken}
                            onChange={(e) => setInputToken(e.target.value)}
                            required
                        />
                    </div>
                    <div className="edit-account-item">
                        <label className="label-details">Nova Senha</label>
                        <input
                            type="password"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            required
                        />
                    </div>
                    <div className="edit-account-actions">
                        <button type="submit">Atualizar Senha</button>
                        <button type="button" onClick={onCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
            </div>
        </div>
    );
};

const RedefinirSenha = () => {
    const [email, setEmail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [token, setToken] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/redefinir-senha", {
                email,
            });
            setSuccess(response.data.message);
            setToken(response.data.token);
            setIsModalOpen(true);
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao redefinir a senha.");
        }
    };

    return (
        <div className="edit-account-container">
            <div className="edit-account-header">
                <h1>Informe seu e-mail</h1>
            </div>
            <div className="edit-account-content">
                <form onSubmit={handleSubmitEmail}>
                    <div className="edit-account-item">
                        <label className="label-details">E-mail</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="register-form-actions">
                        <button type="submit">Enviar token</button>
                    </div>
                </form>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
            </div>

            {isModalOpen && (
                <ModalAtualizarSenha
                    token={token}
                    onConfirm={() => setIsModalOpen(false)}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default RedefinirSenha;