import axios from 'axios'
const baseUrl = '/api/users'

export const getUsers = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}