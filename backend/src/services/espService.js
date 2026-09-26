const {
    enviarParaESP32
} = require("../websocket/websocketServer");

class EspService {

    async enviar(
        dadosESP,
        modo,
        velocidadeLeitura
    ) {

        console.log(
            "Dados preparados para envio ao ESP32:"
        );

        console.log(
            JSON.stringify(dadosESP)
        );

        console.log(
            `Modo de operação: ${modo}`
        );

        if (modo === "automatico") {

            console.log(
                `Velocidade de leitura: ${velocidadeLeitura} ms`
            );

        }

        const dados = {

            tipo: "braile",

            modo,

            dados: dadosESP

        };

        // O tempo só é enviado no modo automático
        if (modo === "automatico") {

            dados.tempo = velocidadeLeitura;

        }

        console.log("Enviando dados para ESP32...");

const resultado = enviarParaESP32(dados);

console.log("Resultado do envio:", resultado);

return resultado;

    }

}

module.exports = new EspService();