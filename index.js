var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen('3002');


app.get('/',function(request,response){
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
         console.log('New User connected');

         socket.on('newMsg', function(data,room){
             console.log('New Msg' + data);
             socket.to(room).emit('addNewMsg', data);
         });


        socket.on('joinRoom', function(data){
            console.log('User joins room' + data);
            socket.join(data);
        });


    socket.on('leaveRoom', function(data){
        console.log('User Left room' + data);
        socket.leave(data);
    });



});



