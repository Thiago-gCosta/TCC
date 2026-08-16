const authService = require("../services/authService");
const { validateLogin } = require("../validators/authValidator");

class AuthController {

    async login(req, res, next) {

        try {

            const dados = validateLogin(req.body);

            const resultado = await authService.login(dados);

            return res.status(200).json(resultado);

        } catch (error) {
            next(error);
        }

    }

    async refresh(req, res, next) {

    }

    async logout(req, res, next) {

    }

}

module.exports = new AuthController();