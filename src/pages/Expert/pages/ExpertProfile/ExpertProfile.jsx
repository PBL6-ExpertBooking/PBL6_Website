import {
  Box,
  Stack,
  Avatar,
  Button,
  TextField,
  Typography,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { React, useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CertificateInfo from '../../components/CertificateInfo'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import { DateField } from '@mui/x-date-pickers/DateField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import urlConfig from '../../../../config/UrlConfig'

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

const ExpertProfile = () => {
  const [profile, setProfile] = useState({})
  const [certificates, setCertificates] = useState([])
  const [formData, setFormData] = useState(new FormData())
  const [isValidated, setIsValidated] = useState(true)
  const [majors, setMajors] = useState([])
  const { snack, setSnack } = useSnackbar()

  const fetchData = async () => {
    const res = await AxiosInterceptors.get(urlConfig.expert.current)
    if (res.status === 200) {
      if (res.data.expert.user) {
        setProfile(res.data.expert.user)
      }
      if (res.data.expert.certificates) {
        setCertificates(res.data.expert.certificates)
      }
    } else {
      setIsValidated(false)
    }
  }

  const fetchDataMajors = async () => {
    const res = await AxiosInterceptors.get(urlConfig.majors.getMajors)
    if (res.status === 200) {
      if (res.data.majors) {
        setMajors(res.data.majors)
      }
    }
  }

  const handleUpdateProfile = async () => {
    const res = await AxiosInterceptors.put(
      urlConfig.user.info,
      {
        first_name: profile.first_name,
        last_name: profile.last_name,
        gender: profile.gender,
        phone: profile.phone,
        address: profile.address,
        DoB: profile.DoB,
        photo: formData.get('photo')
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then((res) => {
        setProfile(res.data.user)
        localStorage.setItem('profile', JSON.stringify(res.data.user))
        setSnack({
          open: true,
          message: 'Update Profile Successfully',
          type: 'success'
        })
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: `${err.response.data.message}`,
          type: 'error'
        })
      })
  }

  useEffect(() => {
    ;(async () => {
      await fetchDataMajors()
      await fetchData()
    })()
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
    (profile.role && (
      <div style={{ width: '100%', height: '100vh' }}>
        <Snackbar />
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#D2E9E9 ',
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
              <Avatar alt='Remy Sharp' src={profile.photo_url} sx={{ width: 250, height: 250 }} />
              <Box>
                <Button
                  component='label'
                  variant='contained'
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    backgroundColor: '#F8F6F4',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#F8F6F4',
                      color: 'black'
                    }
                  }}
                >
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
                        setProfile({
                          ...profile,
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
                Expert Profile
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
                    defaultValue={profile.username}
                    disabled
                  />
                  <TextField
                    fullWidth
                    required
                    id='outlined-required'
                    label='Email'
                    defaultValue={profile.email}
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
                    defaultValue={profile.first_name}
                    onChange={(e) => {
                      setProfile({
                        ...profile,
                        first_name: e.target.value
                      })
                    }}
                  />
                  <TextField
                    required
                    id='outlined-required'
                    label='Last Name'
                    defaultValue={profile.last_name}
                    onChange={(e) => {
                      setProfile({
                        ...profile,
                        last_name: e.target.value
                      })
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 2, width: '29%' }
                  }}
                >
                  <TextField
                    id='outlined-number'
                    label='Phone Number'
                    type='number'
                    InputLabelProps={{
                      shrink: true
                    }}
                    defaultValue={profile.phone}
                    onChange={(e) => {
                      setProfile({
                        ...profile,
                        phone: e.target.value
                      })
                    }}
                  />

                  <FormControl sx={{ width: '29%', m: 2 }}>
                    <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      label='Gender'
                      defaultValue={profile.gender ? 1 : 0}
                      onChange={(e) => {
                        setProfile({
                          ...profile,
                          gender: e.target.value === 1 ? true : false
                        })
                      }}
                    >
                      <MenuItem value={0}>Male</MenuItem>
                      <MenuItem value={1}>Female</MenuItem>
                    </Select>
                  </FormControl>

                  <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '45%', m: 2 }}>
                    <DateField
                      label='Date of birthday'
                      value={dayjs(profile.DoB)}
                      onChange={(newValue) =>
                        setProfile({
                          ...profile,
                          DoB: newValue
                        })
                      }
                    />
                  </LocalizationProvider>
                </Box>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 2, width: '94%' }
                  }}
                >
                  <TextField
                    required
                    id='outlined-required'
                    label='Address'
                    defaultValue={profile.address}
                    onChange={(e) => {
                      setProfile({
                        ...profile,
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
                <Button
                  variant='contained'
                  component='label'
                  onClick={handleUpdateProfile}
                  sx={{
                    backgroundColor: '#F8F6F4',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#F8F6F4',
                      color: 'black'
                    }
                  }}
                >
                  Save Change
                </Button>
                <Button variant='contained' component='label' color='error'>
                  Reset
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Card>

        {certificates.length > 0 &&
          certificates.map((certificate) => {
            return <CertificateInfo certificate={certificate} majors={majors} />
          })}
      </div>
    ))
  )
}

export default ExpertProfile
