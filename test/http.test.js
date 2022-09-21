import * as https from 'https'

const options = {
    hostname: 'https://localhost:8080/',
    port: 80,
    path: 'api/items/',
    method: 'GET' 
}

const req = https.request(options, res => {
  res.on('data', d => console.log(d))
})

req.on('error', err => console.log(err))
req.end()