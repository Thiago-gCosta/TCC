const { z } = require("zod");

const loginSchema = z.object({

    email: z
        .email("E-mail inválido."),

    senha: z
        .string()
        .min(1, "A senha é obrigatória.")

});

function validateLogin(data) {
    return loginSchema.parse(data);
}

module.exports = {
    loginSchema,
    validateLogin
};