const WebSocket = require("ws");

let esp32 = null;

function iniciarWebSocket(server) {

    const wss = new WebSocket.Server({
        server,
        path: "/esp32"
    });

    wss.on("connection", (socket) => {

        console.log("ESP32 conectado ao WebSocket.");

        esp32 = socket;

        socket.on("message", (message) => {

            console.log(
                "Mensagem recebida do ESP32:",
                message.toString()
            );

        });

        socket.on("close", () => {

            console.log("ESP32 desconectado.");

            if (esp32 === socket) {
                esp32 = null;
            }

        });

        socket.on("error", (error) => {

            console.error(
                "Erro no WebSocket:",
                error.message
            );

        });

    });

    console.log("Servidor WebSocket iniciado em /esp32.");

}

function enviarParaESP32(dados) {

    if (!esp32 || esp32.readyState !== WebSocket.OPEN) {

        return {
            enviado: false,
            conectado: false,
            mensagem: "ESP32 não conectado."
        };

    }

    esp32.send(
        JSON.stringify(dados)
    );

    return {
        enviado: true,
        conectado: true,
        mensagem: "Dados enviados ao ESP32."
    };

}

module.exports = {
    iniciarWebSocket,
    enviarParaESP32
};