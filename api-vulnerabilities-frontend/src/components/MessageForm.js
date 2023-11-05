import React, { useState } from 'react'

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
      addMessage({ author: formData.username, text: formData.text })
      setFormData({ username: '', text: '' })
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
