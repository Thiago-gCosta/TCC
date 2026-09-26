const braileService = require("../services/braileService");
const historicoService = require("../services/historicoService");
const espService = require("../services/espService");
const userService = require("../services/userService");

const { validateBraile } = require("../validators/braileValidator");

class BraileController {

    async converter(req, res, next) {

        try {

            const dados = validateBraile(req.body);

            const resultado = braileService.converter(
                dados.texto
            );

            await historicoService.criar(
                req.user.id,
                dados.texto,
                resultado.dadosESP
            );

            // Busca a configuração do usuário
            const configuracao =
                await userService.obterConfiguracao(
                    req.user.id
                );

            // Envia os dados para o ESP32
            const envio = await espService.enviar(
                resultado.dadosESP,
                dados.modo,
                configuracao.velocidadeLeitura
            );

            return res.status(200).json({

                message: "Texto convertido com sucesso.",

                ...resultado,

                envio

            });

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new BraileController();