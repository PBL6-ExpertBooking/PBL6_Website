import React from 'react'
import { Container, Grid, Stack, Card, CardContent, Typography } from '@mui/material'
import BookingWidgetSummary from '../../components/Dashboard/BookingWidgetSummary'
import BookingBooked from '../../components/Dashboard/BookingBooked'
import BookingReview from '../../components/Dashboard/BookingReview'
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded'
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded'
import AddCardRoundedIcon from '@mui/icons-material/AddCardRounded'
import HailRoundedIcon from '@mui/icons-material/HailRounded'
import AlignHorizontalRightRoundedIcon from '@mui/icons-material/AlignHorizontalRightRounded'
import dashboard from '../../../../assets/images/dashboard.svg'
import useResponsive from '../../../../hooks/useResponsive'

const DashBoard = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const isMobile = useResponsive('down', 'sm')
  return (
    <div
      style={
        isMobile
          ? { width: '100%', padding: '20px 20px', maxHeight: '93vh', overflow: 'auto' }
          : { width: '100%', padding: '20px 100px', maxHeight: '93vh', overflow: 'auto' }
      }
    >
      <Container maxWidth='xl'>
        <Grid container spacing={5}>
          <Grid item xs={12} md={12}>
            <Card
              sx={{
                background:
                  'linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2)) rgb(255, 255, 255)'
              }}
            >
              <CardContent>
                <Stack direction='row' spacing={5} alignItems='center' justifyContent='space-between'>
                  <div>
                    <Typography gutterBottom variant='h4'>
                      Welcome back 👋
                      <br /> {user.first_name} {user.last_name}
                    </Typography>
                    <Typography variant='body2' sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480 }}>
                      If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
                    </Typography>
                  </div>
                  <img src={dashboard} alt='dashboard' style={{ width: '200px', height: '200px' }} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title='Số lượng yêu cầu'
              total={714000}
              icon={
                <WorkOutlineRoundedIcon
                  sx={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title='Chuyên gia'
              total={311000}
              icon={
                <HailRoundedIcon
                  sx={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title='Người dùng'
              total={124000}
              icon={
                <EmojiPeopleRoundedIcon
                  sx={{
                    width: '100%',
                    height: '100%'
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <BookingWidgetSummary
                  title='Tổng tiền đã nạp'
                  total={12400000}
                  icon={
                    <AddCardRoundedIcon
                      sx={{
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <BookingWidgetSummary
                  title='Chuyên ngành'
                  total={124000}
                  icon={
                    <AlignHorizontalRightRoundedIcon
                      sx={{
                        width: '100%',
                        height: '100%'
                      }}
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <BookingBooked />
          </Grid>
          <Grid item xs={12} md={4}>
            <BookingReview />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default DashBoard
