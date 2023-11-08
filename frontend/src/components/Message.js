import React from 'react'

function Message({ message }) {
  return (
    <div className="message">
      <p>{message.text}</p>
      <p className="message-author">by {message.author}</p>
    </div>
  )
}

export default Message
