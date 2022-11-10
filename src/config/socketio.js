const { Server } = require("socket.io");
/**
   * Recibe como parametro el servidor http y una lista de clases sin instanciar de tipo EventList
   * @param {Server} httpServer 
   * @param {[EventList]} eventListClasses 
   */
class SocketConfig {
  constructor(httpServer, eventListClasses) {
    // Aqui se genera la instancia del ioServer
    this.io = new Server(httpServer);

    // Aqui se registran los eventos. Cada clase que exista dentro del arreglo debe 
    // poseer dos metodos:
    // .execOnConnection(socket)
    // .getListenEvents(): Events[]
    if(eventListClasses) {
      eventListClasses.forEach(eventListInstance => {
        this.configSocket(new eventListInstance(this.io))
      })
    }
  }

  configSocket(eventList) {
    this.io.on("connection", async (socket) => {
      console.info(`Nuevo cliente conectado con id ${socket.id}`)
      await eventList.execOnConnection(socket);
      const events = await eventList.getListenEvents()
      if (events) {
        events.forEach((socketEvent) => {
          socket.on(socketEvent.name, (data) => {
            socketEvent.callback(socket, data);
          });
        });
      }
    });
  }

  emitEvent(name, data) {
    this.io.emit(name, data);
  }
}

module.exports = SocketConfig