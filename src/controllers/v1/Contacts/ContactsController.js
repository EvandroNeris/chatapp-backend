const Contacts = require('../../../models/Contacts');
const Users = require('../../../models/Users');

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
            const { user, email, ...rest } = req.body;
            const findContact = await Users.findOne({ email });
            const contacts = await Contacts.create({ user: req.user, email, name: findContact.name, phone: findContact.phone, ...rest });

            return res.status(200).json(contacts);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
}