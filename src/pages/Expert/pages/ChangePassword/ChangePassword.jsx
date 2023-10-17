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
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { useNavigate } from 'react-router-dom'
import path from '../../../../constants/path'

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { snack, setSnack } = useSnackbar()
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleResetForm = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setSnack({
        open: true,
        message: 'New password and confirm password must match',
        type: 'error'
      })
      handleResetForm()
      return
    }

    const res = await AxiosInterceptors.put(urlConfig.user.updatePassword, {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword
    })
      .then((res) => {
        setSnack({
          open: true,
          message: 'Update password successfully',
          type: 'success'
        })
        navigate(path.expertProfile)
      })
      .catch((err) => {
        console.log(err)
        setSnack({
          open: true,
          message: `${err.response.data.message}`,
          type: 'error'
        })
      })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <div style={{ width: '100%' }}>
      <Snackbar />
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#D2E9E9 ',
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
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
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
          <Button variant='contained' component='label' onClick={handleUpdatePassword}>
            Save Change
          </Button>
          <Button variant='contained' component='label' color='error' onClick={handleResetForm}>
            Reset
          </Button>
        </Stack>
      </Card>
    </div>
  )
}

export default ChangePassword
