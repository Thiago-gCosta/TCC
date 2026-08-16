const express = require("express");

const router = express.Router();

const braileController = require("../controllers/braileController");

const authenticateToken = require("../middleware/authMiddleware");

router.post(
    "/converter",
    authenticateToken,
    braileController.converter
);

module.exports = router;