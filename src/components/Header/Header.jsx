import React, { useContext, useEffect, useState } from 'react'
import { Box, Fab, Typography, Stack, TextField, MenuItem } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AddIcon from '@mui/icons-material/Add'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import { useNavigate } from 'react-router-dom'
import RootModal from '../Modal/RootModal'
import province from '../../constants/location'
import HeaderUserbox from './UserBox'
import { MajorContext } from '../../contexts/major.context'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import Snackbar from '../../common/components/SnackBar'
import useSnackbar from '../../contexts/snackbar.context'
const Header = () => {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const { snack, setSnack } = useSnackbar()
  const [data, setData] = useState({
    major_id: '',
    title: '',
    descriptions: '',
    address: 'Đà Nẵng',
    budget_min: 0,
    budget_max: 0
  })
  const { majors, loading, getMajors } = useContext(MajorContext)
  useEffect(() => {
    // Fetch majors when this component mounts
    getMajors()
  }, [])
  const handleOk = async () => {
    const res = await AxiosInterceptors.post(urlConfig.job_requests.createJobRequests, data)
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

  return (
    <div>
      <Snackbar />
      <RootModal
        variant='Create'
        title='Create Request'
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => handleOk()}
        closeOnly={false}
      >
        <Box sx={{ my: 2 }}>
          <TextField
            id='outlined-basic'
            label='Title'
            variant='outlined'
            fullWidth
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <TextField
            id='outlined-basic'
            label='Descriptions'
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
              label='Major'
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
            <TextField
              id='outlined-select-currency'
              select
              label='Location'
              defaultValue='Đà Nẵng'
              sx={{
                width: '50%'
              }}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            >
              {province.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction='row' spacing={3} sx={{ mt: 2 }}>
            <TextField
              id='outlined-basic'
              label='Min Budget'
              variant='outlined'
              fullWidth
              type='number'
              onChange={(e) => setData({ ...data, budget_min: e.target.value })}
            />
            <TextField
              id='outlined-basic'
              label='Max Budget'
              variant='outlined'
              fullWidth
              type='number'
              onChange={(e) => setData({ ...data, budget_max: e.target.value })}
            />
          </Stack>
        </Box>
      </RootModal>
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
              <Fab
                size='small'
                aria-label='notifi'
                sx={{
                  backgroundColor: '#D2E9E9 '
                }}
              >
                <NotificationsIcon />
              </Fab>
              <Fab
                size='small'
                aria-label='add'
                sx={{
                  backgroundColor: '#D2E9E9 '
                }}
                onClick={() => setOpen(true)}
              >
                <AddIcon />
              </Fab>
              <HeaderUserbox />
            </Box>
          </Stack>
        </div>
      </Box>
    </div>
  )
}

export default Header
