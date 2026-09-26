const http = require("http");

const app = require("./app");
const { PORT } = require("./config/env");

const {
    iniciarWebSocket
} = require("./websocket/websocketServer");

const server = http.createServer(app);

iniciarWebSocket(server);

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});