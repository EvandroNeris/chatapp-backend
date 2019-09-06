const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const auth = require('./middlewares/Auth');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;

    connectedUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://chatdb:chatdb@cluster0-axbx2.mongodb.net/chatapp?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});



app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(auth);

const port = 7002;

app.listen(process.env.PORT || port, () => {
    console.log(`Server started on port ${port}`);
});
