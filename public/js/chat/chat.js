const chatContainer = document.getElementById("chat");
const chatForm = document.getElementById("form-chat");
const newMessage = document.getElementById("message");
const socket = io();

socket.on("data-chat", (data) => renderData(data));
socket.on("update-chat", (data) => renderData(data));

const renderData = (data) => {
  const render = data
    .map((x) => {
      return `
      <div>
        <div>${x.author.isAdmin ? "Admin" : x.author.username} | ${
        x.message
      }</div>
      </div>
    `;
    })
    .join(" ");
  return (chatContainer.innerHTML = render);
};

const onSubmit = (e) => {
  e.preventDefault();

  const message = {
    author: {
      username: userData.username,
      isAdmin: userData.isAdmin,
    },
    message: newMessage.value,
  };

  axios
    .post("api/chat/", message)
    .then(() => socket.emit("new-message", true))
    .catch((err) => console.log(err));
};

chatForm.addEventListener("submit", (e) => onSubmit(e));
