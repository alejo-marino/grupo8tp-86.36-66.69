import React, { useEffect, useState } from 'react'
import MessageList from './components/MessageList'
import MessageForm from './components/MessageForm'
import './styles.css'

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // Fetches the list of persisted messages from the backend when the component mounts
    fetchMessages();
  }, []);

  const addMessage = (newMessage) => {
    setMessages([...messages, newMessage])
  }

  const fetchMessages = () => {
    fetch(backendUrl + `/messages`)
      .then((response) => console.log(response.json()))
      .then((data) => {
        if (data) { // If GET request retrieves no messages, list shouldn't be set
          setMessages(data); // Update the state with the retrieved messages
        }
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  };

  return (
    <div className="App">
      <h1 className="m0">Blog Post</h1>
      <MessageForm addMessage={addMessage} />
      <MessageList messages={messages} />
    </div>
  )
}

export default App
