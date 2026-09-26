import { Link } from "react-router-dom";
import DeviceScroll from "./DeviceScroll";
import "../estilos/home.css";

function Home() {
    return (
        <main className="home">
            <header className="navbar">
                <Link to="/" className="logo" aria-label="CECODE">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </Link>

                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <a href="#sobre">Sobre</a>
                    <a href="#projeto">Projeto</a>
                    <a href="#repository">Repositório</a>
                </nav>

                <Link to="/login" className="login-button">
                    Login
                </Link>
            </header>

            <section className="hero">
                <div className="hero-content">
                    <p className="hero-label">
                        TECNOLOGIA E ACESSIBILIDADE
                    </p>

                    <h1>CECODE</h1>

                    <p className="hero-subtitle">
                        Uma ferramenta para auxiliar a aprendizagem
                        do sistema braile.
                    </p>
                </div>

                <DeviceScroll />
            </section>

            <section className="about-section" id="sobre">
                <div className="about-content">
                    <p className="section-label">
                        SOBRE O CECODE
                    </p>

                    <h2>
                        Tecnologia para tornar o aprendizado
                        do braile mais acessível.
                    </h2>

                    <p>
                        O CECODE utiliza tecnologia, fabricação digital
                        e recursos de acessibilidade para auxiliar no
                        aprendizado do sistema braile de forma prática
                        e interativa.
                    </p>
                </div>
            </section>

            <section className="project-section" id="projeto">
                <div className="project-content">
                    <p className="section-label">
                        O PROJETO
                    </p>

                    <h2>Do texto para o braile.</h2>

                    <p>
                        O sistema recebe um texto, realiza sua conversão
                        para braile e utiliza um dispositivo físico para
                        representar as células por meio de acionamento
                        mecânico.
                    </p>

                    <Link
                        to="/login"
                        className="project-button"
                    >
                        Conheça o projeto
                    </Link>
                </div>
            </section>

            <footer className="footer" id="repository">
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

                    <Link to="/">Home</Link>
                    <a href="#sobre">Sobre</a>
                    <a href="#projeto">Projeto</a>
                </div>

                <div className="footer-column">
                    <h4>Projeto</h4>

                    <a href="#repository">Repositório</a>
                    <a href="#projeto">Documentação</a>
                    <Link to="/login">Login</Link>
                </div>

                <div className="footer-bottom">
                    <span>© 2026 CECODE</span>
                    <span>Projeto acadêmico</span>
                </div>
            </footer>
        </main>
    );
}

export default Home;