import yargs from 'yargs';

const yargsSlice = yargs(process.argv.slice(2))

const args = yargsSlice
  .alias({ 
    p: 'port', 
    m: 'mode'
  })
  .argv

export default args