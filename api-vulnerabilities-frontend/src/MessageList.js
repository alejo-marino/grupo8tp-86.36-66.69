import React from 'react';
import Message from './Message';

function MessageList({ messages }) {
  // Reverse the order of messages to show the newest ones at the top
  const reversedMessages = [...messages].reverse();

  return (
    <div className="message-list">
      {reversedMessages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}

export default MessageList;
