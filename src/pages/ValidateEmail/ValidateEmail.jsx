import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Button } from '@mui/material'
import axios from 'axios'
import urlConfig from '../../config/UrlConfig'

const ValidateEmail = () => {
  const { token } = useParams()
  const [message, setMessage] = useState('')
  const validateEmail = async () => {
    const res = await axios
      .get(urlConfig.authentication.validateEmail + `/${token}`)
      .then((res) => setMessage(res.data.message))
      .catch((err) => {
        setMessage(err.response.data.message)
      })
  }
  useEffect(() => {
    validateEmail()
  }, [])

  return (
    <div>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          width: '100%',
          backgroundColor: '#f5f5f5',
          color: 'red'
        }}
      >
        <h1>{message}</h1>
        <Button variant="contained" color="primary" href="/">
          Go to home page
        </Button>
      </Card>
    </div>
  )
}

export default ValidateEmail
