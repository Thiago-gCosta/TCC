const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const historicoController = require("../controllers/historicoController");

router.get(
    "/",
    authMiddleware,
    historicoController.listar
);

router.get(
    "/:id",
    authMiddleware,
    historicoController.buscarPorId
);

module.exports = router;