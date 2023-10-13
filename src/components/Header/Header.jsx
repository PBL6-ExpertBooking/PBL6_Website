import React from 'react'
import { Avatar, Box, Fab, Typography, Stack, TextField, MenuItem } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AddIcon from '@mui/icons-material/Add'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import { useNavigate } from 'react-router-dom'
import RootModal from '../Modal/RootModal'
import province from '../../constants/location'
import major from '../../constants/major'
import HeaderUserbox from './UserBox'
const Header = () => {
  const navigate = useNavigate()
  const profile = JSON.parse(localStorage.getItem('profile'))
  const [open, setOpen] = React.useState(false)
  return (
    <div>
      <RootModal
        variant='Create'
        title='Create Request'
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => setOpen(false)}
        closeOnly={false}
      >
        <Box sx={{ my: 2 }}>
          <TextField id='outlined-basic' label='Tên tiêu đề' variant='outlined' fullWidth />
          <Stack direction='row' spacing={3} sx={{ mt: 2 }}>
            <TextField id='outlined-select-currency' select label='Major' defaultValue='IT'>
              {major.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField id='outlined-select-currency' select label='Location' defaultValue='15'>
              {province.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
                  backgroundColor: '#E8DDDD'
                }}
              >
                <NotificationsIcon />
              </Fab>
              <Fab
                size='small'
                aria-label='add'
                sx={{
                  backgroundColor: '#E8DDDD'
                }}
                onClick={() => setOpen(true)}
              >
                <AddIcon />
              </Fab>
              {/* <Fab
                size='small'
                aria-label='add'
                onClick={() => navigate('/user/profile')}
                sx={{
                  backgroundColor: '#E8DDDD'
                }}
              >
                <Avatar
                  alt='Remy Sharp'
                  src={profile.photo_url}
                />
              </Fab> */}
              <HeaderUserbox />
            </Box>
          </Stack>
        </div>
      </Box>
    </div>
  )
}

export default Header
