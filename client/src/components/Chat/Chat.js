import './Chat.css';

import React, { useState, useEffect} from 'react';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messaages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer';
const io = require("socket.io-client");


let socket;

const ENDPOINT = 'localhost:5000';

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');       //for a single message
  const [messages, setMessages] = useState([]);     //to keep track of all the messages

  

  useEffect(() => {
    //find the name and room in the url(i.e. location) query and set the name as name and room as room
    const {name, room} = queryString.parse(location.search)

    //connection the backend running on 5000 using socket.io
    socket = io(ENDPOINT, {
      cors: {
        origin: '*',
      }
     });
    setName(name);
    setRoom(room);
    
    //emit events on one side and register listeners on the other: here emit the socket to join  a chat room with the given parameters (name and room), then receive messages for that room
    socket.emit('join', {name, room}, (error) => {
      if(error) {
        alert(error);
      }
    })
  },[ENDPOINT, location.search]);
  //[ENDPOINT, location.search] => cause we want a new connection only when there is a  change in the state of name or room


  useEffect(() => {
    //on message received from the server append it to the list of messages
    socket.on('message', message => {
      //add teh message to the existing messages array
      setMessages(messages => [...messages, message]);
    }); //must be done only when there is a new message

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

  },[])

  //function for sending messages

  const sendMessage = (event) => {
    //in react when key is pressed whole page is reloaded so preventing that default behaviour
    event.preventDefault(); 

    //if tehre is a message emit  it to the server and set the message to null after sending (callback function)
    if(message){
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  return (
      <div className='outerContainer'>
        <div className='container'>
          <InfoBar room={room}/>
          <Messaages messages={messages} name={name}/>
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <TextContainer users={users}/>
      </div>
  )
}

export default Chat;