const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", userController.create);
router.get("/me", authMiddleware, userController.me);

module.exports = router;