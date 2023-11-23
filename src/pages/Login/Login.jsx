import { styled } from '@mui/material/styles'
import { Link, Container, Typography, Stack, Button, TextField, Checkbox, FormControlLabel } from '@mui/material'
import useResponsive from '../../hooks/useResponsive'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginPhoto from '../../assets/images/login.png'
import axios from 'axios'
import useSnackbar from '../../contexts/snackbar.context'
import urlConfig from '../../config/UrlConfig'
import Snackbar from '../../common/components/SnackBar'
import { setProfileToLS } from '../../utils/auth'
import { useCookies } from 'react-cookie'
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

export default function LoginPage() {
  const { t } = useTranslation()
  const session = null
  const navigate = useNavigate()
  const [cookies, setCookie] = useCookies(['user'])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { snack, setSnack } = useSnackbar()
  const login = async () => {
    const response = await axios
      .post(urlConfig.authentication.login, {
        username: username,
        password: password
      })
      .then((res) => {
        if (res.status === 200) {
          setProfileToLS(res.data.user)
          setCookie('access_token', res.data.tokens.access_token, { path: '/' })
          setCookie('refresh_token', res.data.tokens.refresh_token, { path: '/' })
          window.location.reload()
        }
      })
      .catch((err) => {
        setSnack({
          open: true,
          type: 'error',
          message: `${err.response.data.message}`
        })
      })
    // navigate('/dashboard')
  }
  const mdUp = useResponsive('up', 'md')
  if (session) {
    navigate('/')
  } else
    return (
      <>
        <Helmet>
          <title>{t('signIn')}</title>
        </Helmet>
        <Snackbar />
        <StyledRoot>
          {mdUp && (
            <StyledSection>
              <img src={LoginPhoto} alt='login' />
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
                {t('signIn')}
              </Typography>
              <Stack spacing={3}>
                <TextField
                  name='username'
                  label={t('username')}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                />

                <TextField
                  name='password'
                  label={t('password')}
                  type='password'
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      login()
                    }
                  }}
                />
              </Stack>

              <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ my: 2 }}>
                <FormControlLabel control={<Checkbox defaultChecked />} label={t('rememberMe')} />
                <Link variant='subtitle2' underline='hover' href='/forgotpassword'>
                  {t('forgotPassword')}?
                </Link>
              </Stack>
              <Button size='large' color='inherit' variant='outlined' onClick={login}>
                {t('login')}
              </Button>
              <Typography variant='body2' sx={{ mb: 5 }}>
                {t('dontHaveAccount')}{' '}
                <Link variant='subtitle2' href='/register'>
                  {t('registerNow')}
                </Link>
              </Typography>
            </StyledContent>
          </Container>
        </StyledRoot>
      </>
    )
}
