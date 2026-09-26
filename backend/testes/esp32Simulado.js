const WebSocket = require("ws");

const ESP32_URL = "ws://localhost:3000/esp32";

// ==============================
// SIMULAÇÃO DOS GPIOs
// ==============================

const GPIO_BRAILLE = [
    13,
    14,
    16,
    17,
    18,
    19
];

// ==============================
// ESTADO DO ESP32
// ==============================

let celulas = [];

let indiceAtual = 0;

let modoAtual = null;

let tempoLeitura = 1000;

let executando = false;

// ==============================
// CONEXÃO COM O BACKEND
// ==============================

console.log("Iniciando ESP32 simulado...");

console.log(`Conectando em: ${ESP32_URL}`);

const socket = new WebSocket(ESP32_URL);

// ==============================
// CONEXÃO ESTABELECIDA
// ==============================

socket.on("open", () => {

    console.log(
        "ESP32 simulado conectado ao WebSocket."
    );

});

// ==============================
// RECEBIMENTO DE MENSAGEM
// ==============================

socket.on("message", (message) => {

    console.log();

    console.log(
        "Mensagem recebida do backend:"
    );

    try {

        const dados = JSON.parse(
            message.toString()
        );

        console.log(
            JSON.stringify(dados, null, 2)
        );

        if (dados.tipo === "braile") {

            iniciarTraducao(dados);

            return;
        }

        if (dados.tipo === "botao") {

            processarBotao();

            return;
        }

        console.log(
            "Tipo de mensagem não reconhecido."
        );

    } catch (error) {

        console.error(
            "Mensagem recebida não é um JSON válido."
        );

    }

});

// ==============================
// INICIAR TRADUÇÃO
// ==============================

function iniciarTraducao(dados) {

    if (!Array.isArray(dados.dados)) {

        console.error(
            "Dados Braille inválidos."
        );

        return;
    }

    if (
        dados.modo !== "automatico" &&
        dados.modo !== "manual"
    ) {

        console.error(
            "Modo de operação inválido."
        );

        return;
    }

    celulas = dados.dados;

    indiceAtual = 0;

    modoAtual = dados.modo;

    console.log("MODO RECEBIDO:", dados.modo);
    console.log("MODO ATUAL:", modoAtual);
    // No automático, o tempo vem do backend.
    if (modoAtual === "automatico") {

        if (
            typeof dados.tempo !== "number" ||
            dados.tempo <= 0
        ) {

            console.error(
                "Tempo de leitura inválido."
            );

            return;
        }

        tempoLeitura = dados.tempo;

    }

    console.log();

    console.log("================================");
    console.log("       NOVA TRADUÇÃO");
    console.log("================================");

    console.log(
        `Modo: ${modoAtual}`
    );

    if (modoAtual === "automatico") {

        console.log(
            `Tempo de leitura: ${tempoLeitura} ms`
        );

    }

    executarCelula();

}

// ==============================
// EXECUTAR CÉLULA
// ==============================

async function executarCelula() {

    if (executando) {

        console.log(
            "Tradução já está em execução."
        );

        return;
    }

    if (indiceAtual >= celulas.length) {

        finalizarTraducao();

        return;
    }

    const celula = celulas[indiceAtual];

    if (
        !Array.isArray(celula) ||
        celula.length !== 6
    ) {

        console.error(
            `Célula ${indiceAtual + 1} inválida.`
        );

        indiceAtual++;

        executarCelula();

        return;
    }

    executando = true;

    console.log();

    console.log(
        `--- Célula ${indiceAtual + 1} ---`
    );

    // ==============================
    // ATIVAÇÃO DOS GPIOs
    // ==============================

    for (let i = 0; i < 6; i++) {

        const gpio = GPIO_BRAILLE[i];

        const estado = celula[i] === 1
            ? "ON"
            : "OFF";

        console.log(
            `GPIO ${gpio} → ${estado}`
        );

    }

    console.log(
        `Célula ${indiceAtual + 1} acionada.`
    );

    // ==============================
    // MODO AUTOMÁTICO
    // ==============================

    if (modoAtual === "automatico") {

        await esperar(tempoLeitura);

        desligarCelula();

        indiceAtual++;

        executando = false;

        await esperar(200);

        executarCelula();

        return;
    }

    // ==============================
    // MODO MANUAL
    // ==============================

    if (modoAtual === "manual") {

        console.log(
            "Aguardando comando do botão..."
        );

        executando = false;

    }

}

// ==============================
// DESLIGAR CÉLULA
// ==============================

function desligarCelula() {

    console.log();

    console.log(
        `Célula ${indiceAtual + 1} → DESLIGADA`
    );

    for (const gpio of GPIO_BRAILLE) {

        console.log(
            `GPIO ${gpio} → OFF`
        );

    }

}

// ==============================
// BOTÃO MANUAL
// ==============================

function processarBotao() {

    if (modoAtual !== "manual") {

        console.log(
            "Comando de botão ignorado: modo automático."
        );

        return;
    }

    if (celulas.length === 0) {

        console.log(
            "Nenhuma tradução em andamento."
        );

        return;
    }

    console.log();

    console.log(
        "BOTÃO PRESSIONADO."
    );

    desligarCelula();

    indiceAtual++;

    if (indiceAtual >= celulas.length) {

        finalizarTraducao();

        return;
    }

    executarCelula();

}

// ==============================
// FINALIZAR TRADUÇÃO
// ==============================

function finalizarTraducao() {

    desligarTodos();

    console.log();

    console.log("================================");
    console.log("    FIM DA TRADUÇÃO");
    console.log("================================");

    celulas = [];

    indiceAtual = 0;

    modoAtual = null;

    executando = false;

}

// ==============================
// DESLIGAR TODOS OS GPIOs
// ==============================

function desligarTodos() {

    console.log();

    console.log(
        "Todos os solenoides → OFF"
    );

    for (const gpio of GPIO_BRAILLE) {

        console.log(
            `GPIO ${gpio} → OFF`
        );

    }

}

// ==============================
// FUNÇÃO DE ESPERA
// ==============================

function esperar(tempo) {

    return new Promise(resolve => {

        setTimeout(resolve, tempo);

    });

}

// ==============================
// DESCONECTADO
// ==============================

socket.on("close", () => {

    console.log(
        "ESP32 simulado desconectado."
    );

});

// ==============================
// ERRO
// ==============================

socket.on("error", (error) => {

    console.error(
        "Erro no ESP32 simulado:",
        error.message
    );

});

// ==============================
// SIMULAÇÃO DO BOTÃO
// ==============================

process.stdin.setEncoding("utf8");

process.stdin.on("data", (entrada) => {

    const comando = entrada.trim().toLowerCase();

    if (comando === "b") {
        console.log();
        console.log("Simulando pressionamento do botão...");

        processarBotao();
    }

});