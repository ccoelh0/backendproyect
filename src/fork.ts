import calculoPesado from './calculo'

process.on('message', (msj) => {
  if (msj === 'empezar') {
    calculoPesado()
    process.send && process.send('termine')
  }
});