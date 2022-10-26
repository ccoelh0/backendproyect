let userInfo;
let dataSockets;
const chatContainer = document.getElementById("chat");
const chatForm = document.getElementById("form-chat");
const newMessage = document.getElementById("message");
const selectorId = document.getElementById("selector-email");
const socket = io();

const renderData = (data) => {
  const renderChats = data
    .map((x) => {
      return `
      <div>
        <div>
          ${
            x.message.responseId
              ? `<span style="font-weight: bold">Respuesta a mensaje con id: ${x.message.responseId} </span> |`
              : `<span>Mensaje con id: ${x.id} |</span>`
          }
          <span>${x.author.isAdmin ? "Admin" : x.author.username} | ${
        x.message.content
      }</span>
      </div>
      </div>
    `;
    })
    .join(" ");

  chatContainer.innerHTML = renderChats;
};

const renderOption = (data) => {
  if (userInfo.isAdmin) {
    const render = data.map((x) => {
      return !x.author.isAdmin && `<option value="${x.id}">${x.id} - ${x.author.username}}</option>`;
    });

    return (selectorId.innerHTML = render);
  }

  return selectorId.classList.add("d-none");
};

const onSubmit = (e) => {
  e.preventDefault();

  let message = {
    author: {
      username: userInfo.username,
      isAdmin: userInfo.isAdmin,
    },
    message: {
      content: newMessage.value,
    },
  };

  let promise;

  if (selectorId.value.length !== 0) {
    promise = axios.post(`api/chat/${selectorId.value}`, message);
  } else {
    promise = axios.post(`api/chat/`, message);
  }

  promise
    .then(() => socket.emit("new-message", true))
    .catch((err) => console.log(err));
};

chatForm.addEventListener("submit", (e) => onSubmit(e));
socket.on("data-chat", (data) => {
  renderData(data);
  dataSockets = data;
});
socket.on("update-chat", (data) => {
  renderData(data);
  dataSockets = data;
});
getSessionService()
  .then((res) => {
    userInfo = res.data;
    renderOption(dataSockets);
  })
  .catch((err) => console.log(err));
