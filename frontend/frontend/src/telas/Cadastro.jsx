import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cadastrar } from "../servicos/auth";
import "../estilos/login.css";

function Cadastro() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("COMPLETA");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setErro("");

        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        setCarregando(true);

        try {
            await cadastrar(
                nome,
                email,
                senha,
                tipoUsuario
            );

            navigate("/login");
        } catch (error) {
            setErro(error.message);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="login-page">
            <section className="login-container">
                <div className="login-header">
                    <Link to="/" className="login-logo">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Link>

                    <h1>Criar conta</h1>

                    <p>
                        Crie sua conta para começar a utilizar o CECODE.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="login-form"
                >
                    <div className="form-group">
                        <label htmlFor="nome">
                            Nome
                        </label>

                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(event) =>
                                setNome(event.target.value)
                            }
                            placeholder="Digite seu nome"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            E-mail
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Digite seu e-mail"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tipoUsuario">
                            Tipo de visão do usuário
                        </label>

                        <select
                            id="tipoUsuario"
                            value={tipoUsuario}
                            onChange={(event) =>
                                setTipoUsuario(event.target.value)
                            }
                            required
                        >
                            <option value="COMPLETA">
                                Completa
                            </option>

                            <option value="PARCIAL">
                                Parcial
                            </option>

                            <option value="AUXILIAR">
                                Auxiliar
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="senha">
                            Senha
                        </label>

                        <input
                            id="senha"
                            type="password"
                            value={senha}
                            onChange={(event) =>
                                setSenha(event.target.value)
                            }
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmarSenha">
                            Confirmar senha
                        </label>

                        <input
                            id="confirmarSenha"
                            type="password"
                            value={confirmarSenha}
                            onChange={(event) =>
                                setConfirmarSenha(event.target.value)
                            }
                            placeholder="Digite a senha novamente"
                            required
                        />
                    </div>

                    {erro && (
                        <p className="login-error">
                            {erro}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="login-submit"
                        disabled={carregando}
                    >
                        {carregando
                            ? "Criando conta..."
                            : "Criar conta"}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        Já possui uma conta?
                    </p>

                    <Link to="/login">
                        Entrar
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Cadastro;