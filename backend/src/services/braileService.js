const braileAlphabet = require("../utils/braileAlphabet");

class BraileService {

    converter(texto) {

        const celulas = [];
        const dadosESP = [];

        texto = texto.toUpperCase();

        for (const caractere of texto) {

            const pontos = braileAlphabet[caractere] || null;

            celulas.push({
                caractere,
                encontrado: !!pontos,
                pontos
            });

            if (pontos) {
                dadosESP.push(pontos);
            }

        }

        return {
            texto,
            quantidadeCaracteres: texto.length,
            celulas,
            dadosESP
        };

    }

}

module.exports = new BraileService();