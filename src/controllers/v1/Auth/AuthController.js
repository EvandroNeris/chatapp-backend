const Users = require('../../../models/Users');
const bcrypt = require('bcryptjs');

module.exports = {
    async login(req, res) {
        try {
            const user = new Users();
            const { email, password } = req.body;

            const users = await Users.findOne({ email });
            
            if (!users) {
                return res.status(200),json('User not found');
            }
            
            if (!bcrypt.compare(password, users.password)) {
                return res.status(400).json('Invalid password');
            }

            return res.status(200).json({users, token: user.generateToken()});
        } catch (err) {
            return res.status(400).json('User authentication failed');
        }
    }
}