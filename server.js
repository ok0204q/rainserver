const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

console.log("server action...");

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    console.log("Received message:", msg);
    try {
      const parsedMessage = JSON.parse(msg);
      const responseMessage = JSON.stringify(parsedMessage);

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(responseMessage);
        }
      });
    } catch (e) {
      console.error("Invalid JSON:", e);
    }
  });
});

wss.on("close", () => {
  console.log("client disconnected");
});
