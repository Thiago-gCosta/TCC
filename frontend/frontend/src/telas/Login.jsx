import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../servicos/auth";
import "../estilos/login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        setErro("");
        setCarregando(true);

        try {
            await login(email, senha);
            navigate("/principal");
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

                    <h1>Entrar</h1>

                    <p>
                        Acesse sua conta para utilizar o CECODE.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
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
                        {carregando ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        Ainda não possui uma conta?
                    </p>

                    <Link to="/register">
                        Criar conta
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Login;