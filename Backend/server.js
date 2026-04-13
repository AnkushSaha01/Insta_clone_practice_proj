const app = require("./src/app");
const connectDB = require("./src/db/db");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors:{
        origin:"http://localhost:5173",
        methods: [ "GET", "POST", "PUT", "DELETE", "PATCH" ],
        credentials: true,
    }
})

io.on('connection', (socket) => {
    console.log('A user connected:' , socket.id);
    

    socket.on("send_message", data => {
        console.log(data)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


connectDB();


httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
