import express from 'express'
import calculoPesado, {getCant} from '../calculo'
import { fork } from 'child_process'

let contador = 0;
const routerDesafio = express.Router()

routerDesafio.get('/info', (_, res) =>
  res.send({
    os: process.platform,
    nodeVersion: process.version,
    memoria: process.memoryUsage(),
    id: process.pid,
    folder: process.cwd(),
    path: process.execPath,
    argv: process.argv
  })
)

routerDesafio.get('/contador', (req, res) => {
  contador++;
  res.send({ contador });
});

routerDesafio.get('/api/random', (req: any, res) => {
  const cant = req.query.cant !== undefined ? parseInt(req.query.cant, 10) : 100000000
  getCant(cant)
  calculoPesado()
  const forkeado = fork('/fork')
  forkeado.send('empezar')
  forkeado.on('message', (msj) => {
    if (msj === 'termine') res.send('Calculo terminado');
  });
})

const routerDesafioFork = routerDesafio

export default routerDesafioFork