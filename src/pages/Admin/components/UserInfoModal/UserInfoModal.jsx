import * as React from 'react'
import { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
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
import { DateField } from '@mui/x-date-pickers/DateField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import _ from 'lodash'
import dayjs from 'dayjs'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import RootModal from '../../../../components/Modal/RootModal'
import Axios from 'axios'
import { useTranslation } from 'react-i18next'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
}

export default function UserInfoModal({ open, handleCloseModal, user, fetchData }) {
  const [userId, setUserId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [gender, setGender] = useState(0)
  const [DoB, setDoB] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [tinh, setTinh] = useState({})
  const [huyen, setHuyen] = useState({})
  const [xa, setXa] = useState({})
  const [address, setAddress] = useState({
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
  })
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState(0)
  const [isRestricted, setIsRestricted] = useState(false)
  const { snack, setSnack } = useSnackbar()
  const { t } = useTranslation()

  useEffect(() => {
    // Khi prop user thay đổi, cập nhật state currentUser
    // initState(user)
    clearState()
    initState(user)
  }, [user])

  const clearState = () => {
    setUserId('')
    setFirstName('')
    setLastName('')
    setEmail('')
    setUsername('')
    setGender(0)
    setDoB('')
    setIsConfirmed(false)
    setAddress({
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
    })
    setRole('USER')
    setIsRestricted(false)
  }

  const initState = (user) => {
    if (user && !_.isNull(user) && user._id) {
      setUserId(user._id)
    }

    if (user && !_.isNull(user) && user.first_name) {
      setFirstName(user.first_name)
    }

    if (user && !_.isNull(user) && user.last_name) {
      setLastName(user.last_name)
    }

    if (user && !_.isNull(user) && user.email) {
      setEmail(user.email)
    }

    if (user && !_.isNull(user) && user.username) {
      setUsername(user.username)
    }

    if (user && !_.isNull(user) && user.gender) {
      setGender(user.gender ? 1 : 0)
    }

    if (user && !_.isNull(user) && user.DoB) {
      setDoB(user.DoB)
    }

    if (user && !_.isNull(user) && user.isConfirmed) {
      setIsConfirmed(user.isConfirmed ? 1 : 0)
    }

    if (user && !_.isNull(user) && user.address) {
      setAddress(user.address)
    }

    if (user && !_.isNull(user) && user.phone) {
      setPhone(user.phone)
    }

    if (user && !_.isNull(user) && user.role) {
      switch (user.role) {
        case 'USER': {
          setRole(0)
          break
        }
        case 'EXPERT': {
          setRole(1)
          break
        }
        case 'ADMIN': {
          setRole(2)
          break
        }
      }
    }

    if (user && !_.isNull(user) && user.isRestricted) {
      setIsRestricted(user.isRestricted ? 1 : 0)
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
    await Axios.get(`https://provinces.open-api.vn/api/p/${address?.city.code}?depth=2`)
      .then((res) => {
        setHuyen(res.data.districts)
      })
      .catch((err) => console.log(err))
  }
  const fetchXa = async () => {
    await Axios.get(`https://provinces.open-api.vn/api/d/${address?.district.code}?depth=2`)
      .then((res) => {
        setXa(res.data.wards)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchHuyen()
  }, [address?.city?.code])
  useEffect(() => {
    fetchXa()
  }, [address?.district?.code])
  useEffect(() => {
    fetchTinh()
  }, [])

  const handleOnclickSaveChangesBtn = async () => {
    const url = urlConfig.user.users + `/${userId}`
    const res = await AxiosInterceptors.put(url, {
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      phone: phone,
      address: JSON.stringify(address),
      DoB: DoB
    })
    if (res.status === 200) {
      fetchData()
      setSnack({
        open: true,
        message: t('updateAccountSuccess'),
        type: 'success'
      })
    } else {
      setSnack({
        open: true,
        message: t('updateAccountFail'),
        type: 'error'
      })
    }
    handleCloseModal()
  }

  return (
    <div>
      <RootModal
        variant='Create'
        title={t('userProfile')}
        open={open}
        handleClose={() => handleCloseModal()}
        handleOk={() => {
          handleOnclickSaveChangesBtn()
          handleCloseModal()
        }}
        closeOnly={false}
      >
        <Grid
          container
          spacing={1.5}
          sx={{
            mt: 2
          }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='outlined-required'
              label={t('firstName')}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ width: '100%'}}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='outlined-required'
              label={t('lastName')}
              value={lastName}
              sx={{ width: '100%'}}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              id='outlined-required'
              label={t('username')}
              value={username}
              sx={{ width: '100%'}}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth 
              required 
              id='outlined-required' 
              label='Email' 
              value={email} 
              sx={{ width: '100%'}}
              disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='outlined-number'
              label={t('phoneNumber')}
              type='number'
              InputLabelProps={{
                shrink: true
              }}
              sx={{ width: '100%'}}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id='demo-simple-select-label'>{t('gender')}</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={gender}
                label={t('gender')}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value={0}>{t('male')}</MenuItem>
                <MenuItem value={1}>{t('female')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <FormControl sx={{ width: '100%'}}>
              <InputLabel id='demo-simple-select-label'>{t('role')}</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={role}
                label='Role'
                onChange={(e) => setRole(e.target.value)}
                disabled
              >
                <MenuItem value={0}>{t('USER')}</MenuItem>
                <MenuItem value={1}>{t('EXPERT')}</MenuItem>
                <MenuItem value={2}>{t('ADMIN')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              id='outlined-number'
              label={t('verify')}
              sx={{ width: '100%'}}
              disabled
              value={isConfirmed ? t('YES') : t('NO')}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              id='outlined-number'
              label={t('status')}
              sx={{ width: '100%'}}
              disabled
              value={isRestricted ? t('active') : t('unactive')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '100%'}}>
              <DateField
                label={t('dateOfBirth')}
                sx={{ width: '100%'}}
                value={dayjs(DoB)}
                onChange={(newValue) => setDoB(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id='outlined-select-currency'
              select
              label={t('city')}
              defaultValue={user?.address?.city?.name}
              sx={{ width: '100%'}}
            >
              {tinh &&
                tinh.length > 0 &&
                tinh?.map((option) => (
                  <MenuItem
                    key={option.code}
                    value={option.name}
                    onClick={(e) => {
                      setAddress({
                        ...address,
                        city: {
                          code: option.code,
                          name: option.name
                        }
                      })
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id='outlined-select-currency'
              select
              label={t('district')}
              defaultValue={user?.address?.district?.name}
              sx={{ width: '100%'}}
            >
              {huyen &&
                huyen.length > 0 &&
                huyen?.map((option) => (
                  <MenuItem
                    key={option.code}
                    value={option.name}
                    onClick={(e) => {
                      setAddress({
                        ...address,
                        district: {
                          code: option.code,
                          name: option.name
                        }
                      })
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id='outlined-select-currency'
              select
              label={t('ward')}
              defaultValue={user?.address?.ward?.name}
              sx={{ width: '100%'}}
            >
              {xa &&
                xa.length > 0 &&
                xa?.map((option) => (
                  <MenuItem
                    key={option.code}
                    value={option.name}
                    onClick={(e) => {
                      setAddress({
                        ...address,
                        ward: {
                          code: option.code,
                          name: option.name
                        }
                      })
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        </Grid>
      </RootModal>
    </div>
  )
}
