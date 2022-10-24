const handleError = (req, res) => {
  return res.status(404).send(`<h1>${req.url} no esta disponible!</h1>`);
};

export default handleError;
