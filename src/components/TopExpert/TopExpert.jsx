import React from 'react'
import { Box, Typography, Grid, Card, Avatar, Stack, Rating } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const TopExpert = ({ topExpert }) => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        width: '100%',
        px: 10,
        py: 5
      }}
    >
      <Typography variant='h4' sx={{ color: 'black' }}>
        Top Experts
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {topExpert.map((expert) => (
          <Grid item xs={12} sm={6} md={3} key={expert._id}>
            <Card sx={{ p: 5, cursor: 'pointer' }} onClick={() => navigate(`/expertDetail/${expert._id}`)}>
              <Stack direction='row' spacing={3}>
                <Avatar
                  alt='Remy Sharp'
                  src={expert.user.photo_url}
                  sx={{
                    width: 150,
                    height: 150,
                    mx: 'auto',
                    my: 5
                  }}
                />
                <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
                  <Typography variant='h5'>
                    {expert.user.first_name} {expert.user.last_name}
                  </Typography>
                  <Typography variant='h6'>{expert.descriptions}</Typography>
                  <Typography variant='subtitle1'>Đà Nẵng</Typography>
                  <Rating name='read-only' value={expert.average_rating} readOnly />
                  <Typography variant='subtitle2'>{expert.rating_count} reviews</Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default TopExpert
