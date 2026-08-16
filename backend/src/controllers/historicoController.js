const historicoService = require("../services/historicoService");

class HistoricoController {

    async listar(req, res, next) {

        try {

            const historicos = await historicoService.listar(req.usuario.id);

            return res.status(200).json(historicos);

        } catch (error) {

            next(error);

        }

    }

    async buscarPorId(req, res, next) {

        try {

            const historico = await historicoService.buscarPorId(

                req.params.id,
                req.usuario.id

            );

            return res.status(200).json(historico);

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new HistoricoController();