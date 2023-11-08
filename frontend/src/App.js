import React, { useEffect, useState } from 'react'
import MessageList from './components/MessageList'
import MessageForm from './components/MessageForm'
import { getMessages } from './services/messages'
import './styles.css'

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    getMessages()
      .then((res) => {
        if (res.data) setMessages(res.data.reverse())
      })
      .catch((error) => console.error('Error fetching messages: ', error))
  }, [])

  const addMessage = (newMessage) => {
    setMessages([newMessage, ...messages]);
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
