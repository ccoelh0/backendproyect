let userData;
const logout = document.getElementById("logout");

const onLogout = () => {
  axios
    .get("api/session/logout")
    .then((res) => res.status === 200 && (window.location = "/login"))
    .catch((err) => console.log(err));
};

logout.addEventListener("click", () => onLogout());

axios
  .get("/api/session/user")
  .then((res) => (userData = res.data))
  .catch(() => (window.location = "/login"));


