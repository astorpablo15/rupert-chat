const messagesService = require( "../services/messages/messages.service");

class ChatEventList {
  constructor(){}

  // Este metodo se ejecuta al momento de inicializarse la coneccion
  // Es utilizado dentro del metodo de configuracion de una instancia de SocketConfig
  async execOnConnection(socket){
    const messages = await messagesService.getMessages();
    socket.emit('UPDATE_MESSAGES', messages.data);
  }

  async getListenEvents() {
    return [
      {
        name: "NEW_MESSAGE_TO_SERVER",
        callback: async (io, _socket, data) => {

          // Aqui se ejecuta la logica del evento escuchado
          await messagesService.createMesage(data);
          io.sockets.emit('NEW_MESSAGE_FROM_SERVER', data);
        },
      },
    ];
  }
}
module.exports = ChatEventList