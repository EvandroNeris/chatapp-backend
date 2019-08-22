const Contacts = require('../../../models/Contacts');

module.exports = {
    async index(req, res) {
        try {
            
            const message = await Contacts.find({ user: req.user });

            return res.status(200).json(message);
        } catch(err) {
            return res.status(400).json(err);
        }
    },

    async save(req, res) {
        try {
            const { user, contact, ...rest } = req.body;

            const contacts = await Contacts.create({ user: req.user, contact, ...rest });

            return res.status(200).json(contacts);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
}