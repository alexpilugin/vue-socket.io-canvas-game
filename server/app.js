const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

var position = {
  x: 200,
  y: 200
};

Socketio.on("connection", socket => {
  socket.emit("position", position);
  socket.on("move", data => {
    switch (data) {
      case "left":
        position.x -= 5;
        break;
      case "right":
        position.x += 5;
        break;
      case "up":
        position.y -= 5;
        break;
      case "down":
        position.y += 5;
        break;
    }
    Socketio.emit("position", position);
  });
});

Http.listen(3000, () => {
  console.log("Listening at :3000...")
});