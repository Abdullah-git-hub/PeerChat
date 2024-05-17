const express = require("express");
const socket = require("socket.io");
const app = express();

// Routes
const userRout = require("./routes/userRoute");

//Settings
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use("/", userRout);

const server = app.listen(3000, () => console.log("Listening to port 3000"));

var io = socket(server);

io.on("connection", (socket) => {
    // console.log(socket);
    console.log("User connected:", socket.id);

    // socket.emit("getOwnSocketId", socket.id);

    socket.on("join", (roomId) => {
        console.log(roomId);
        const roomList = io.sockets.adapter.rooms;
        console.log(roomList);

        var room = roomList.get(roomId);

        console.log(room);

        if (room) {
            socket.join(roomId);
            console.log("Room 1");
        } else if (room.size == 1) {
            console.log("Room 2");
            socket.join(roomId);
        } else {
            console.log("Room fullfilled");
        }
        var room = roomList.get(roomId);

        console.log(room);
    });

    socket.on("ready", (roomId) => {
        console.log("Ready");
        socket.broadcast.to(roomId).emit("ready");
    });

    socket.on("candidate", (candidate, roomId) => {
        console.log("candidate:", candidate);
        socket.broadcast.to(roomId).emit("candidate", candidate);
    });

    socket.on("offer", (offer, roomId) => {
        console.log("offer:", offer);
        socket.broadcast.to(roomId).emit("offer", offer);
    });

    socket.on("answer", (answer, roomId) => {
        console.log("answer:", answer);
        socket.broadcast.to(roomId).emit("answer", answer);
    });
});
