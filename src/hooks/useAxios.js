import axios from 'axios'

async function UseAxios(url, access_token, body, method = 'GET', formData = false) {
  try {
    if (method === 'GET') {
      const response = await axios.get(url, { headers: { Authorization: `Bearer ${access_token}` } })
      return response
    } else if (method === 'POST') {
      const response = await axios.post(url, body, { headers: { Authorization: `Bearer ${access_token}` } })
      if (response.status === 400) {
        const json = await response.json()
        return { success: false, message: json.error }
      }
      if (formData) return await response.json()
      else return { success: true }
    } else if (method === 'PUT') {
      const response = await axios.put(url, body, { headers: { Authorization: `Bearer ${access_token}` } })
      if (response.status === 400) {
        const json = await response.json()
        return { success: false, message: json.error }
      }
      if (formData) return response
      else return { success: true }
    } else if (method === 'DELETE') {
      const response = await axios.delete(url, { headers: { Authorization: `Bearer ${access_token}` } })
      if (response.status === 400) {
        const json = await response.json()
        return { success: false, message: json.error }
      }
      return { success: true }
    }
  } catch (error) {
    return error.message
  }
}

export default UseAxios
