const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true, 
    },
    avatar: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

UsersSchema.pre('save', async function hashPassword(next) {
    if (!this.isModified('password')) next();

    this.password = await bcrypt.hash(this.password, 8);
});

// UsersSchema.methods.compareHash = async (hash) => {
//     console.log(hash);
//     console.log(this.password);
//     return bcrypt.compare(hash, this.password);
// };

UsersSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id }, "chatappsecret");
}

module.exports = model('Users', UsersSchema);