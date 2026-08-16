const prisma = require("../config/prisma");

class HistoricoService {

    async criar(usuarioId, textoOriginal, dadosESP) {

        return await prisma.historico.create({

            data: {

                usuarioId,

                textoOriginal,

                dadosESP: JSON.stringify(dadosESP)

            }

        });

    }

    async listar(usuarioId) {

        return await prisma.historico.findMany({

            where: {

                usuarioId

            },

            orderBy: {

                dataConversao: "desc"

            }

        });

    }

    async buscarPorId(id, usuarioId) {

        return await prisma.historico.findFirst({

            where: {

                id,

                usuarioId

            }

        });

    }

}

module.exports = new HistoricoService();