const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, { debug: true });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/peerjs", peerServer);

app.get("/", (req, res) => {
    res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, res) => {
    res.render("room", { roomID: req.params.room });
});

io.on("connection", (socket) => {
    socket.on("join-room", (ROOM_ID, userId) => {
        socket.join(ROOM_ID);
        socket.broadcast.to(ROOM_ID).emit("user-connected", userId);
    });
});

server.listen(3000, () => {
    console.log("Listening...");
});
