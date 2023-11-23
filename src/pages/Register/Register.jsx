// @mui
import { styled } from '@mui/material/styles'
import { Link, Container, Typography, Stack, Button, TextField } from '@mui/material'
// hooks
import useResponsive from '../../hooks/useResponsive'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Snackbar from '../../common/components/SnackBar'
import useSnackbar from '../../contexts/snackbar.context'
import image from '../../assets/images/login.png'
import axios from 'axios'
import urlConfig from '../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}))

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 800,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.shadows[10],
  backgroundColor: '#FF8686'
}))

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}))

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { snack, setSnack } = useSnackbar()
  const mdUp = useResponsive('up', 'md')
  const register = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    const res = await axios
      .post(urlConfig.authentication.register, {
        first_name: firstname,
        last_name: lastname,
        email: email,
        username: username,
        password: password
      })
      .then((res) => {
        navigate('/login')
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: err.response.data.message,
          type: 'error'
        })
      })
  }
  return (
    <>
      <Helmet>
        <title>{t('register')}</title>
      </Helmet>
      <Snackbar />
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img src={image} alt='register' />
          </StyledSection>
        )}
        <Container maxWidth='sm'>
          <StyledContent>
            <Typography
              variant='h4'
              gutterBottom
              sx={{
                textTransform: 'uppercase'
              }}
            >
              {t('signUp')}
            </Typography>
            <Stack spacing={3}>
              <TextField
                name='username'
                label={t('username')}
                required
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
              <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
                <TextField
                  name='name'
                  label={t('firstName')}
                  required
                  onChange={(e) => {
                    setFirstname(e.target.value)
                  }}
                />
                <TextField
                  name='surname'
                  label={t('lastName')}
                  required
                  onChange={(e) => {
                    setLastname(e.target.value)
                  }}
                />
              </Stack>
              <TextField
                name='email'
                label='Email'
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <TextField
                name='password'
                label={t('password')}
                type='password'
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <TextField
                name='passwordconfirm'
                label={t('passwordConfirm')}
                type='password'
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </Stack>
            <Button size='large' color='inherit' variant='outlined' sx={{ my: 2 }} onClick={register}>
              {t('register')}
            </Button>
            <Typography variant='body2' sx={{ mb: 5 }}>
              {t('alreadyMember')}{' '}
              <Link variant='subtitle2' href='/login'>
                {t('signIn')}
              </Link>
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  )
}
