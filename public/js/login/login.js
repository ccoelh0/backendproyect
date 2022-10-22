const home = "/";
const login = document.getElementById("login");
const createUser = document.getElementById("create-user");
const username = document.getElementById("username");
const password = document.getElementById("password");
const register = document.getElementById("register");
const goToLogin = document.getElementById("go-to-login");
const newUsername = document.getElementById("new-username");
const newPassword = document.getElementById("new-password");
const newPhone = document.getElementById("new-name");
const newName = document.getElementById("new-phone");

const handleForms = (form) => {
  if (form === "create-user") {
    login.classList.add("d-none");
    register.classList.remove("d-none");
  }

  if (form === "go-to-login") {
    register.classList.add("d-none");
    login.classList.remove("d-none");
  }
};

const submit = (e) => {
  e.preventDefault();

  const data = {
    username: username.value,
    password: password.value,
  };

  axios
    .post("/api/session/validate", data)
    .then((res) => res.status === 200 && (window.location = home))
    .catch((err) => console.log(err));
};

const createNewUser = () => {
  const data = {
    username: newUsername.value,
    password: newPassword.value,
    phone: newPhone.value,
    name: newName.value,
  };

  axios
    .post("/api/session/create", data)
    .then((res) => handleForms("go-to-login"))
    .catch((err) => console.log(err));
};

login.addEventListener("submit", (e) => submit(e));
register.addEventListener("submit", (e) => createNewUser(e));
createUser.addEventListener("click", () => handleForms("create-user"));
goToLogin.addEventListener("click", () => handleForms("go-to-login"));