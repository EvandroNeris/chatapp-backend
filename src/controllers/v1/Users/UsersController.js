const Users = require('../../../models/Users');

module.exports = {
  async index(req, res) {
    try {
      const users = await Users.find();

      return res.status(200).json(users);
    } catch(err) {
      return res.status(400).json(err);
    }
  },

  async getOne(req, res) {
    try {
      const { id } = req.params;

      const user = await Users.findById(id);

      return res.status(200).json(user);
    } catch(err) {
        return res.status(400).json(err);
    }
  },

  async save(req, res) {
    try {
      const user = new Users();

      const { email } = req.body;

      const userExists = await Users.findOne({ email });

      if (userExists) res.status(200).json({userExists, message: 'User already exists'})

      const users = await Users.create(req.body);

      return res.status(200).json({users, token: user.generateToken()});
    } catch(err) {
      return res.status(400).json(err);
    }
  },

  async upload(req, res) {
    try {
      const { id, avatar } = req.params;

      const userExists = await Users.findOne({ id });

      if (!userExists) res.status(400).json({ message: 'User does not exits' });
      
      const users = await Users.create({ avatar });

      return res.status(200).json(users);
    } catch(err) {
      return res.status(400).json(err);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const userExists = await Users.findOne({ id });

      if (!userExists) res.status(400).json({ message: 'User does not exits' });
      
      const users = await Users.update({ id }, req.body);

      return res.status(200).json(users);
    } catch(err) {
      return res.status(400).json(err);
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const userExists = await Users.findOne({ id });

      if (!userExists) res.status(400).json({ message: 'User does not exits' });
      
      const users = await Users.delete({ id }, req.body);

      return res.status(200).json(users);
    } catch(err) {
      return res.status(400).json(err);
    }
  }
}