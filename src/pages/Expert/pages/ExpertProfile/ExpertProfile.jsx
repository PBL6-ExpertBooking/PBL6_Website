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
import { React, useState, useEffect } from 'react'
import CertificateInfo from '../../components/CertificateInfo'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import { DateField } from '@mui/x-date-pickers/DateField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import urlConfig from '../../../../config/UrlConfig'
import Axios from 'axios'
import { useTranslation } from 'react-i18next'
import UploadAvatar from '../../../../components/UploadAvatar/UploadAvatar'
import { LoadingButton } from '@mui/lab'

const ExpertProfile = () => {
  const [profile, setProfile] = useState({
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
  const [certificates, setCertificates] = useState([])
  const [formData, setFormData] = useState(new FormData())
  const [isValidated, setIsValidated] = useState(true)
  const [majors, setMajors] = useState([])
  const { snack, setSnack } = useSnackbar()
  const [refresh, setRefresh] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tinh, setTinh] = useState({})
  const [huyen, setHuyen] = useState({})
  const [xa, setXa] = useState({})
  const { t } = useTranslation()

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

  const fetchTinh = async () => {
    await Axios.get('https://provinces.open-api.vn/api/p/')
      .then((res) => {
        setTinh(res.data)
      })
      .catch((err) => console.log(err))
  }
  const fetchHuyen = async () => {
    console.log('URL huyen ', `https://provinces.open-api.vn/api/p/${profile.address?.city.code}?depth=2`)
    await Axios.get(`https://provinces.open-api.vn/api/p/${profile.address?.city.code}?depth=2`)
      .then((res) => {
        setHuyen(res.data.districts)
      })
      .catch((err) => console.log(err))
  }
  const fetchXa = async () => {
    console.log('URL xa ', `https://provinces.open-api.vn/api/d/${profile.address?.district.code}?depth=2`)

    await Axios.get(`https://provinces.open-api.vn/api/d/${profile.address?.district.code}?depth=2`)
      .then((res) => {
        setXa(res.data.wards)
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateProfile = async () => {
    setIsSubmitting(true)
    const res = await AxiosInterceptors.put(
      urlConfig.user.info,
      {
        first_name: profile.first_name,
        last_name: profile.last_name,
        gender: profile.gender,
        phone: profile.phone,
        address: JSON.stringify(profile.address),
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
    ;(async () => {
      await fetchDataMajors()
      await fetchData()
    })()
  }, [refresh])
  useEffect(() => {
    fetchHuyen()
  }, [profile.address?.city?.code])
  useEffect(() => {
    fetchXa()
  }, [profile.address?.district?.code])
  useEffect(() => {
    fetchData()
    fetchTinh()
  }, [])
  return (
    (!isValidated && (
      <div style={{ width: '100%', maxHeight: '93vh', overflow: 'auto' }}>
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
    (profile._id && (
      <div style={{ width: '100%', maxHeight: '93vh', overflow: 'auto' }}>
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
                  file={profile.photo_url}
                  setFormData={setFormData}
                  information={profile}
                  setInformation={setProfile}
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
                    {t('expertProfile')}
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
                        label={t('firstName')}
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
                        label={t('lastName')}
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
                        label={t('phoneNumber')}
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
                          label={t('gender')}
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
                          label={t('dateOfBirth')}
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
                    <Stack direction='row' spacing={3} sx={{ my: 2, ml: 2 }}>
                      <TextField
                        id='outlined-select-currency'
                        select
                        label={t('city')}
                        defaultValue={profile.address?.city?.name}
                        sx={{
                          width: '30%'
                        }}
                      >
                        {tinh &&
                          tinh.length > 0 &&
                          tinh?.map((option) => (
                            <MenuItem
                              key={option.code}
                              value={option.name}
                              onClick={(e) => {
                                setProfile({
                                  ...profile,
                                  address: {
                                    ...profile.address,
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
                        defaultValue={profile.address?.district?.name}
                        sx={{
                          width: '30%'
                        }}
                      >
                        {huyen &&
                          tinh.length > 0 &&
                          huyen?.map((option) => (
                            <MenuItem
                              key={option.code}
                              value={option.name}
                              onClick={(e) => {
                                setProfile({
                                  ...profile,
                                  address: {
                                    ...profile.address,
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
                        defaultValue={profile.address?.ward?.name}
                        sx={{
                          width: '30%'
                        }}
                      >
                        {xa &&
                          xa.length > 0 &&
                          xa?.map((option) => (
                            <MenuItem
                              key={option.code}
                              value={option.name}
                              onClick={(e) => {
                                setProfile({
                                  ...profile,
                                  address: {
                                    ...profile.address,
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
                      onClick={handleUpdateProfile}
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
        {certificates.length > 0 &&
          certificates.map((certificate) => {
            return (
              <CertificateInfo certificate={certificate} majors={majors} refresh={refresh} setRefresh={setRefresh} />
            )
          })}
      </div>
    ))
  )
}

export default ExpertProfile
