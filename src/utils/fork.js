import express from 'express'
import { fork } from 'child_process'
import calculoPesado from './calculoPesado.js'

const routerFork = express.Router()

let contador = 0

routerFork.get('/contador', (req, res) => {
  contador++;
  res.send({ contador });
})

routerFork.get('/calculoPesadoBloqueante', (req, res) => {
  calculoPesado();
  res.send('Calculo terminado');
});

routerFork.get('/for-no-bloqueante', (_, res) => {
  const forkeado = fork('./src/utils/calculoPesadoFork.js');
  forkeado.send('empezar');
  forkeado.on('message', (msj) => {
    if (msj === 'termine') res.send('Calculo terminado');
  });
});

export default routerFork