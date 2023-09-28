import React from 'react'
import { Box, Typography, Grid, Card, Avatar, Stack } from '@mui/material'

const TopExpert = () => {
  return (
    <Box
        sx={{
          width: '100%',
          px: 10,
        py: 5,  
        }}
      >
        <Typography variant='h4' sx={{ color: 'black' }}>
          Top Experts
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 5}}> 
              <Stack direction='row' spacing={3}>
                <Avatar
                  alt='Remy Sharp'
                  src='/static/images/avatar/1.jpg'
                  sx={{
                    width: 150,
                    height: 150,
                    mx: 'auto',
                    my: 5
                  }}
                />
                <Stack direction='column' justifyContent='center' alignItems='center'>
                  <Typography variant='h5'>
                    Nguyễn Văn A
                  </Typography>
                  <Typography variant='h6'>
                    IT Developer
                  </Typography>
                  <Typography variant='subtitle1'>
                    Đà Nẵng 
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 5}}> 
              <Stack direction='row' spacing={3}>
                <Avatar
                  alt='Remy Sharp'
                  src='/static/images/avatar/1.jpg'
                  sx={{
                    width: 150,
                    height: 150,
                    mx: 'auto',
                    my: 5
                  }}
                />
                <Stack direction='column' justifyContent='center' alignItems='center'>
                  <Typography variant='h5'>
                    Nguyễn Văn A
                  </Typography>
                  <Typography variant='h6'>
                    IT Developer
                  </Typography>
                  <Typography variant='subtitle1'>
                    Đà Nẵng 
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 5}}> 
              <Stack direction='row' spacing={3}>
                <Avatar
                  alt='Remy Sharp'
                  src='/static/images/avatar/1.jpg'
                  sx={{
                    width: 150,
                    height: 150,
                    mx: 'auto',
                    my: 5
                  }}
                />
                <Stack direction='column' justifyContent='center' alignItems='center'>
                  <Typography variant='h5'>
                    Nguyễn Văn A
                  </Typography>
                  <Typography variant='h6'>
                    IT Developer
                  </Typography>
                  <Typography variant='subtitle1'>
                    Đà Nẵng 
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ p: 5}}> 
              <Stack direction='row' spacing={3}>
                <Avatar
                  alt='Remy Sharp'
                  src='/static/images/avatar/1.jpg'
                  sx={{
                    width: 150,
                    height: 150,
                    mx: 'auto',
                    my: 5
                  }}
                />
                <Stack direction='column' justifyContent='center' alignItems='center'>
                  <Typography variant='h5'>
                    Nguyễn Văn A
                  </Typography>
                  <Typography variant='h6'>
                    IT Developer
                  </Typography>
                  <Typography variant='subtitle1'>
                    Đà Nẵng 
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
  )
}

export default TopExpert