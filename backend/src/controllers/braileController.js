const braileService = require("../services/braileService");
const historicoService = require("../services/historicoService");
const espService = require("../services/espService");

const { validateBraile } = require("../validators/braileValidator");

class BraileController {

    async converter(req, res, next) {

        try {

            const dados = validateBraile(req.body);

            const resultado = braileService.converter(dados.texto);

            await historicoService.criar(
                req.user.id,
                dados.texto,
                resultado.dadosESP
            );

            const envio = await espService.enviar(
                resultado.dadosESP
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