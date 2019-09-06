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
        try {
            const { emitter, receptor, ...rest } = req.body;
            console.log(req.user)

            const loggedSocket = req.connectedUsers[req.user];
            const targetSocket = req.connectedUsers[receptor];

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('message', targetDev);
            }

            if (targetSocket) {
                req.io.to(targetSocket).emit('message', loggedDev);
            }

            const message = await Chats.create({ emitter: req.user, receptor, ...rest });

            return res.status(200).json(message);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
}