const { SocketRouter } = require("../config/socketio");
const messagesService = require("../services/messages/messages.service");

const messageRouterEvents = new SocketRouter(async (io, socket) => {
  const messages = await messagesService.getMessages();
  io.emit("UPDATE_MESSAGES", messages.data);
});

messageRouterEvents.listen("NEW_MESSAGE_TO_SERVER", async (socket, data) => {
  // Aqui se ejecuta la logica del evento escuchado
  await messagesService.createMesage(data);
  messageRouterEvents.sendEveryone("NEW_MESSAGE_FROM_SERVER", data);
});

module.exports = messageRouterEvents;
