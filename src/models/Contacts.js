const { Schema, model } = require('mongoose');

const ContactsSchema = new Schema({
    contact: [{            
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }],
    user: [{            
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }],
    lastMessage: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
});


module.exports = model('Contacts', ContactsSchema);