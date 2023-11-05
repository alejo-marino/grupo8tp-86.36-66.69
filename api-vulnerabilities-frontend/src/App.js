import React, { useState } from 'react'
import MessageList from './components/MessageList'
import MessageForm from './components/MessageForm'
import './styles.css'

function App() {
  const [messages, setMessages] = useState([])

  const addMessage = (newMessage) => {
    setMessages([...messages, newMessage])
  }

  return (
    <div className="App">
      <h1 className="m0">Blog Post</h1>
      <MessageForm addMessage={addMessage} />
      <MessageList messages={messages} />
    </div>
  )
}

export default App
