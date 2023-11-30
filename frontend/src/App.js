import React, { useEffect, useState } from 'react'
import MessageList from './components/MessageList'
import MessageForm from './components/MessageForm'
import './styles.css'
import Loader from './components/Loader'
import BlogPostIframe from './components/BlogPostIframe'
import { getMessages } from './services/messages'
import { environment } from './environments/environment'

function App() {
  const [messages, setMessages] = useState([])
  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    setShowLoader(true)

    getMessages()
      .then((res) => {
        if (res.data) setMessages(res.data)
      })
      .catch((error) => console.error('Error fetching messages: ', error))
      .finally(() => setShowLoader(false))
  }, [])

  const addMessage = (newMessage) => {
    setMessages([newMessage, ...messages])
  }

  return (
    <>
      {showLoader && <Loader />}
      <div className="App">
        <h1 className="title m0">Blog Post</h1>
        <MessageForm addMessage={addMessage} />
        <MessageList messages={messages} />
        {environment.showIframe && <BlogPostIframe />}
      </div>
    </>
  )
}

export default App
