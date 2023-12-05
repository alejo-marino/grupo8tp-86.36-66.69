import React from 'react'

function Message({ message }) {
  return (
    <div className="message">
      <p dangerouslySetInnerHTML={{ __html: message.content }}></p>
      <p className="message-author">By {message.username}</p>
    </div>
  )
}

export default Message
