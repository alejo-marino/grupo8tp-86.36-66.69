const API_URL = process.env.REACT_APP_BACKEND_URL

export const getMessages = async () => {
  return fetch(API_URL + `/users/messages`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (res) => res.body)
}

export const submitMessage = async (postData) => {
  return fetch(API_URL + `/users/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData)
  }).then(async (res) => res.body)
}
