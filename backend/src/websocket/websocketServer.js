const WebSocket = require("ws");

let esp32 = null;

console.log("WEBSOCKET SERVER CARREGADO");

// ==============================
// INICIAR WEBSOCKET
// ==============================

function iniciarWebSocket(server) {

    const wss = new WebSocket.Server({

        server,

        path: "/esp32"

    });

    wss.on("connection", (socket) => {

        console.log();
        console.log("================================");
        console.log("ESP32 CONECTADO");
        console.log("================================");

        console.log(
            "NOVO SOCKET ESP32:",
            socket.readyState
        );

        console.log("CONNECTION RECEBIDA!");

        // Guarda o socket do ESP32
        esp32 = socket;

        console.log(
            "ESP32 AGORA É:",
            esp32 !== null
        );

        // ==============================
        // MENSAGEM RECEBIDA DO ESP32
        // ==============================

        socket.on("message", (message) => {

            console.log();

            console.log(
                "Mensagem recebida do ESP32:",
                message.toString()
            );

        });

        // ==============================
        // ESP32 DESCONECTADO
        // ==============================

        socket.on("close", () => {

            console.log();
            console.log(
                "ESP32 desconectado."
            );

            if (esp32 === socket) {

                esp32 = null;

                console.log(
                    "Socket ESP32 removido."
                );

            }

        });

        // ==============================
        // ERRO
        // ==============================

        socket.on("error", (error) => {

            console.error(
                "Erro no WebSocket:",
                error.message
            );

        });

    });

    console.log(
        "Servidor WebSocket iniciado em /esp32."
    );

}

// ==============================
// ENVIAR DADOS PARA ESP32
// ==============================

function enviarParaESP32(dados) {

    console.log();
    console.log(
        "Tentando enviar dados para o ESP32..."
    );

    console.log(
        "SOCKET ATUAL:",
        esp32
    );

    console.log(
        "READY STATE:",
        esp32?.readyState
    );

    // ==============================
    // VERIFICAR CONEXÃO
    // ==============================

    if (
        !esp32 ||
        esp32.readyState !== WebSocket.OPEN
    ) {

        console.log(
            "ESP32 não está conectado."
        );

        return {

            enviado: false,

            conectado: false,

            mensagem: "ESP32 não conectado."

        };

    }

    // ==============================
    // ENVIAR
    // ==============================

    esp32.send(
        JSON.stringify(dados)
    );

    console.log(
        "Dados enviados para o ESP32."
    );

    return {

        enviado: true,

        conectado: true,

        mensagem: "Dados enviados ao ESP32."

    };

}

// ==============================
// EXPORTAÇÕES
// ==============================

module.exports = {

    iniciarWebSocket,

    enviarParaESP32

};