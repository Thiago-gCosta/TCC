const API_URL = "http://localhost:3000";

export async function requisicao(endpoint, opcoes = {}) {
    const resposta = await fetch(`${API_URL}${endpoint}`, {
        ...opcoes,
        headers: {
            "Content-Type": "application/json",
            ...(opcoes.headers || {})
        }
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        throw new Error(
            dados.message || "Ocorreu um erro na requisição."
        );
    }

    return dados;
}