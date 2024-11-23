import React, { useState } from "react";
import axios from "axios";
import "./RedefinirSenha.css";

const ModalAtualizarSenha = ({ token, onConfirm, onCancel }) => {
    const [novaSenha, setNovaSenha] = useState("");
    const [inputToken, setInputToken] = useState(token || "");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://vialimpa-api.vercel.app/atualizar-senha", {
                token: inputToken,
                novaSenha,
            });
            alert(response.data.message); // Exibe a mensagem de sucesso no alert
            onConfirm();
        } catch (err) {
            alert(err.response?.data?.message || "Erro ao atualizar a senha."); // Exibe erros no alert
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
            </div>
        </div>
    );
};

const RedefinirSenha = () => {
    const [email, setEmail] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [token, setToken] = useState(null);

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://vialimpa-api.vercel.app/redefinir-senha", {
                email,
            });
            alert(response.data.message); // Exibe a mensagem de sucesso no alert
            setToken(response.data.token);
            setIsModalOpen(true);
        } catch (err) {
            alert(err.response?.data?.message || "Erro ao redefinir a senha."); // Exibe erros no alert
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
