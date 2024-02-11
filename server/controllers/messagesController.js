const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req,res, next) =>{
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message:{text: message},
            users:[from, to],
            sender: from,
        });
        if (data) return res.json({msg:"Mensage añadido correctamente."});
        return res.json({msg:"Fallo al añadir mensage a la base de datos."});
    } catch (e) {
        next(e);
    }
};
module,exports.getAllMessage = async (req,res,next) =>{
    try {
        const { from, to} = req.body;
        const message = await messageModel.find({
            users:{
                $all:[from, to],
            },
        })
        .sort({updatedAt: 1});
        const projectMessages = message.map((msg)=>{
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
           
        });
    
        res.json(projectMessages);
    }
    catch(error){
     next(error);
    }
};


// module.exports.getAllMessage = async (req, res, next) => {
//     try {
//         Eliminamos la desestructuración de req.body, ya que no necesitamos usuarios específicos

//         Consulta todos los mensajes sin restricciones de usuario
//         const messages = await messageModel.find().sort({ updatedAt: 1 });

//         Mapea los mensajes para transformarlos en un nuevo array llamado projectMessages
//         const projectMessages = messages.map((msg) => {
//             return {
//                 fromSelf: false, // Puedes ajustar esto según tus necesidades
//                 message: msg.message.text,
//             };
//         });

//         Responde a la solicitud con el array projectMessages convertido a formato JSON
//         res.json(projectMessages);
//     } catch (error) {
//         next(error);
//     }
// };