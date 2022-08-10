import calculoPesado from "./calculoPesado.js";

process.on('message', (msj) => {
  if (msj === 'empezar') {
    calculoPesado();
    process.send('termine');
  }
});