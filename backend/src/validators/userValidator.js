const { z } = require("zod");

const userSchema = z.object({
    nome: z
        .string()
        .min(2, "O nome deve possuir no mínimo 2 caracteres.")
        .max(100),

    email: z
        .email("E-mail inválido."),

    senha: z
        .string()
        .min(8, "A senha deve possuir pelo menos 8 caracteres."),

    tipoUsuario: z.enum([
        "COMPLETA",
        "PARCIAL",
        "AUXILIAR"
    ]),

    descricao: z
        .string()
        .max(500)
        .optional()
});

function validateUser(data) {
    return userSchema.parse(data);
}

module.exports = {
    userSchema,
    validateUser
};