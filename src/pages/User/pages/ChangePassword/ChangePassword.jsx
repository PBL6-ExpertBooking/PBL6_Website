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
import SnackBar from '../../../../common/components/SnackBar'
import useSnackbar from '../../../../contexts/snackbar.context'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
const ChangePassword = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('')
  const { snack, setSnack } = useSnackbar()

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const handleReset = () => {
    setOldPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
  }
  const handleChangePassword = async () => {
    if (confirmNewPassword !== newPassword) {
      setSnack({
        ...snack,
        open: true,
        message: 'Confirm password is not match!',
        type: 'error'
      })
    } else if (newPassword === oldPassword) {
      setSnack({
        ...snack,
        open: true,
        message: 'New password must be different from old password!',
        type: 'error'
      })
    } else {
      const res = await AxiosInterceptors.put(urlConfig.user.updatePassword, {
        current_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmNewPassword
      })
        .then((res) => {
          if (res.status === 200) {
            setSnack({
              ...snack,
              open: true,
              message: 'Change password successfully!',
              type: 'success'
            })
          }
        })
        .catch((err) => {
          setSnack({
            ...snack,
            open: true,
            message: 'Change password failed!',
            type: 'error'
          })
        })
    }
  }
  return (
    <div style={{ width: '100%' }}>
      <SnackBar />
      <Helmet>
        <title>Change Password</title>
      </Helmet>
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
          <InputLabel htmlFor='outlined-old-password'>Current Password</InputLabel>
          <OutlinedInput
            id='outlined-old-password'
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
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
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
            <InputLabel htmlFor='outlined-new-password'>New Password</InputLabel>
            <OutlinedInput
              id='outlined-new-password'
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
            <InputLabel htmlFor='outlined-confirm-password'>Confirm New Password</InputLabel>
            <OutlinedInput
              id='outlined-confirm-password'
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
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
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
          <Button
            variant='contained'
            component='label'
            onClick={() => handleChangePassword()}
            sx={{
              backgroundColor: '#F8F6F4',
              color: 'black',
              '&:hover': {
                backgroundColor: '#F8F6F4',
                color: 'black'
              }
            }}
          >
            Save Change
          </Button>
          <Button variant='contained' component='label' color='error' onClick={() => handleReset()}>
            Reset
          </Button>
        </Stack>
      </Card>
    </div>
  )
}

export default ChangePassword
