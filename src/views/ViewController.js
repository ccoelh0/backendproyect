const root = { root: "." };
const url = "/public/";

const returnLogin = (_, res) => res.sendFile(url + "login.html", root);
const returnHome = (_, res) => res.sendFile(url + "index.html", root);
const returnAdmin = (_, res) => res.sendFile(url + "admin.html", root);

const controller = {
  returnLogin,
  returnAdmin,
  returnHome,
};

export default controller