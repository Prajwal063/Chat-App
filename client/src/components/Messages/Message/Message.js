import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  const trimmedName = name.trim().toLowerCase();
  const isAdmin = user === 'admin';
  const isCurrentUser = user === trimmedName;

  return (
  <div className={`messageContainer ${isAdmin ? 'center' : isCurrentUser ? 'justifyEnd' : 'justifyStart'}`}>
    {isAdmin ? (
      <div className="messageBox admin">
        <p className="messageText colorRed">{ReactEmoji.emojify(text)}</p>
      </div>
    ) : (
      isCurrentUser? (
        <div className={'messageBox backgroundBlue '}>
        <p className="sender " >{user}</p>
        <p className="messageText">{ReactEmoji.emojify(text)}</p>
      </div>
      ) : (
        <div className={'messageBox backgroundRed'}>
          <p className="receiver">{user}</p>
          <p className="messageText">{ReactEmoji.emojify(text)}</p>
        </div>
      )
      
    )}

  </div>
);

}

export default Message;
