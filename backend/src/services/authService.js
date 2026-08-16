const prisma = require("../config/prisma");
const AppError = require("../errors/AppError");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

class AuthService {

    async login(data) {

        const usuario = await prisma.usuario.findUnique({
            where: {
                email: data.email
            }
        });

        if (!usuario) {
            throw new AppError(
                "E-mail ou senha inválidos.",
                401
            );
        }

        const senhaValida = await bcrypt.compare(
            data.senha,
            usuario.senha
        );

        if (!senhaValida) {
            throw new AppError(
                "E-mail ou senha inválidos.",
                401
            );
        }

        await prisma.usuario.update({
            where: {
                id: usuario.id
            },
            data: {
                ultimoAcesso: new Date()
            }
        });

        const token = generateToken(usuario);

        const { senha, ...usuarioSemSenha } = usuario;

        return {
            message: "Login realizado com sucesso.",
            usuario: usuarioSemSenha,
            token
        };

    }

    async refresh(token) {

    }

    async logout(id) {

    }

}

module.exports = new AuthService();