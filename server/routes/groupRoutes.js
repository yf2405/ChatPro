const express = require('express');
const router = express.Router();
const { createGroup, getGroupMessages } = require('../controllers/groupControllers');

// Ruta para crear un grupo
router.post("/groups", createGroup);

// Ruta para obtener mensajes de un grupo
router.get("/groups/:id/messages", getGroupMessages);

module.exports = router;