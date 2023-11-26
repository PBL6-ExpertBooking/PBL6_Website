import React from 'react'
import { Box, Typography, Grid, Container } from '@mui/material'
import svg from '../../assets/images/empty.png'
import { useTranslation } from 'react-i18next'
import ExpertCard from '../ExpertCard'
const ListSearch = (props) => {
  const { t } = useTranslation()
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
            <ExpertCard expert={expert} />
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
