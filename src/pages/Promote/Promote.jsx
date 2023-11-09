import { Box, Typography, Container, Button, styled } from '@mui/material'
import svg from '../../assets/images/promote.png'
import { Helmet } from 'react-helmet-async'

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
)

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Promote To Expert</title>
      </Helmet>
      <MainContent>
        <Container maxWidth='md'>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <img alt='404' height={400} src={svg} />
            <Typography variant='h2' sx={{ my: 2 }}>
              Congrate! You are now an expert.
            </Typography>
            <Typography variant='h4' color='text.secondary' fontWeight='normal' sx={{ mb: 4 }}>
              Now you can accept job request from user and earn money.
            </Typography>
          </Box>
          <Container maxWidth='sm' sx={{ textAlign: 'center', mt: 3, p: 4 }}>
            <Button href='/login' variant='outlined'>
              Go to login page
            </Button>
          </Container>
        </Container>
      </MainContent>
    </>
  )
}

export default NotFound
