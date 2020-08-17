const { Schema, model } = require('mongoose');

const ChatsSchema = new Schema({
  emitter: [{            
    type: Schema.Types.ObjectId,
    ref: 'Users',
  }],
  receptor: [{            
    type: Schema.Types.ObjectId,
    ref: 'Users',
  }],
  message: [{
    type: String,
    required: true, 
  }]
}, {
  timestamps: true,
});

module.exports = model('Chats', ChatsSchema);
