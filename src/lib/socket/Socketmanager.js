import { io } from "socket.io-client";

export default class SocketManager {
  static socketRequestBind = (socket) => (event, data) =>
    new Promise((resolve, reject) => {
      const timeoutId = setTimeout(
        () => reject(new Error("Socket time out")),
        30000
      );
      socket.emit(event, data, (response) => {
        clearTimeout(timeoutId);
        try {
          if (response.code === 0) {
            resolve(response.data);
          } else {
            console.log(
              `Socket Error: ${socket.nsp}:${event}\n${response.message || response.msg}`
            );
            reject(new Error(response.msg || response.message, response.code));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

  static socket = (namespace) => {
    return io(namespace);
  };
}
