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
  // Metodo que configura una lista de eventos de distintos recursos al momento de realizar la primer inicializacion
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
  // Este metodo sirve para en caso de que se deba emitir un evento desde el servidor desde algun
  // otro lugar de nuestra aplicacion.
  // Solo deberia ser necesario importar la instancia de esta clase y llamar al metodo
  emitEvent(name, data) {
    this.io.emit(name, data);
  }
}

module.exports = SocketConfig