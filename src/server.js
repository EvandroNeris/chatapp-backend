const app = require('./app');
const mongoose = require('mongoose');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    console.log('User connected', socket.id);
    const { user } = socket.handshake.query;

    connectedUsers[user] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

const port = 7002;

/**
 *  Database connection
 */

mongoose.connect('mongodb+srv://chatdb:chatdb@cluster0-axbx2.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

/**
 *  Server database
 */

app.listen(process.env.PORT || port, () => {
    console.log(`Server started on port ${port}`);
});
