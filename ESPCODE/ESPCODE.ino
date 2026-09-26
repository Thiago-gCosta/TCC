#include <WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

const char* SSID = "";
const char* SENHA = "";

const char* SERVER_IP = "";
const int SERVER_PORT = 3000;
const char* SERVER_PATH = "/esp32";

WebSocketsClient webSocket;

const int GPIO_BRAILLE[6] = {
    13, 14, 16, 17, 18, 19
};

const int GPIO_BOTAO = 25;

JsonDocument dadosDoc;
JsonArray dadosBraille;

int indiceAtual = 0;

bool traducaoAtiva = false;
bool modoAutomatico = false;
bool repousoManual = false;

unsigned long inicioCelula = 0;
unsigned long inicioUsoManual = 0;
unsigned long ultimoDebounce = 0;

unsigned long tempoLeitura = 1000;

const unsigned long TEMPO_REPOUSO = 60000;
const unsigned long TEMPO_DEBOUNCE = 50;

bool estadoBotaoEstavel = HIGH;

void desligarCelula() {
    for (int i = 0; i < 6; i++) {
        digitalWrite(GPIO_BRAILLE[i], LOW);
    }
}

void executarCelula(JsonArray celula) {
    Serial.println();
    Serial.print("Executando célula ");
    Serial.println(indiceAtual + 1);

    for (int i = 0; i < 6; i++) {
        int estado = celula[i];

        digitalWrite(
            GPIO_BRAILLE[i],
            estado == 1 ? HIGH : LOW
        );

        Serial.print("GPIO ");
        Serial.print(GPIO_BRAILLE[i]);
        Serial.print(" -> ");
        Serial.println(
            estado == 1 ? "ON" : "OFF"
        );
    }
}

void finalizarTraducao() {
    desligarCelula();

    traducaoAtiva = false;
    repousoManual = false;
    indiceAtual = 0;

    Serial.println();
    Serial.println("TRADUÇÃO FINALIZADA");
}

void entrarEmRepouso() {
    desligarCelula();

    repousoManual = true;

    Serial.println();
    Serial.println("MODO DE REPOUSO");
    Serial.print("Célula preservada: ");
    Serial.println(indiceAtual + 1);
}

void sairDoRepouso() {
    repousoManual = false;

    executarCelula(
        dadosBraille[indiceAtual]
    );

    inicioUsoManual = millis();

    Serial.println();
    Serial.print("Célula ");
    Serial.print(indiceAtual + 1);
    Serial.println(" reativada.");
}

void iniciarTraducao(
    JsonArray dados,
    const char* modo,
    unsigned long tempo
) {
    if (dados.isNull()) {
        Serial.println("Dados Braille inválidos.");
        return;
    }

    if (
        strcmp(modo, "automatico") != 0 &&
        strcmp(modo, "manual") != 0
    ) {
        Serial.println("Modo inválido.");
        return;
    }

    dadosDoc.clear();
    dadosDoc["dados"] = dados;

    dadosBraille =
        dadosDoc["dados"].as<JsonArray>();

    indiceAtual = 0;
    modoAutomatico =
        strcmp(modo, "automatico") == 0;

    tempoLeitura = tempo;
    traducaoAtiva = true;
    repousoManual = false;

    Serial.println();
    Serial.println("NOVA TRADUÇÃO");
    Serial.print("Modo: ");
    Serial.println(modo);

    if (modoAutomatico) {
        Serial.print("Tempo por célula: ");
        Serial.print(tempoLeitura);
        Serial.println(" ms");
    } else {
        Serial.println(
            "Proteção de repouso: 60 segundos"
        );
    }

    Serial.print("Quantidade de células: ");
    Serial.println(dadosBraille.size());

    executarCelula(
        dadosBraille[indiceAtual]
    );

    inicioCelula = millis();

    if (!modoAutomatico) {
        inicioUsoManual = millis();
    }
}

void processarTraducao() {
    if (!traducaoAtiva || !modoAutomatico) {
        return;
    }

    unsigned long agora = millis();

    if (
        agora - inicioCelula <
        tempoLeitura
    ) {
        return;
    }

    desligarCelula();

    indiceAtual++;

    if (
        indiceAtual >=
        dadosBraille.size()
    ) {
        finalizarTraducao();
        return;
    }

    executarCelula(
        dadosBraille[indiceAtual]
    );

    inicioCelula = millis();
}

