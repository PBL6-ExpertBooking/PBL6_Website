import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Fab,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Tooltip,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { MajorContext } from '../../contexts/major.context'
import RootModal from '../Modal/RootModal'
import Recharge from './Recharge'
import Axios from 'axios'
import HeaderUserbox from './UserBox'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import Snackbar from '../../common/components/SnackBar'
import useSnackbar from '../../contexts/snackbar.context'
import LanguaguePopover from '../LanguagePopover/LanguagePopover'
// icon
import NotificationsIcon from '@mui/icons-material/Notifications'
import AddIcon from '@mui/icons-material/Add'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CertificateInformodal from '../../pages/Expert/components/CertificateInforModal/CertificateInformodal'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))
  const [open, setOpen] = React.useState(false)
  const [openRecharge, setOpenRecharge] = React.useState(false)
  const [openAddCertificate, setOpenAddCertificate] = React.useState(false)
  const { snack, setSnack } = useSnackbar()
  const [tinh, setTinh] = useState({})
  const [huyen, setHuyen] = useState({})
  const [xa, setXa] = useState({})
  const [data, setData] = useState({
    major_id: '',
    title: '',
    descriptions: '',
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
    price: 0
  })
  const { majors, loading, getMajors } = useContext(MajorContext)
  const fetchTinh = async () => {
    await Axios.get('https://provinces.open-api.vn/api/p/')
      .then((res) => {
        setTinh(res.data)
      })
      .catch((err) => console.log(err))
  }
  const fetchHuyen = async () => {
    await Axios.get(`https://provinces.open-api.vn/api/p/${data.address?.city.code}?depth=2`)
      .then((res) => {
        setHuyen(res.data.districts)
      })
      .catch((err) => console.log(err))
  }
  const fetchXa = async () => {
    await Axios.get(`https://provinces.open-api.vn/api/d/${data.address?.district.code}?depth=2`)
      .then((res) => {
        setXa(res.data.wards)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchHuyen()
  }, [data.address?.city.code])
  useEffect(() => {
    fetchXa()
  }, [data.address?.district.code])
  useEffect(() => {
    // Fetch majors when this component mounts
    fetchTinh()
    getMajors()
  }, [])
  const handleOk = async () => {
    await AxiosInterceptors.post(urlConfig.job_requests.createJobRequests, data)
      .then((res) => {
        if (res.status === 200) {
          setSnack({
            ...snack,
            open: true,
            message: 'Create job request successfully!',
            type: 'success'
          })
          setOpen(false)
        }
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Create job request failed!',
          type: 'error'
        })
      })
  }

  const handleCloseCertificateModal = () => {
    setOpenAddCertificate(false)
  }

  return (
    <div>
      <Snackbar />
      {openAddCertificate && (
        <CertificateInformodal open={openAddCertificate} handleCloseModal={handleCloseCertificateModal} />
      )}
      {open && (
        <RootModal
          variant='Create'
          title={t('createRequest')}
          open={open}
          handleClose={() => setOpen(false)}
          handleOk={() => handleOk()}
          closeOnly={false}
        >
          <Box sx={{ my: 2 }}>
            <TextField
              id='outlined-basic'
              label={t('title')}
              variant='outlined'
              fullWidth
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <TextField
              id='outlined-basic'
              label={t('description')}
              variant='outlined'
              fullWidth
              sx={{
                mt: 2
              }}
              onChange={(e) => setData({ ...data, descriptions: e.target.value })}
            />
            <Stack direction='row' spacing={3} sx={{ mt: 2 }}>
              <TextField
                id='outlined-select-currency'
                select
                label={t('major')}
                defaultValue=''
                sx={{
                  width: '50%'
                }}
                onChange={(e) => setData({ ...data, major_id: e.target.value })}
              >
                {majors.majors?.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <FormControl>
                <InputLabel htmlFor='outlined-adornment-amount'>{t('price')}</InputLabel>
                <OutlinedInput
                  id='outlined-adornment-amount'
                  startAdornment={<InputAdornment position='start'>đ</InputAdornment>}
                  label={t('price')}
                  type='number'
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                />
              </FormControl>
            </Stack>
            <Stack direction='row' spacing={3} sx={{ mt: 2 }}>
              <TextField
                id='outlined-select-currency'
                select
                label={t('city')}
                defaultValue={data.address.city.name}
                sx={{
                  width: '33%'
                }}
              >
                {tinh.map((option) => (
                  <MenuItem
                    key={option.code}
                    value={option.name}
                    onClick={(e) => {
                      setData({
                        ...data,
                        address: {
                          ...data.address,
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
                defaultValue={data.address.district.name}
                sx={{
                  width: '33%'
                }}
              >
                {huyen?.map((option) => (
                  <MenuItem
                    key={option.code}
                    value={option.name}
                    onClick={(e) => {
                      setData({
                        ...data,
                        address: {
                          ...data.address,
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
                defaultValue={data.address.ward.name}
                sx={{
                  width: '33%'
                }}
              >
                {xa?.map((option) => (
                  <MenuItem
                    key={option.code}
                    value={option.name}
                    onClick={(e) => {
                      setData({
                        ...data,
                        address: {
                          ...data.address,
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
        </RootModal>
      )}
      {openRecharge && <Recharge openRecharge={openRecharge} setOpenRecharge={setOpenRecharge} />}
      {openAddCertificate && (
        <CertificateInformodal openCertificate={openAddCertificate} setOpenCertificate={setOpenAddCertificate} />
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '7vh',
          margin: '0px 20px'
        }}
      >
        <Typography
          variant='h4'
          component='h4'
          onClick={() => navigate('/dashboard')}
          sx={{
            cursor: 'pointer'
          }}
        >
          <ConnectWithoutContactIcon />
          {'  '}
          Expert Booking
        </Typography>
        <div>
          <Stack direction='row' spacing={2} sx={{ padding: '10px' }}>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Tooltip title={t('notifications')} arrow>
                <Fab size='small' aria-label='notifi'>
                  <NotificationsIcon />
                </Fab>
              </Tooltip>
              {user.role === 'USER' && (
                <>
                  <Tooltip title={t('createRequest')} arrow>
                    <Fab size='small' aria-label='add' onClick={() => setOpen(true)}>
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip title={t('recharge')} arrow>
                    <Fab size='small' aria-label='recharge' onClick={() => setOpenRecharge(true)}>
                      <AttachMoneyIcon />
                    </Fab>
                  </Tooltip>
                </>
              )}
              {user.role === 'EXPERT' && (
                <>
                  <Tooltip title='Add Certificate' arrow>
                    <Fab size='small' aria-label='add' onClick={() => setOpenAddCertificate(true)}>
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                </>
              )}
              <LanguaguePopover />
              <HeaderUserbox />
            </Box>
          </Stack>
        </div>
      </Box>
    </div>
  )
}

export default Header
