import React from 'react'
import { Box, Card, CardContent, Typography, Avatar, Rating, Grid, Stack, CardHeader } from '@mui/material'
import RatingContent from '../../components/RatingContent'
import { Helmet } from 'react-helmet-async'

const ExpertDetail = () => {
  return (
    <>
      <Helmet>
        <title>Expert Detail</title>
      </Helmet>
      <Box
        sx={{
          px: 20,
          py: 5,
          backgroundColor: '#F5F5F5'
        }}
      >
        <Card
          sx={{
            width: '100%',
            py: 5,
            px: 10
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={3}>
              <Avatar
                alt='Remy Sharp'
                src='https://i.seadn.io/s/raw/files/06310c26d76cb50fb64dcd5256eb948e.png?auto=format&dpr=1&w=1000'
                sx={{ width: 250, height: 250 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='h3' sx={{ mt: 2 }}>
                Remy Sharp
              </Typography>
              <Stack direction='row' spacing={10} sx={{ mt: 5 }}>
                <div>
                  <Typography variant='h6' sx={{ mt: 2 }}>
                    Frontend Developer
                  </Typography>
                  <Typography variant='body1' sx={{ mt: 2 }}>
                    Da Nang City, Viet Nam
                  </Typography>
                </div>
                <div>
                  <Typography variant='h6' sx={{ mt: 2 }}>
                    Đã được thuê
                  </Typography>
                  <Typography variant='body1' sx={{ mt: 2 }}>
                    10 giờ
                  </Typography>
                </div>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant='h3' sx={{ my: 2 }}>
                150.000đ / 1 giờ
              </Typography>
              <Rating name='read-only' value={5} readOnly />
              <Typography variant='subtitle2'>10 đánh giá</Typography>
            </Grid>
          </Grid>
        </Card>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardHeader title='Thông tin liên hệ' />
              <CardContent>
                <Typography variant='body1'>Email:</Typography>
                <Typography variant='body1' sx={{ my: 2 }}>
                  Số điện thoại:
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Card>
              <CardHeader title='Đánh giá' />
              <CardContent>
                <Stack direction='column' spacing={1}>
                  <RatingContent photoURL='https://i.seadn.io/s/raw/files/8a2ba20257690ce5e47cde115bce13e6.png?auto=format&dpr=1&w=1000' />
                  <RatingContent photoURL='https://i.seadn.io/s/raw/files/ff24a5434aa00e6645bda8b6d0d4a991.png?auto=format&dpr=1&w=1000' />
                  <RatingContent photoURL='https://i.seadn.io/gae/VHVse2oudUymb_bJPFoK09BAat6X6ArBX3DBiJHYN0wJYpAOP91H0HiCNT8qjiNnhn4WFykaQS5nZLx8x-AFOI5yvBoAylQVwEPzjqM?auto=format&dpr=1&w=1000' />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default ExpertDetail
