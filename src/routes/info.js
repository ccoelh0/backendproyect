import { Router } from 'express'
import compression from 'compression'
import os from 'os'
import logger from '../utils/logger.js'

//Implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:
// Ruta y método de todas las peticiones recibidas por el servidor (info)
// Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
// Errores lanzados por las apis de mensajes y productos, únicamente (error)
const now = new Date()
const routerInfo = Router()

routerInfo.get('/info', (_, res) => {
  logger.info(`se visito la ruta /info a las ${now}`)
  res.send(`pid: ${process.pid} - numero de procesadores: ${os.cpus().length}`)
})

routerInfo.get('/infoBloqueante', (_, res) => {
  console.log(`info: se visito la ruta /info a las ${now}`)
  res.send(`pid: ${process.pid} - numero de procesadores: ${os.cpus().length}`)
})

routerInfo.get('/infoGzip', compression(), (_, res) => 
  res.send(`pid: ${process.pid} - numero de procesadores: ${os.cpus().length}`)
)

routerInfo.get('/info/number', (req, res) => {
  let { number } = req.body
  number = parseInt(number, 10)
  if (number === undefined || isNaN(number)) {
    logger.error('No es un numero o esta indefinido')
    res.sendStatus(404)
    return;
  }
  res.send(`Number ingresado: ${number}`)
})

// routerInfo((req, res, next) => {
//   logger.warn('Recurso invalido');
//   res.sendStatus(404);}
// )

export default routerInfo