import autocannon from "autocannon";
import { PassThrough } from "stream";

const run = (url) => {
  const buf = []
  const outputStream = new PassThrough()

  // Prueba
  const inst = autocannon({
    url,
    connections: 100,
    duration: 20
  })

  // Inspecion de la prueba
  autocannon.track(inst, {outputStream})

  // Pusheamos la data al buf
  outputStream.on('data', data => buf.push(data))

  // Escribimos en la consola
  inst.on('done', () => process.stdout.write(Buffer.concat(buf)))
}

// van a ir a los endpoints de index
run('http://localhost:8080/api/info') // no bloqueante
run('http://localhost:8080/api/infoBloqueante') // bloqueante

// npm run start
// npm run test > nos va a devolver los datos