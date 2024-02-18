const User = require("../model/userModel");
const Group = require('../model/groupModel');

// Controlador para crear el grupo
exports.createGroup = async (req, res, next) => {
    try {
      // Busca todos los usuarios registrados
      const users = await User.find();
  
      // Crea el grupo con todos los usuarios como miembros
      const group = new Group({ name: 'Grupo Predeterminado', members: users.map(user => user._id) });
      await group.save();
  
      res.status(201).json(group);
    } catch (error) {
      next(error);
    }
  };

  // Controlador para obtener mensajes del grupo
exports.getGroupMessages = async (req, res, next) => {
    try {
      const group = await Group.findById(req.params.groupId).populate('members').exec();
  
      // Aquí puedes recuperar los mensajes del grupo y enviarlos como respuesta
      res.json(group.messages);
    } catch (error) {
      next(error);
    }
  };