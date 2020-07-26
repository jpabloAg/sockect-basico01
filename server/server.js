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

//inicializar socket.ion, esta es la comunicación del backend
let io = socketIO(server);

// conectar el backend con el frontend, apartir del evento connection
io.on('connection', (client) => {
    console.log('usuario conectado');

    //saber cuando un cliente se desconecta, apartir del evento disconnect
    client.on('disconnect', () => {
        console.log('usario desconectado');
    });

    //escuchar un mensaje del cliente
    client.on('enviarMensaje', (mensajeCliente, callback) => {
        console.log(mensajeCliente);
        console.log('Cliente dice: ',mensajeCliente.mensaje);

        callback({
            ok:true,
            mensaje: 'Mensaje recibido'
        });
    });

    //emitir un mensaje al cliente una vez este se conecte lo recibira
    client.emit('enviarMensaje', {
        usuario: 'Admin',
        mensaje: 'Bienvenido a esta aplicación'
    });
})

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});