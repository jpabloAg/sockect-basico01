//el objeto require siempre es un json, incluso hasta cuando exporta una unica varaible, 
//por lo que para importar el objeto io que se exporto desde el fichero server.js necesito usar { }
//si no, no funcionara
const { io } = require('../server'); 

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

    
    client.on('message', (data) => {
        console.log(data);

        //emitir a todos los usuarios excepto al usuario que emitio la data al servidor
        client.broadcast.emit('message', {
            vengador: data.vengador,
            equipo: data.equipo
        });
    });

    client.emit('message', { casa:'Marvel' });
});
