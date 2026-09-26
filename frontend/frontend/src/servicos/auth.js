import { requisicao } from "./api";

export async function login(email, senha) {
    const dados = await requisicao("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            senha
        })
    });

    localStorage.setItem("token", dados.token);

    return dados;
}

export async function cadastrar(
    nome,
    email,
    senha,
    tipoUsuario
) {
    const dados = await requisicao("/usuarios", {
        method: "POST",
        body: JSON.stringify({
            nome,
            email,
            senha,
            tipoUsuario
        })
    });

    return dados;
}

export function obterToken() {
    return localStorage.getItem("token");
}

export function logout() {
    localStorage.removeItem("token");
}