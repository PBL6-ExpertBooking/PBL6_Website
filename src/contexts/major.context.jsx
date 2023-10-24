// hooks
import { useState, useContext } from 'react'

// context
import { createContext } from 'react'

import Axios from 'axios'
import urlConfig from '../config/UrlConfig'

async function getMajor() {
  return await Axios.get(urlConfig.majors.getMajors)
}

export const MajorContext = createContext()

export function MajorProvider({ children }) {
  const [majors, setMajors] = useState([])
  const [loading, setLoading] = useState(false)

  const getMajors = () => {
    setLoading(true)
    getMajor()
      .then((res) => {
        setMajors(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return <MajorContext.Provider value={{ majors, loading, getMajors }}>{children}</MajorContext.Provider>
}
