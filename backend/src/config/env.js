require("dotenv").config();

const requiredVariables = [
    "DATABASE_URL",
    "JWT_SECRET"
];

requiredVariables.forEach((variable) => {
    if (!process.env[variable]) {
        throw new Error(`Variável de ambiente ${variable} não encontrada.`);
    }
});

module.exports = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET
};