const express = require('express');
const {Server: HttpServer} = require('http');
const indexRouter = require('./src/routes/index');
const errorHandler = require('./src/middlewares/errorHandler');
const SocketConfig = require('./src/config/socketio');
const ChatEventList = require('./src/sockets/chat.events');
require('dotenv').config();


const app = express();
const httpServer = new HttpServer(app);

// Aqui se deben pasar a la instancia de SocketConfig, el httpServer y una lista de clases
// del tipo EventList
const socketInstance = new SocketConfig(httpServer, [ChatEventList])

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'));
app.use('/api', indexRouter);

app.use(errorHandler);

module.exports = {httpServer, socketInstance};