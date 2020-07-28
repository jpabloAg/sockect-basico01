// aca definiremos las funciones que queremos que se disparen cuando 
//recibamos informacion del servidor o cuando nosotros queramos enviar informacion al servidor
// io() es una funcion que aparece gracias a la libreria que importamos
var socket = io();

// conectar el frontend con el backend usando evento connect
socket.on('connect', function () {
    console.log('Conectado al servidor');
});

//el callback se eejcutara cuando se de el evento disconnect, que es cuando
//se pierde la conexion con el servidor
socket.on('disconnect', function () {
    console.log('Perdimos la conexión con el servidor');
});

//enviar información al servidor (backend), para esto usaremos la palabra emit
socket.emit('enviarMensaje', {
    usuario: 'pablo',
    mensaje: 'Hello world'
}, function (responseServer) {
    console.log('Mensaje emitido satisfactoriamente');
    console.log(responseServer);
});

//recibir la informacion que me manda el servidor
socket.on('enviarMensaje', (mensajeServidor) => {
    console.log(mensajeServidor);
    console.log('Servidor dice: ', mensajeServidor.mensaje);
});

/**
 * Esto tambien lo puedo hacer directamente desde la consola del navegaro y el servidor
 * lo va recoger y mostrar, si es que tiene su respectivo io.on('message',...)
 * simplemente copio esta instruccion y la pego en la consola del navegador y luego doy
 * enter, sin necesidad de parar la ejecucion del programa en la terminal y volverla a lanzar
 */
socket.emit('message', { vengador: 'Thor', equipo: 'Asgard' });

socket.on('message', function(data){
    console.log(data);
});