const express = require("express");
const { httpServer, app } = require("./src/config/http");
const indexRouter = require("./src/routes/index");
const errorHandler = require("./src/middlewares/errorHandler");
const {SocketConfig} = require("./src/config/socketio");
const messageSocket = require("./src/sockets/chat.events");
require("dotenv").config();


const socketConfig = new SocketConfig();
socketConfig.use(messageSocket);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.use("/api", indexRouter);

app.use(errorHandler);

module.exports = httpServer;
