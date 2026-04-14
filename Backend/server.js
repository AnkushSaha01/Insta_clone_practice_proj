const app = require("./src/app");
const connectDB = require("./src/db/db");
const { createServer } = require("http");
const initSocket = require("./src/sockets/app.socket");


const httpServer = createServer(app);

initSocket(httpServer);


connectDB();


httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
