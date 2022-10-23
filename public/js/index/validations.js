let userData;
const admin = document.getElementById('admin')
const logout = document.getElementById("logout");

const getSessionService = () => axios.get("/api/session/user")

getSessionService()
.then((res) => handleData(res.data))
.catch(() => (window.location = "/login"));

const handleData = (data) => {
  userData = data
  checkAdmin(data.isAdmin)
}

const checkAdmin = (isAdmin) => !isAdmin && admin.classList.add('d-none')

const onLogout = () => {
  axios
    .get("api/session/logout")
    .then((res) => res.status === 200 && (window.location = "/login"))
    .catch((err) => console.log(err));
};

logout.addEventListener("click", () => onLogout());