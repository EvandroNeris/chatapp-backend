const { Schema, model } = require('mongoose');

const ContactsSchema = new Schema({
  email: [{            
    type: Schema.Types.String,
    ref: 'Users',
  }],
  user: [{            
    type: Schema.Types.ObjectId,
    ref: 'Users',
  }],
  name:[{            
    type: Schema.Types.String,
    ref: 'Users',
  }],
  phone: [{            
    type: Schema.Types.String,
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
