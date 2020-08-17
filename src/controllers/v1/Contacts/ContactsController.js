const Contacts = require('../../../models/Contacts');
const Users = require('../../../models/Users');

module.exports = {
  async index(req, res) {
    try {
      const { user } = req;

      const message = await Contacts.find({ user });

      return res.status(200).json(message);
    } catch(err) {
      return res.status(400).json(err);
    }
  },

  async save(req, res) {
    try {
      const { email } = req.body;

      const findContact = await Users.findOne({ email });

      if (findContact) res.status(200).json({ message: 'Contact already exists' });
      
      const contacts = await Contacts.create(req.body);

      return res.status(200).json(contacts);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}