void processarRepousoManual() {
    if (
        !traducaoAtiva ||
        modoAutomatico ||
        repousoManual
    ) {
        return;
    }

    if (
        millis() - inicioUsoManual >=
        TEMPO_REPOUSO
    ) {
        entrarEmRepouso();
    }
}

void avancarCelulaManual() {
    if (
        !traducaoAtiva ||
        modoAutomatico
    ) {
        return;
    }

    if (repousoManual) {
        sairDoRepouso();
        return;
    }

    desligarCelula();

    indiceAtual++;

    if (
        indiceAtual >=
        dadosBraille.size()
    ) {
        finalizarTraducao();
        return;
    }

    executarCelula(
        dadosBraille[indiceAtual]
    );

    inicioUsoManual = millis();
}

void processarBotao() {
    bool leitura = digitalRead(GPIO_BOTAO);

    if (leitura != estadoBotaoEstavel) {
        ultimoDebounce = millis();
    }

    if (
        millis() - ultimoDebounce >=
        TEMPO_DEBOUNCE
    ) {
        if (leitura != estadoBotaoEstavel) {
            estadoBotaoEstavel = leitura;

            if (estadoBotaoEstavel == LOW) {
                avancarCelulaManual();
            }
        }
    }
}

void processarMensagem(uint8_t* payload) {
    Serial.println();
    Serial.println("Mensagem recebida:");
    Serial.println((char*)payload);

    JsonDocument doc;

    DeserializationError erro =
        deserializeJson(doc, payload);

    if (erro) {
        Serial.print("Erro no JSON: ");
        Serial.println(erro.c_str());
        return;
    }

    const char* tipo = doc["tipo"];

    if (
        tipo == nullptr ||
        strcmp(tipo, "braile") != 0
    ) {
        Serial.println("Mensagem ignorada.");
        return;
    }

    const char* modo = doc["modo"];

    if (modo == nullptr) {
        Serial.println("Modo não informado.");
        return;
    }

    unsigned long tempo = 1000;

    if (
        strcmp(modo, "automatico") == 0
    ) {
        if (doc["tempo"].isNull()) {
            Serial.println("Tempo não informado.");
            return;
        }

        tempo =
            doc["tempo"].as<unsigned long>();

        if (tempo == 0) {
            Serial.println("Tempo inválido.");
            return;
        }
    }

    JsonArray dados =
        doc["dados"].as<JsonArray>();

    iniciarTraducao(
        dados,
        modo,
        tempo
    );
}

void webSocketEvent(
    WStype_t type,
    uint8_t* payload,
    size_t length
) {
    switch (type) {

        case WStype_DISCONNECTED:
            Serial.println(
                "WebSocket desconectado."
            );
            break;

        case WStype_CONNECTED:
            Serial.println();
            Serial.println(
                "ESP32 conectado ao backend!"
            );
            break;

        case WStype_TEXT:
            processarMensagem(payload);
            break;

        default:
            break;
    }
}

void setup() {
    Serial.begin(115200);

    delay(1000);

    Serial.println();
    Serial.println("CECODE - ESP32");

    for (int i = 0; i < 6; i++) {
        pinMode(
            GPIO_BRAILLE[i],
            OUTPUT
        );

        digitalWrite(
            GPIO_BRAILLE[i],
            LOW
        );
    }

    pinMode(
        GPIO_BOTAO,
        INPUT_PULLUP
    );

    Serial.print("Conectando ao Wi-Fi");

    WiFi.begin(
        SSID,
        SENHA
    );

    while (
        WiFi.status() != WL_CONNECTED
    ) {
        delay(500);
        Serial.print(".");
    }

    Serial.println();
    Serial.println("Wi-Fi conectado!");

    Serial.print("IP do ESP32: ");
    Serial.println(WiFi.localIP());

    Serial.println(
        "Conectando ao WebSocket..."
    );

    webSocket.begin(
        SERVER_IP,
        SERVER_PORT,
        SERVER_PATH
    );

    webSocket.onEvent(
        webSocketEvent
    );

    webSocket.setReconnectInterval(
        5000
    );
}

void loop() {
    webSocket.loop();

    processarTraducao();
    processarRepousoManual();
    processarBotao();
}