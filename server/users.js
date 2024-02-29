const users =[];

const addUser = ({id, name, room}) => {

  //Kunal Raj => kunalraj
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();



  //if already a person with the same name in the users array : then error
  const existingUser = users.find((user) => user.name === name && user.room === room);

  if(!name || !room) return { error: 'Username and room are required.' };

  if(existingUser){
    return {error: 'username is taken'};
  }

  //else create user with id, name and room from parameters and push to users array
  const user = {id, name, room};
  users.push(user);  
  return {user}
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index != -1){
    return users.splice(index, 1)[0]; //it removes one element from the users array starting at the specified index. [0] cause The splice() method returns an array containing the removed elements. Since we are removing only one element so only [0]
  }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = {addUser, getUser, removeUser, getUsersInRoom}   //only then can use in other pages