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
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'

const ChangePassword = () => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
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
        message: t('passwordMustMatch'),
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
          message: t('updatePasswordSuccess'),
          type: 'success'
        })
        navigate(path.expertProfile)
      })
      .catch((err) => {
        console.log(err)
        setSnack({
          open: true,
          message: t('updatePasswordFail'),
          type: 'error'
        })
      })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  return (
    <div style={{ width: '100%' }}>
      <Helmet>
        <title>{t('changePassword')}</title>
      </Helmet>
      <Snackbar />
      <Card
        sx={
          isMobile
            ? { display: 'flex', flexDirection: 'column', padding: '20px', margin: '20px 20px' }
            : {
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                margin: '20px 100px'
              }
        }
      >
        <Typography variant='h4' component='h4' sx={{ margin: '1rem' }}>
          {t('changePassword')}
        </Typography>
        <FormControl
          variant='outlined'
          sx={
            isMobile
              ? { m: 1, width: '95%' }
              : {
                  m: 1,
                  width: '48%'
                }
          }
        >
          <InputLabel htmlFor='outlined-adornment-password'>{t('currentPassword')}</InputLabel>
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
            '& .MuiTextField-root': isMobile
              ? { m: 1, width: '95%' }
              : {
                  m: 1,
                  width: '48%'
                }
          }}
        >
          <FormControl
            variant='outlined'
            sx={
              isMobile
                ? { m: 1, width: '95%' }
                : {
                    m: 1,
                    width: '48%'
                  }
            }
          >
            <InputLabel htmlFor='outlined-adornment-password'>{t('newPassword')}</InputLabel>
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
            sx={
              isMobile
                ? { m: 1, width: '95%' }
                : {
                    m: 1,
                    width: '48%'
                  }
            }
          >
            <InputLabel htmlFor='outlined-adornment-password'>{t('confirmNewPassword')}</InputLabel>
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
          {t('passwordRequirements')}
        </Typography>
        <Typography variant='subtitle2' gutterBottom sx={{ marginLeft: '1rem' }}>
          - {t('passwordRequirements.1')}
        </Typography>
        <Typography variant='subtitle2' gutterBottom sx={{ marginLeft: '1rem' }}>
          - {t('passwordRequirements.2')}
        </Typography>
        <Typography variant='subtitle2' gutterBottom sx={{ marginLeft: '1rem' }}>
          - {t('passwordRequirements.3')}
        </Typography>
        <Stack
          spacing={1}
          direction='row'
          alignItems='center'
          justifyContent='flex-end'
          sx={
            isMobile
              ? { marginTop: '2rem' }
              : {
                  marginRight: '2rem'
                }
          }
        >
          <Button variant='text' component='label' color='success' onClick={handleUpdatePassword}>
            {t('saveChanges')}
          </Button>
          <Button variant='text' component='label' color='error' onClick={handleResetForm}>
            {t('reset')}
          </Button>
        </Stack>
      </Card>
    </div>
  )
}

export default ChangePassword
