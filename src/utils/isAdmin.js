export const isAdmin = (req, res, next) => {
  return req.user.isAdmin
    ? next()
    : res
        .status(404)
        .send({ err: "esta ruta no esta disponible para rol usuario!" });
};
