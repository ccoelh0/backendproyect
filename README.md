# backendproyect

COMANDOS PARA PROBAR EL DESAFIO:

*Fork and Cluster
* nodemon src/index.js --port 9000 --mode fork
* nodemon src/index.js --port 9000 --mode cluster
 
*Forever
* forever start src/index.js --port 8080--mode cluster
* forever start src/index.js --port 8081 --mode cluster
* forever start src/index.js --port 8082 --mode fork

*PM2
* Fork mode: pm2 start src/index.js --name="Server fork" --watch -- 8081
* Cluster mode: pm2 start src/index.js --name="Server Cluster" -i max --watch -- 8081

*NGINX: 
* nodemon src/index.js --port 8080 --mode cluster
* forever start src/index.js --port 8082 --mode fork
* forever start src/index.js --port 8083 --mode fork
* forever start src/index.js --port 8084 --mode fork
* forever start src/index.js --port 8085 --mode fork
