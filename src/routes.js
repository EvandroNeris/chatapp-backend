const { Router } = require('express');
const UsersController = require('./controllers/v1/Users/UsersController');
const AuthController = require('./controllers/v1/Auth/AuthController');
const ChatController = require('./controllers/v1/Chat/ChatController');
const ContactController = require('./controllers/v1/Contacts/ContactsController');

const routes = Router();

routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.getOne);
routes.post('/users', UsersController.save);
routes.post('/users/uploads', UsersController.upload);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

routes.post('/users/auth', AuthController.login);

routes.get('/chats/:id', ChatController.index);
routes.post('/chats', ChatController.save);

routes.get('/contacts', ContactController.index);
routes.post('/contacts', ContactController.save);

module.exports = routes;
