import React from 'react'
import { Avatar, Box, Fab, Typography, Stack } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AddIcon from '@mui/icons-material/Add'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
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
          margin: '0px 20px',
        }}
      >
        <Typography variant='h4' component='h4'>
          <ConnectWithoutContactIcon />
          {"  "}
          Exert Booking 
        </Typography>
        <div>
          <Stack direction='row' spacing={2} sx={{padding: '10px'}}>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Fab size='small' color='secondary' aria-label='add'>
                <NotificationsIcon />
              </Fab>
              <Fab size='small' color='secondary' aria-label='add'>
                <AddIcon />
              </Fab>
            </Box>
            <Stack
              direction='row'
              spacing={1}
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#E8DDDD',
                padding: '8px',
                borderRadius: '50px',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/user/profile')}
            >
              <Avatar alt='Remy Sharp' src='https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png' />
              <Typography variant='h6' component='div'>
                John Doe
              </Typography>
            </Stack>
          </Stack>
        </div>
      </Box>
    </div>
  )
}

export default Header
