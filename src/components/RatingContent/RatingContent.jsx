import React from 'react'
import { Typography, Avatar, Rating, Grid, Stack } from '@mui/material'

const RatingContent = (props) => {
  return (
    <Grid container spacing={2} >
      <Grid item xs={12} sm={2} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Avatar
          alt='Remy Sharp'
          src={props.photoURL}
          sx={{ width: 80, height: 80 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack direction='row' spacing={5}>
        <Typography variant='h6'>
          Remy Sharp
        </Typography>
        <Typography variant='subtitle2' sx={{mt : 1}}>
          11/10/2021
        </Typography>
        </Stack>
        <Typography variant='subtitle1' sx={{mt : 2}}>
          Chat luong rat tot, rat nhiet tinh, rat vui ve
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Rating name='read-only' value={5} readOnly />
      </Grid>
    </Grid>
  )
}

export default RatingContent