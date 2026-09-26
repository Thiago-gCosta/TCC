import { useState } from "react";
import { Link } from "react-router-dom";

import { converterBraile } from "../servicos/braile";

import "../estilos/principal.css";

function Principal() {
    const [texto, setTexto] = useState("");
    const [modo, setModo] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [resultado, setResultado] = useState(null);

    async function handleConverter() {
        setErro("");
        setResultado(null);

        if (!texto.trim()) {
            setErro("Digite um texto para realizar a conversão.");
            return;
        }

        if (!modo) {
            setErro("Selecione um modo de funcionamento.");
            return;
        }

        setCarregando(true);

        try {
            const dados = await converterBraile(
                texto,
                modo
            );

            setResultado(dados);
        } catch (error) {
            setErro(error.message);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="principal-page">
            <header className="principal-navbar">
                <Link
                    to="/principal"
                    className="principal-logo"
                    aria-label="CECODE"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </Link>

                <nav className="principal-nav">
                    <Link
                        to="/principal"
                        className="active"
                    >
                        Início
                    </Link>

                    <Link to="/historico">
                        Histórico
                    </Link>

                    <Link to="/perfil">
                        Perfil
                    </Link>
                </nav>

                <div className="principal-actions">
                    <Link
                        to="/"
                        className="principal-logout"
                    >
                        Sair
                    </Link>

                    <Link
                        to="/perfil"
                        className="principal-menu"
                    >
                        Menu
                    </Link>
                </div>
            </header>

            <section className="principal-content">
                <div className="principal-brand">
                    <h1>CECODE</h1>

                    <p>
                        Ferramenta para auxílio da aprendizagem do braile.
                    </p>
                </div>

                <div className="principal-tabs">
                    <Link
                        to="/principal"
                        className="principal-tab active"
                    >
                        Tradução
                    </Link>

                    <Link
                        to="/historico"
                        className="principal-tab"
                    >
                        Favoritos
                    </Link>

                    <Link
                        to="/historico"
                        className="principal-tab"
                    >
                        Histórico
                    </Link>
                </div>

                <section className="converter-card">
                    <div className="converter-header">
                        <div>
                            <span className="converter-label">
                                CONVERSOR
                            </span>

                            <h2>
                                Texto para braile
                            </h2>
                        </div>

                        <span
                            className={`device-status ${
                                resultado?.envio?.conectado
                                    ? "connected"
                                    : "disconnected"
                            }`}
                        >
                            <span></span>

                            {resultado?.envio?.conectado
                                ? "Dispositivo conectado"
                                : "Dispositivo desconectado"}
                        </span>
                    </div>

                    <div className="converter-body">
                        <label htmlFor="texto">
                            Texto
                        </label>

                        <textarea
                            id="texto"
                            value={texto}
                            onChange={(event) =>
                                setTexto(event.target.value)
                            }
                            placeholder="Digite aqui o texto que deseja converter..."
                            maxLength={500}
                        />

                        <div className="converter-options">
                            <div className="option-group">
                                <label htmlFor="modo">
                                    Modo de funcionamento
                                </label>

                                <select
                                    id="modo"
                                    value={modo}
                                    onChange={(event) =>
                                        setModo(event.target.value)
                                    }
                                >
                                    <option
                                        value=""
                                        disabled
                                    >
                                        Selecione um modo
                                    </option>

                                    <option value="automatico">
                                        Automático
                                    </option>

                                    <option value="manual">
                                        Manual
                                    </option>
                                </select>
                            </div>

                            <div className="option-group">
                                <label htmlFor="velocidade">
                                    Velocidade de leitura
                                </label>

                                <input
                                    id="velocidade"
                                    type="number"
                                    placeholder="1000"
                                    min="1"
                                    disabled
                                />
                            </div>
                        </div>

                        {erro && (
                            <p className="converter-error">
                                {erro}
                            </p>
                        )}

                        <button
                            type="button"
                            className="converter-button"
                            onClick={handleConverter}
                            disabled={carregando}
                        >
                            {carregando
                                ? "Convertendo..."
                                : "Converter e enviar"}
                        </button>

                        {resultado && (
                            <div className="converter-result">
                                <div>
                                    <span className="converter-label">
                                        RESULTADO
                                    </span>

                                    <h3>
                                        Conversão realizada com sucesso
                                    </h3>
                                </div>

                                {Array.isArray(resultado.celulas) && (
                                    <div className="result-cells">
                                        {resultado.celulas.map(
                                            (celula, index) => (
                                                <div
                                                    className="result-cell"
                                                    key={index}
                                                >
                                                    {Array.isArray(celula) &&
                                                        celula.map(
                                                            (
                                                                ponto,
                                                                pontoIndex
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        pontoIndex
                                                                    }
                                                                    className={
                                                                        ponto
                                                                            ? "braile-point active"
                                                                            : "braile-point"
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}

                                <p className="result-message">
                                    {resultado.envio?.mensagem ||
                                        "Dados processados com sucesso."}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </section>

            <footer className="principal-footer">
                <div className="footer-main">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <h3>CECODE</h3>

                        <p>
                            Ferramenta para auxílio da aprendizagem do braile.
                        </p>
                    </div>

                    <div className="footer-column">
                        <h4>Navegação</h4>

                        <Link to="/principal">
                            Início
                        </Link>

                        <Link to="/historico">
                            Histórico
                        </Link>

                        <Link to="/perfil">
                            Perfil
                        </Link>
                    </div>

                    <div className="footer-column">
                        <h4>Projeto</h4>

                        <Link to="/">
                            Sobre o CECODE
                        </Link>

                        <a href="#repositor">
                            Repositório
                        </a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span>
                        © 2026 CECODE
                    </span>

                    <span>
                        Projeto acadêmico
                    </span>
                </div>
            </footer>
        </main>
    );
}

export default Principal;