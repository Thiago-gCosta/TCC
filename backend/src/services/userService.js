const prisma = require("../config/prisma");
const AppError = require("../errors/AppError");
const bcrypt = require("bcrypt");

class UserService {

    async create(data) {

        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                email: data.email
            }
        });

        if (usuarioExistente) {
            throw new AppError("E-mail já cadastrado.", 409);
        }

        const senhaCriptografada = await bcrypt.hash(data.senha, 10);

        const usuario = await prisma.usuario.create({
            data: {
                ...data,
                senha: senhaCriptografada
            }
        });

        const { senha, ...usuarioSemSenha } = usuario;

        return {
            message: "Usuário cadastrado com sucesso.",
            usuario: usuarioSemSenha
        };

    }

    async me(id) {

        const usuario = await prisma.usuario.findUnique({
            where: {
                id
            }
        });

        if (!usuario) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        const { senha, ...usuarioSemSenha } = usuario;

        return usuarioSemSenha;

    }
    async findAll() {

    }

    async findById(id) {

    }

    async update(id, data) {

    }

    async delete(id) {

    }

}

module.exports = new UserService();