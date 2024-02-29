import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './Join.css'

const Join = () => {

  // useState contains a 'var' and 'setVar' for which 'setVar' will set the value for var ==> works like this.name = name but is simpler and easy to understand
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  
  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>

      <h1 className="heading">Join</h1>

        
        {/* inputs and setting name and room as the input given by user using useState hook */}
        <div><input placeholder='Name' type='text' className='joinInput mt-20' 
        onChange={(event) => setName(event.target.value)}/></div>

        <div><input placeholder='Room' type='text' className='joinInput mt-20' 
        onChange={(event) => setRoom(event.target.value)}/></div>

        {/*Link is used to link pages|| here when clicked on submit it redirects to the chat  page with the name and room passed in the url*/}

        {/* onClick->if no name or room given then prevent from clicking button or else do nothing(i.e null) and  redirect to chatting page with props of name and room (to)*/}

        <Link onClick={event => (!name||!room)?event.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type='submit'>Sign In</button>
        </Link>
      </div>
    </div>  
  )
}

export default Join;