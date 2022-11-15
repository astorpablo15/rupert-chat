const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
const express = require("express");

const app = express();
const httpServer = new HttpServer(app);
const ioServer = new IoServer(httpServer);

module.exports = {
  httpServer,
  ioServer,
  app,
};
