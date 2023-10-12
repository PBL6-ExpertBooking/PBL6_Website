import { styled } from '@mui/material/styles'
import {
  Link,
  Container,
  Typography,
  Stack,
  Button,
  TextField,
} from '@mui/material'
// hooks
import useResponsive from '../../hooks/useResponsive'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Forgot_Photo from '../../assets/images/forgot_password.png'
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

export default function ForgotPassword() {
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
          <title>Forgot Password</title>
        </Helmet>
        <StyledRoot>
          {mdUp && (
            <StyledSection>
              <img src={Forgot_Photo} alt='login' />
            </StyledSection>
          )}
          <Container maxWidth='sm'>
            <StyledContent>
              <Typography variant='h4' gutterBottom>
                FORGOT PASSWORD
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Enter your email address below and we'll send you a link to reset your password.
              </Typography>
              <Stack spacing={3} sx={{ 
                my: 5,
               }}>
                <TextField
                  name='email'
                  label='Email'
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                />
              </Stack>
              <Button size='large' color='inherit' variant='outlined' onClick={login}>
                Send reset link
              </Button>
              <Typography variant='body2' sx={{ my: 5 }}>
                Don’t have an account?{' '}
                <Link variant='subtitle2' href='/register'>
                  Register Here
                </Link>
              </Typography>
            </StyledContent>
          </Container>
        </StyledRoot>
      </>
    )
}
