// Define el modelo de grupo
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isGroupChat: { type: Boolean, default: false },
    // Otros campos según tus necesidades
  });
  

module.exports = mongoose.model('Group', groupSchema);



