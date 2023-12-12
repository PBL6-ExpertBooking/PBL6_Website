import React from 'react'
import { Typography, Avatar, Rating, Grid, Stack, Divider } from '@mui/material'
import moment from 'moment'

const RatingContent = (props) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Avatar alt='Remy Sharp' src={props.photoURL} sx={{ width: 80, height: 80 }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack direction='row' spacing={5} alignItems='center'>
            <Typography variant='h6'>{props.name}</Typography>
            <Typography variant='subtitle2' sx={{ mt: 1 }}>
              {moment(props.date).format('DD/MM/YYYY')}
            </Typography>
          </Stack>
          <Typography variant='subtitle1' sx={{ mt: 2 }}>
            {props.comment}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Rating name='read-only' value={props.rating} readOnly />
        </Grid>
      </Grid>
      <Divider />
    </>
  )
}

export default RatingContent
