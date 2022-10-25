const handleError = (req, res) => {
  return res.status(404).send(`<h1>La direccion: "${req.url}" no esta disponible!</h1>`);
};

export default handleError;
