


  const connection = (client) => {
    // event fired when the chat room is disconnected
    // client.on("disconnect", () => {
    //   users = users.filter((user) => user.socketId !== client.id);
    // });
    // add identity of user mapped to the socket id
    global.users.push({
        socketId: client.id,
        userId: "userId",
    });
    client.on("identity", (userId) => {
      global.users.push({
        socketId: client.id,
        userId: userId,
      });
      
    });
    // subscribe person to chat & other user as well
    client.on("subscribe", (room, otherUserId = "") => {
      this.subscribeOtherUser(room, otherUserId);
      client.join(room);
    });
    // mute a chat room
    client.on("unsubscribe", (room) => {
      client.leave(room);
    });
    console.log("Here is user",global.users)
  }

  const subscribeOtherUser = (room, otherUserId) => {
    const userSockets = users.filter(
      (user) => user.userId === otherUserId
    );
    userSockets.map((userInfo) => {
      const socketConn = global.io.sockets.connected(userInfo.socketId);
      if (socketConn) {
        socketConn.join(room);
      }
    });
  }
  
module.exports =  { connection, subscribeOtherUser};
  