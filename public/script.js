const socket = io("/");

const videoElement1 = document.getElementById("video_1");
const videoElement2 = document.getElementById("video_2");
const videogrid = document.getElementById("video-grid");

videoElement1.muted = true;

var peer = new Peer();
// var peer = new Peer(undefined, {
//     path: "/peerjs",
//     host: "/",
//     port: "3030",
// });

peer.on("open", (id) => {
    console.log(id);
    socket.emit("join-room", ROOM_ID, id);
});

// let myVideoStream;
navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
        addVideoStream(videoElement1, stream);

        peer.on("call", (call) => {
            call.answer(stream);
            call.on("stream", (userVideoStream) => {
                addVideoStream(videoElement2, userVideoStream);
            });
        });

        socket.on("user-connected", (userId) => {
            connectToNewUser(userId, stream);
        });
    });

function connectToNewUser(userId, stream) {
    const call = peer.call(userId, stream);
    call.on("stream", (userVideoStream) => {
        addVideoStream(videoElement2, userVideoStream);
    });
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadmetadata", () => {
        video.play();
    });
    // videogrid.appendChild(video);
};
