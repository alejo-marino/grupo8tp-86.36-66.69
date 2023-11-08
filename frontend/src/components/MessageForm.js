import React, { useState } from 'react'
import { submitMessage } from '../services/messages'

function MessageForm({ addMessage }) {
  const [formData, setFormData] = useState({ username: '', text: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Check if both username and text fields are filled before submitting
    if (formData.username && formData.text) {
      const postData = {
        user: formData.username,
        message: formData.text,
      }

      // Send a POST request to the backend
      submitMessage(postData)
        .then((response) => {
          if (!response) throw new Error('No response received')
          console.log("RES: ", response)
        })
        .then(() => {
          // Update frontend
          addMessage({ username: formData.username, content: formData.text });
          setFormData({ username: '', text: '' });
        })
        .catch((error) => {
          console.error('Error sending the POST request:', error)
        })
    } else {
      alert('Please enter both username and message.')
    }
  }

  return (
    <div className="message-form">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="off"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="text"
          name="text"
          placeholder="Message"
          autoComplete="off"
          value={formData.text}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={!formData.username || !formData.text}
          className={formData.username && formData.text ? 'enabled' : ''}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default MessageForm
