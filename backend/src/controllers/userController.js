const userService = require("../services/userService");

class UserController {

    async create(req, res, next) {

        try {

            const resultado = await userService.create(req.body);

            return res.status(201).json(resultado);

        } catch (error) {
            next(error);
        }

    }

    async findAll(req, res, next) {

    }

    async findById(req, res, next) {

    }

    async update(req, res, next) {

    }

    async delete(req, res, next) {

    }

    async me(req, res, next) {

    try {

        const usuario = await userService.me(req.user.id);

        return res.status(200).json(usuario);

    } catch (error) {
        next(error);
    }

}

}

module.exports = new UserController();