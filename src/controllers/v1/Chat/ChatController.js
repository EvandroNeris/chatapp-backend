const Chats = require('../../../models/Chat');

module.exports = {
    async index(req, res) {
        
        try {
            const { id } = req.params;
            
            const message = await Chats.find({
                                    $and: [
                                        { emitter: req.user },
                                        { receptor: id}
                                    ] 
                                });

            return res.status(200).json(message);
        } catch(err) {
            return res.status(400).json(err);
        }
    },

    async save(req, res) {
        console.log(req.connectedUsers)
        try {
            const { emitter, receptor, ...rest } = req.body;
            const id = req.user
            const loggedSocket = req.connectedUsers[id];
            const targetSocket = req.connectedUsers[receptor];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('message', targetDev);
            }

            if (targetSocket) {
                req.io.to(targetSocket).emit('message', loggedDev);
            }

            const message = await Chats.create({ emitter: id, receptor, ...rest });

            return res.status(200).json(message);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
}