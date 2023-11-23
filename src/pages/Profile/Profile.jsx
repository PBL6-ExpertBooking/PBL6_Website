import {
  Box,
  Stack,
  Avatar,
  Button,
  TextField,
  Typography,
  Card,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import urlConfig from '../../config/UrlConfig'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import { Helmet } from 'react-helmet-async'
import dayjs from 'dayjs'
import { DateField } from '@mui/x-date-pickers/DateField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Axios from 'axios'
import { lazy } from 'react'
import Loading from '../../common/components/Loading/Loading'
import { useTranslation } from 'react-i18next'

const BecomeExpert = lazy(() => import('../User/components/BecomeExpert'))
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
  const { t } = useTranslation()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [information, setInformation] = useState({
    first_name: '',
    last_name: '',
    gender: true,
    phone: '',
    address: {
      city: {
        code: '',
        name: ''
      },
      district: {
        code: '',
        name: ''
      },
      ward: {
        name: '',
        code: 0
      }
    },
    DoB: dayjs(),
    photo: ''
  })
  const [formData, setFormData] = useState(new FormData())
  const [isValidated, setIsValidated] = useState(true)
  const { snack, setSnack } = useSnackbar()
  const [isLoading, setIsLoading] = useState(true)
  const [tinh, setTinh] = useState({})
  const [huyen, setHuyen] = useState({})
  const [xa, setXa] = useState({})
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.user.info)
      .then((res) => {
        setInformation(res.data.user)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsValidated(false)
      })
  }
  const fetchTinh = async () => {
    await Axios.get('https://provinces.open-api.vn/api/p/')
      .then((res) => {
        setTinh(res.data)
      })
      .catch((err) => console.log(err))
  }
  const fetchHuyen = async () => {
    await Axios.get(`https://provinces.open-api.vn/api/p/${information.address?.city.code}?depth=2`)
      .then((res) => {
        setHuyen(res.data.districts)
      })
      .catch((err) => console.log(err))
  }
  const fetchXa = async () => {
    await Axios.get(`https://provinces.open-api.vn/api/d/${information.address?.district.code}?depth=2`)
      .then((res) => {
        setXa(res.data.wards)
      })
      .catch((err) => console.log(err))
  }
  const updateData = async () => {
    await AxiosInterceptors.put(
      urlConfig.user.info,
      {
        first_name: information.first_name,
        last_name: information.last_name,
        gender: information.gender,
        phone: information.phone,
        address: JSON.stringify(information.address),
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
    fetchHuyen()
  }, [information.address?.city?.code])
  useEffect(() => {
    fetchXa()
  }, [information.address?.district?.code])
  useEffect(() => {
    fetchData()
    fetchTinh()
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
          <h1>{t('validateMail')}</h1>
        </Card>
      </div>
    )) ||
    (isLoading ? (
      <Loading />
    ) : (
      <div style={{ width: '100%', maxHeight: '93vh', overflow: 'auto' }}>
        <Helmet>
          <title>{t('profile')}</title>
        </Helmet>
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
              <Avatar alt='Remy Sharp' src={information.photo_url} sx={{ width: 250, height: 250 }} />
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
                  {t('uploadPhoto')}
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
                {t('changeProfile')}
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
                    label={t('username')}
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
                    label={t('firstName')}
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
                    label={t('lastName')}
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
                    '& .MuiTextField-root': { m: 2, width: '29%' }
                  }}
                >
                  <TextField
                    id='outlined-number'
                    label={t('phoneNumber')}
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
                  <FormControl sx={{ width: '29%', m: 2 }}>
                    <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      label={t('gender')}
                      defaultValue={information.gender ? 1 : 0}
                      onChange={(e) => {
                        setInformation({
                          ...information,
                          gender: e.target.value === 1 ? true : false
                        })
                      }}
                    >
                      <MenuItem value={0}>{t('male')}</MenuItem>
                      <MenuItem value={1}>{t('female')}</MenuItem>
                    </Select>
                  </FormControl>

                  <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '45%', m: 2 }}>
                    <DateField
                      label={t('dateOfBirth')}
                      value={dayjs(information.DoB)}
                      onChange={(newValue) =>
                        setInformation({
                          ...information,
                          DoB: newValue
                        })
                      }
                    />
                  </LocalizationProvider>
                </Box>
                <Stack direction='row' spacing={3} sx={{ my: 2, ml: 2 }}>
                  <TextField
                    id='outlined-select-currency'
                    select
                    label={t('city')}
                    defaultValue={information.address?.city?.name}
                    sx={{
                      width: '30%'
                    }}
                  >
                    {tinh.map((option) => (
                      <MenuItem
                        key={option.code}
                        value={option.name}
                        onClick={(e) => {
                          setInformation({
                            ...information,
                            address: {
                              ...information.address,
                              city: {
                                code: option.code,
                                name: option.name
                              }
                            }
                          })
                        }}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id='outlined-select-currency'
                    select
                    label={t('district')}
                    defaultValue={information.address?.district?.name}
                    sx={{
                      width: '30%'
                    }}
                  >
                    {huyen?.map((option) => (
                      <MenuItem
                        key={option.code}
                        value={option.name}
                        onClick={(e) => {
                          setInformation({
                            ...information,
                            address: {
                              ...information.address,
                              district: {
                                code: option.code,
                                name: option.name
                              }
                            }
                          })
                        }}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id='outlined-select-currency'
                    select
                    label={t('ward')}
                    defaultValue={information.address?.ward?.name}
                    sx={{
                      width: '30%'
                    }}
                  >
                    {xa?.map((option) => (
                      <MenuItem
                        key={option.code}
                        value={option.name}
                        onClick={(e) => {
                          setInformation({
                            ...information,
                            address: {
                              ...information.address,
                              ward: {
                                code: option.code,
                                name: option.name
                              }
                            }
                          })
                        }}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Box>
              <Stack
                spacing={1}
                direction='row'
                alignItems='center'
                justifyContent='flex-end'
                sx={{
                  mt: 2,
                  marginRight: '2rem'
                }}
              >
                <Button
                  variant='contained'
                  component='label'
                  onClick={updateData}
                  sx={{
                    backgroundColor: '#F8F6F4',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#F8F6F4',
                      color: 'black'
                    }
                  }}
                >
                  {t('saveChanges')}
                </Button>
                <Button variant='contained' component='label' color='error'>
                  {t('reset')}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Card>
        {user.role === 'USER' && <BecomeExpert />}
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#D2E9E9 ',
            padding: '20px',
            margin: '20px 100px'
          }}
        >
          <Typography variant='h4' component='h4' sx={{ margin: '1rem' }}>
            {t('deleteAccount')}
          </Typography>
          <FormControlLabel control={<Checkbox />} label={t('deleteAccountMessage')} sx={{ marginLeft: '1.5rem' }} />
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
              {t('delete')}
            </Button>
          </Stack>
        </Card>
      </div>
    ))
  )
}

export default Profile
