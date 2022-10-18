export const isAdmin = (req, res, next, isAdmin = true) =>
  isAdmin
    ? next()
    : res
        .status(404)
        .send({ err: "esta ruta no esta disponible para rol usuario!" });
