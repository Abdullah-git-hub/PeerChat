const socket = io();

const video_chat_form = document.getElementById("video-chat-form");
const video_chat_room = document.getElementById("video-chat-rooms");
const roomName = document.getElementById("roomName");
const joinBtn = document.getElementById("join");
const userVideo = document.getElementById("user-video");
const peerVideo = document.getElementById("peer-video");

// socket.on("getOwnSocketId", (id) => {
//     roomName.value = id;
// });

joinBtn.onclick = () => {
    if (roomName.value) {
        socket.emit("join", roomName.value);

        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        navigator.getUserMedia(
            {
                audio: false,
                video: true,
            },
            function (stream) {
                video_chat_form.style.display = "none";
                userVideo.srcObject = stream;
                userVideo.onloadedmetadata = function (e) {
                    userVideo.play();
                };
            },
            function (err) {
                console.log(err);
            }
        );

        return;
    }

    alert("Enter room name");
};
