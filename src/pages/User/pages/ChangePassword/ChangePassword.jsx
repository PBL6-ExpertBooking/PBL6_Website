import React from 'react'
import {
  Box,
  InputAdornment,
  Stack,
  Button,
  Typography,
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Helmet } from 'react-helmet-async'
const ChangePassword = () => {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <div style={{ width: '100%' }}>
      <Helmet>
        <title>Change Password</title>
      </Helmet>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#E8DDDD',
          padding: '20px',
          margin: '20px 100px'
        }}
      >
        <Typography variant='h4' component='h4' sx={{ margin: '1rem' }}>
          Change Password
        </Typography>
        <FormControl
          variant='outlined'
          sx={{
            m: 1,
            width: '48%'
          }}
        >
          <InputLabel htmlFor='outlined-adornment-password'>Current Password</InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label='Password'
          />
        </FormControl>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '48%' }
          }}
        >
          <FormControl
            variant='outlined'
            sx={{
              m: 1,
              width: '48%'
            }}
          >
            <InputLabel htmlFor='outlined-adornment-password'>New Password</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
          <FormControl
            variant='outlined'
            sx={{
              m: 1,
              width: '48%'
            }}
          >
            <InputLabel htmlFor='outlined-adornment-password'>Confirm New Password</InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
        </Box>
        <Typography variant='subtitle1' sx={{ margin: '1rem' }}>
          Password Requirements:
        </Typography>
        <Typography variant='subtitle2' gutterBottom sx={{ marginLeft: '1rem' }}>
          - Minimum 8 characters long - the more, the better
        </Typography>
        <Typography variant='subtitle2' gutterBottom sx={{ marginLeft: '1rem' }}>
          - At least one lowercase & one uppercase character
        </Typography>
        <Typography variant='subtitle2' gutterBottom sx={{ marginLeft: '1rem' }}>
          - At least one number, symbol, or whitespace character
        </Typography>
        <Stack
              spacing={1}
              direction='row'
              alignItems='center'
              justifyContent='flex-end'
              sx={{
                marginRight: '2rem'
              }}
            >
              <Button variant='contained' component='label'>
                Save Change
              </Button>
              <Button variant='contained' component='label' color='error'>
                Reset
              </Button>
            </Stack>
      </Card>
    </div>
  )
}

export default ChangePassword
