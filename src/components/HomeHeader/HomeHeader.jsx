import React from 'react'
import { Box, Button, Typography, Stack } from '@mui/material'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguagePopover from '../LanguagePopover/LanguagePopover'
const HomeHeader = () => {
  const { t } = useTranslation()
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
            <Button variant='text' color='secondary' onClick={() => navigate('/login')}>
              {t('signIn')}
            </Button>
            <Button
              variant='outlined'
              onClick={() => navigate('/register')}
              sx={{
                color: 'black',
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'black'
                }
              }}
            >
              {t('register')}
            </Button>
            <LanguagePopover />
          </Stack>
        </div>
      </Box>
    </div>
  )
}

export default HomeHeader
