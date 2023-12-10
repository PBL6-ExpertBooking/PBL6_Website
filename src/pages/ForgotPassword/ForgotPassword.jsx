import { styled } from '@mui/material/styles'
import { Link, Container, Typography, Stack, TextField, Card } from '@mui/material'
// hooks
import useResponsive from '../../hooks/useResponsive'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Forgot_Photo from '../../assets/images/forgot_password.png'
import { useTranslation } from 'react-i18next'
import { LoadingButton } from '@mui/lab'
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}))

const StyledSection = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 800,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
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

export default function ForgotPassword() {
  const { t } = useTranslation()
  const session = null
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const login = async () => {
    navigate('/dashboard')
  }
  const mdUp = useResponsive('up', 'md')
  if (session) {
    navigate('/')
  } else
    return (
      <>
        <Helmet>
          <title>{t('forgotPassword')}</title>
        </Helmet>
        <StyledRoot>
          {mdUp && (
            <StyledSection>
              <img src={Forgot_Photo} alt='login' />
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
                {t('forgotPassword')}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>{t('forgotPasswordReminder')}</Typography>
              <Stack
                spacing={3}
                sx={{
                  my: 5
                }}
              >
                <TextField
                  name='email'
                  label='Email'
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </Stack>
              <LoadingButton fullWidth color='secondary' size='large' type='submit' variant='text' onClick={login}>
                {t('sendResetLink')}
              </LoadingButton>
              <Typography variant='body2' sx={{ my: 2 }}>
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
