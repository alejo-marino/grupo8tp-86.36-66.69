const API_URL = process.env.REACT_APP_BACKEND_URL

export const getMessages = async () => {
  return fetch(API_URL + `/users/messages`, {
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (res) => res.body)
}