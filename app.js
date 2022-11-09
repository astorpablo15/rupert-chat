const express = require('express');
const {Server: HttpServer} = require('http');
const {Server: IoServer} = require('socket.io');
const indexRouter = require('./src/routes/index');
const MessagesService = require('./src/services/messages/messages.service');
const errorHandler = require('./src/middlewares/errorHandler');
require('dotenv').config();

const messageService = new MessagesService();

const app = express();
const http = new HttpServer(app);
const io = new IoServer(http);

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'));
app.use('/api', indexRouter);

app.use(errorHandler);

io.on('connection', async (socket) => {
    const messages = await messageService.getMessages();
    console.info('Nuevo cliente conectado')
    socket.emit('UPDATE_DATA', messages.data);
    socket.on('NEW_MESSAGE_TO_SERVER', async data => {
        await messageService.createMesage(data)
        io.sockets.emit('NEW_MESSAGE_FROM_SERVER', data);
    })
})

module.exports = http;