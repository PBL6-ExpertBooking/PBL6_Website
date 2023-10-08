import React from 'react'
import { Box, Button, Typography, Stack } from '@mui/material'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import { useNavigate } from 'react-router-dom'
const HomeHeader = () => {
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
            <Button
              variant='contained'
              sx={{
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: 'black'
                }
              }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button
              variant='text'
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white'
                }
              }}
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  )
}

export default HomeHeader
