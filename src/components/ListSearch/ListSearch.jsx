import React from 'react'
import { Box, Typography, Grid, Card, Avatar, Stack, Rating, Container } from '@mui/material'
import svg from '../../assets/images/empty.png'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
const ListSearch = (props) => {
  const { t } = useTranslation()
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
        {t('searchResults')}: {props.listExpert.length}
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {props.listExpert.map((expert) => (
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
                  <Typography variant='subtitle1'>{moment(expert.createdAt).format('DD/MM/YYYY')}</Typography>
                  <Rating name='read-only' value={expert.average_rating} readOnly />
                  <Typography variant='subtitle2'>
                    {expert.rating_count} {t('reviews')}
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
        {props.listExpert.length === 0 && (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Container maxWidth='md'>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                <img alt='404' height={200} src={svg} />
                <Typography variant='h3' color='text.secondary' fontWeight='500' sx={{ mt: 2 }}>
                  {t('noResults')}
                </Typography>
              </Box>
            </Container>
          </div>
        )}
      </Grid>
    </Box>
  )
}

export default ListSearch
