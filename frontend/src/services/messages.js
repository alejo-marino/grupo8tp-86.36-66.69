import axios from 'axios'

const API_URL = process.env.REACT_APP_BACKEND_URL

export const getMessages = async () => {
  return axios.get(API_URL + '/users/messages').then((res) => res.data)
}

export const submitMessage = async (postData) => {
  return axios.post(API_URL + '/users/messages', postData).then((res) => res.data)
}
