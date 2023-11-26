import React, { useEffect, useState } from 'react'
import MessageList from './components/MessageList'
import MessageForm from './components/MessageForm'
import Loader from './components/Loader'
import { getMessages } from './services/messages'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import HttpsRedirect from 'react-https-redirect'
import './styles.css'

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
    <Router>
      <Routes>
        {/* HTTP to HTTPS redirection */}
        <Route
          path="/*"
          element={
            <React.Fragment>
              {({ location }) => {
                if (location.protocol === 'http:') {
                  return <Navigate to={{ ...location, protocol: 'https:' }} />;
                }
                return null;
              }}
            </React.Fragment>
          }
        />

        <Route
          path="/"
          element={
            <>
              {!showLoader && (
                <div className="App">
                  <h1 className="title m0">Blog Post</h1>
                  <MessageForm addMessage={addMessage} />
                  <MessageList messages={messages} />
                </div>
              )}

              {showLoader && <Loader />}
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App
