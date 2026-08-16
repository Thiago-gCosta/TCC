const express = require("express");

const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const braileRoutes = require("./braileRoutes");
const historicoRoutes = require("./historicoRoutes");

router.use("/auth", authRoutes);
router.use("/usuarios", userRoutes);
router.use("/braile", braileRoutes);
router.use("/historicos", historicoRoutes);

module.exports = router;