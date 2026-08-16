const { z } = require("zod");

const braileSchema = z.object({

    texto: z
        .string()
        .trim()
        .min(1, "O texto não pode estar vazio.")
        .max(500, "O texto deve possuir no máximo 500 caracteres.")

});

function validateBraile(data) {
    return braileSchema.parse(data);
}

module.exports = {
    braileSchema,
    validateBraile
};