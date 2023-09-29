import React from 'react'
import { Avatar, Box, Fab, Typography, Stack } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AddIcon from '@mui/icons-material/Add'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '7vh',
          margin: '0px 20px'
        }}
      >
        <Typography variant='h4' component='h4' onClick={() => navigate('/dashboard')} sx={{ 
          cursor: 'pointer',
        }} >
          <ConnectWithoutContactIcon />
          {'  '}
          Exert Booking
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
              >
                <AddIcon />
              </Fab>
              <Fab
                size='small'
                aria-label='add'
                onClick={() => navigate('/user/profile')}
                sx={{
                  backgroundColor: '#E8DDDD'
                }}
              >
                <Avatar
                  alt='Remy Sharp'
                  src='https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png'
                />
              </Fab>
            </Box>
          </Stack>
        </div>
      </Box>
    </div>
  )
}

export default Header
