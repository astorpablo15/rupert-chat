const { ioServer } = require("./http");

class SocketRouter {
  constructor(initializer = () => {}) {
    this.io = ioServer;
    this.initializer = initializer
    this.events = []
  }

  _useInit(io, socket) {
    return this.initializer(io, socket)
  }

  listen(name, callback) {
    this.events.push({name, callback})
  }

  sendEveryone(eventName, data) {
    this.io.emit(eventName, data)
  }
}

class SocketConfig {
  constructor() {
    this.server = ioServer;
  }

  use(socketRouter) {
    this.server.on("connection", async (socket) => {
      await socketRouter._useInit(this.server, socket)
      socketRouter.events.forEach(event => {
        // TODO
        socket.on(event.name, (data) => {
          event.callback(socket, data)
        })
      })
    });
  }
}

module.exports = { SocketRouter, SocketConfig };
