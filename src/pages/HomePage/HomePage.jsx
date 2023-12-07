import { Box, Button, Stack, Typography, Card, CardHeader, CardContent, Grid } from '@mui/material'
import React from 'react'
import image from '../../assets/images/homepage.gif'
import expert from '../../assets/images/expert.gif'
import client from '../../assets/images/client.gif'
import transaction from '../../assets/images/transaction.gif'
import review from '../../assets/images/review.gif'
import useResponsive from '../../hooks/useResponsive'
const HomePage = () => {
  const isMobile = useResponsive('down', 'sm')
  return (
    <Box sx={isMobile ? { px: 5, pb: 1, pt: 2 } : { px: 20, pb: 10, pt: 2 }}>
      <Card>
        <Stack
          direction='row'
          spacing={5}
          justifyContent='center'
          alignItems='center'
          sx={{
            width: '100%',
            height: '50vh'
          }}
        >
          <Stack direction='column' spacing={2} justifyContent='center'>
            <Typography variant='h2' component='h2' sx={{ color: '#000000', fontWeight: 'bold' }}>
              What
            </Typography>
            <Typography variant='h2' component='h2' sx={{ color: '#000000', fontWeight: 'bold' }}>
              Can We
            </Typography>
            <Typography variant='h2' component='h2' sx={{ color: '#000000', fontWeight: 'bold' }}>
              Help You ?
            </Typography>
            <Button variant='contained' sx={{ backgroundColor: '#000000', color: '#FFFFFF', fontWeight: 'bold' }}>
              Explore Now
            </Button>
            <Button variant='contained' color='error' sx={{ color: '#FFF', fontWeight: 'bold' }}>
              Download App
            </Button>
          </Stack>
          {isMobile ? <></> : <img src={image} alt='homepage' style={{ width: '50%' }} />}
        </Stack>
      </Card>
      <Grid container spacing={2} sx={{ height: 'auto', pt: 4 }} justifyContent='center' alignItems='center'>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: '100%',
              py: 2
            }}
          >
            <Stack direction='column' spacing={2} justifyContent='center' alignItems='center'>
              <img src={expert} alt='expert' style={{ width: '50%' }} />
              <Typography variant='h6' component='h6' sx={{ color: '#000000', fontWeight: 'bold' }}>
                Over 1000+ Experts
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          {' '}
          <Card
            sx={{
              height: '100%',
              py: 2
            }}
          >
            <Stack direction='column' spacing={2} justifyContent='center' alignItems='center'>
              <img src={client} alt='expert' style={{ width: '50%' }} />
              <Typography variant='h6' component='h6' sx={{ color: '#000000', fontWeight: 'bold' }}>
                Over 5000+ Clients
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          {' '}
          <Card
            sx={{
              height: '100%',
              py: 2
            }}
          >
            <Stack direction='column' spacing={2} justifyContent='center' alignItems='center'>
              <img src={review} alt='expert' style={{ width: '50%' }} />
              <Typography variant='h6' component='h6' sx={{ color: '#000000', fontWeight: 'bold' }}>
                Over 10000+ Reviews
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          {' '}
          <Card
            sx={{
              height: '100%',
              py: 2
            }}
          >
            <Stack direction='column' spacing={2} justifyContent='center' alignItems='center'>
              <img src={transaction} alt='expert' style={{ width: '50%' }} />
              <Typography variant='h6' component='h6' sx={{ color: '#000000', fontWeight: 'bold' }}>
                Over 20000+ Transactions
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%'
            }}
          >
            <CardHeader title='Welcome to the Expert Hiring Platform!' sx={{ color: '#000000', fontWeight: 'bold' }} />
            <CardContent>
              <Typography variant='h6' component='h6' sx={{ color: '#000000', fontWeight: '500' }}>
                Finding and hiring experts in your desired field has never been easier. Whether you need advice in your
                profession, finance, health, or technology, we have thousands of experts ready to assist you.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: '100%'
            }}
          >
            <CardHeader title='How to get started?' sx={{ color: '#000000', fontWeight: 'bold' }} />
            <CardContent>
              1. Search for Experts: Use the search tool below to enter the field or keywords you're interested in. You
              can also search based on location and ratings.
              <br />
              2. Explore Expert Profiles: View detailed information about experts, including their experience, ratings
              from other users, and images.
              <br />
              3. Contact and Hire Experts: When you find a suitable expert, get in touch with them and start your chat
              or project right away.
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HomePage
