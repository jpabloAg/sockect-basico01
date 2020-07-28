const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');
const app = express();

// Crear el servidor usando el modulo http
let server = http.createServer(app);


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

//---------inicializar socket.io, esta es la comunicación del backend-----------
//exportamos el objeto io para usarlo en el archivo correspondiente 
//al uso de los sockest (socket.js)
module.exports.io = socketIO(server);

//cargamos el archivo que trabaja con los sockets, para usarlo en el archivo server.js
require('./sockets/socket');


server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});