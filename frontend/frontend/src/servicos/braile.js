import { requisicao } from "./api";
import { obterToken } from "./auth";

export async function converterBraile(texto, modo) {
    const token = obterToken();

    const dados = await requisicao("/braile/converter", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            texto,
            modo
        })
    });

    return dados;
}