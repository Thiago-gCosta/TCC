class EspService {

    async enviar(dadosESP) {

        console.log("Dados preparados para envio ao ESP32:");

        console.log(JSON.stringify(dadosESP));

        return {
            enviado: false,
            conectado: false,
            mensagem: "ESP32 ainda não conectado."
        };

    }

}

module.exports = new EspService();