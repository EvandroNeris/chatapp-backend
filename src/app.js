const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const auth = require('./middlewares/Auth');

class AppController {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(cors());
        this.express.use(auth);
    }

    routes() {
        this.express.use(routes);
    }
}

module.exports = new AppController().express;
