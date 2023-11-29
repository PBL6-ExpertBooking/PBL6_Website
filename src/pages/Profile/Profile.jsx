import {
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material'
import React, { useState, useEffect } from 'react'
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
import UploadAvatar from '../../components/UploadAvatar/UploadAvatar'
import { LoadingButton } from '@mui/lab'

const BecomeExpert = lazy(() => import('../User/components/BecomeExpert'))

const Profile = () => {
  const { t } = useTranslation()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [isSubmitting, setIsSubmitting] = useState(false)
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
    setIsSubmitting(true)
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
          message: t('updateProfileSuccess'),
          type: 'success'
        })
        setIsSubmitting(false)
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: t('updateProfileFail'),
          type: 'error'
        })
        setIsSubmitting(false)
      })
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            margin: '20px 100px',
            backgroundColor: 'transparent'
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  py: 10,
                  px: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}
              >
                <UploadAvatar
                  file={information.photo_url}
                  setFormData={setFormData}
                  information={information}
                  setInformation={setInformation}
                />
                <Typography
                  variant='caption'
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary'
                  }}
                >
                  Allowed *.jpg, *.png
                  <br /> max size of 3.5MB
                </Typography>
                <Button
                  variant='text'
                  component='label'
                  color='error'
                  sx={{
                    mt: 2,
                    mx: 'auto'
                  }}
                >
                  {t('deleteAccount')}
                </Button>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3, height: '100%' }}>
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
                        {tinh?.map((option) => (
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
                      mt: 3,
                      marginRight: '2rem'
                    }}
                  >
                    <LoadingButton
                      fullWidth
                      color='success'
                      variant='text'
                      loading={isSubmitting}
                      onClick={updateData}
                      sx={{
                        width: '150px'
                      }}
                    >
                      {t('saveChanges')}
                    </LoadingButton>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
        {user.role === 'USER' && <BecomeExpert />}
      </div>
    ))
  )
}

export default Profile
