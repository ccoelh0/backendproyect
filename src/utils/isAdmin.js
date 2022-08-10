export const isAdmin = (req, res, next, isAdmin = true) => 
    isAdmin ? next() : res.json({ err: 'esta ruta no esta disponible para rol usuario!' })
