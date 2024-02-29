const express = require('express');
const socketio = require('socket.io')
const http = require('http');
const cors = require('cors');


const { addUser, removeUser, getUser, getUsersInRoom } = require( './users' );

const router = require('./router')

const PORT = process.env.PORT || 5000 

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});




app.use(router);
app.use(cors());

//.on is the socket function which means: On connection to the socket (client) do this...
io.on('connection', (socket) => {

  //On joining: give the name and room
  socket.on('join', ({name, room}, callback) => {

    //{error, addUser} cause addUser() has 2 scenarios if there is an error and adding user: Does the suitable job 
    const {error, user} = addUser({id: socket.id, name, room});   

    //the error message directly coming from the users.js addUser() function
    if(error) return callback(error);
    
    //else join the user to the room in parameters mentioned
    socket.join(user.room);

    //'message' => admin messages
    //admin messages like includes user and tells him welcome to the room
    socket.emit('message', {user: 'admin', text: `${user.name}, welcome to ${user.room}.`});

    //broadcast: sends a messag eto everyone except the user like 'Raj had joined'
    socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined!`});

    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    //anotehr function or logic : here cleanup the message to empty
    callback();

  });

  //'sendMessage' for user messages
  socket.on('sendMessage', (message, callback) => {
    //get the user first : socket is accessed from the io.on() function
    const user = getUser(socket.id);

    //through socket send the message from the user where 'message' is rendered from the frontend
    io.to(user.room).emit('message', {user: user.name, text: message})
    io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})

    //will not execute the 'if statement' above to show errors, if there are no errors :: MUST DO :: GOOD PRACTICE
    callback();
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })

})

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));

