const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

function authenticate(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(
            new AppError("Token não informado.", 401)
        );
    }

    const [, token] = authHeader.split(" ");

    try {

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = payload;

        next();

    } catch (error) {

        return next(
            new AppError("Token inválido.", 401)
        );

    }

}

module.exports = authenticate;