import { Box, Stack, Avatar, Button, TextField, Typography, Card, FormControlLabel, Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import urlConfig from '../../config/UrlConfig'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import { Helmet } from 'react-helmet-async'
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const Profile = () => {
  const [information, setInformation] = useState({})
  const [formData, setFormData] = useState(new FormData())
  const [isValidated, setIsValidated] = useState(true)
  const { snack, setSnack } = useSnackbar()
  const fetchData = async () => {
    const res = await AxiosInterceptors.get(urlConfig.user.info)
      .then((res) => setInformation(res.data.user))
      .catch((err) => {
        setIsValidated(false)
      })
  }

  const updateData = async () => {
    const res = await AxiosInterceptors.put(
      urlConfig.user.info,
      {
        first_name: information.first_name,
        last_name: information.last_name,
        gender: information.gender,
        phone: information.phone,
        address: information.address,
        DoB: information.DoB,
        photo: formData.get('photo')
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then((res) => {
        setInformation(res.data.user)
        localStorage.setItem('profile', JSON.stringify(res.data.user))
        setSnack({
          open: true,
          message: 'Update Profile Successfully',
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          open: true,
          message: `${err.response.data.message}`,
          type: 'error'
        })
      )
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    (!isValidated && (
      <div style={{ width: '100%' }}>
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
          <h1>Please check your email to validate your account!</h1>
        </Card>
      </div>
    )) ||
    (information.role && (
      <div style={{ width: '100%' }}>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <Snackbar />
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#E8DDDD',
            padding: '20px',
            margin: '20px 100px'
          }}
        >
          <Stack
            spacing={2}
            direction='row'
            sx={{
              width: '100%'
            }}
          >
            <Stack
              spacing={5}
              direction='column'
              alignItems='center'
              justifyContent='center'
              sx={{
                width: '50%'
              }}
            >
              <Avatar alt='Remy Sharp' src={information.photo_url} sx={{ width: 250, height: 250 }} />
              <Box>
                <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
                  Upload Photo
                  <VisuallyHiddenInput
                    type='file'
                    accept='.jpg, .png'
                    onChange={(e) => {
                      const file = e.target.files[0]
                      let newFormData = new FormData()
                      newFormData.append('photo', file)
                      setFormData(newFormData)
                      const reader = new FileReader()
                      reader.readAsDataURL(file)
                      reader.onloadend = () => {
                        setInformation({
                          ...information,
                          photo_url: reader.result
                        })
                      }
                    }}
                  />
                </Button>
              </Box>
            </Stack>
            <Box sx={{ display: 'block', width: '100%' }}>
              <Typography variant='h4' component='h4' sx={{ margin: '1.5rem' }}>
                Change Profile Information
              </Typography>
              <Box component='form' noValidate autoComplete='off'>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 2, width: '45%' }
                  }}
                >
                  <TextField
                    fullWidth
                    required
                    id='outlined-required'
                    label='Username'
                    defaultValue={information.username}
                    disabled
                  />
                  <TextField
                    fullWidth
                    required
                    id='outlined-required'
                    label='Email'
                    defaultValue={information.email}
                    disabled
                  />
                </Box>

                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 2, width: '45%' }
                  }}
                >
                  <TextField
                    required
                    id='outlined-required'
                    label='First Name'
                    defaultValue={information.first_name}
                    onChange={(e) => {
                      setInformation({
                        ...information,
                        first_name: e.target.value
                      })
                    }}
                  />
                  <TextField
                    required
                    id='outlined-required'
                    label='Last Name'
                    defaultValue={information.last_name}
                    onChange={(e) => {
                      setInformation({
                        ...information,
                        last_name: e.target.value
                      })
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 2, width: '45%' }
                  }}
                >
                  <TextField
                    id='outlined-number'
                    label='Phone Number'
                    type='number'
                    InputLabelProps={{
                      shrink: true
                    }}
                    defaultValue={information.phone}
                    onChange={(e) => {
                      setInformation({
                        ...information,
                        phone: e.target.value
                      })
                    }}
                  />
                  <TextField
                    required
                    id='outlined-required'
                    label='Address'
                    defaultValue={information.address}
                    onChange={(e) => {
                      setInformation({
                        ...information,
                        address: e.target.value
                      })
                    }}
                  />
                </Box>
              </Box>
              <Stack
                spacing={1}
                direction='row'
                alignItems='center'
                justifyContent='flex-end'
                sx={{
                  marginRight: '2rem'
                }}
              >
                <Button variant='contained' component='label' onClick={updateData}>
                  Save Change
                </Button>
                <Button variant='contained' component='label' color='error'>
                  Reset
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Card>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#E8DDDD',
            padding: '20px',
            margin: '20px 100px'
          }}
        >
          <Typography variant='h4' component='h4' sx={{ margin: '1rem' }}>
            Delete Account
          </Typography>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='
          I understand that I will not be able to undo this action and that all my data will be deleted.
        '
            sx={{ marginLeft: '1.5rem' }}
          />
          <Stack
            spacing={1}
            direction='row'
            alignItems='center'
            justifyContent='flex-end'
            sx={{
              marginRight: '2rem'
            }}
          >
            <Button variant='contained' component='label' color='error'>
              Delete
            </Button>
          </Stack>
        </Card>
      </div>
    ))
  )
}

export default Profile
