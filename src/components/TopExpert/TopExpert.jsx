import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ExpertCard from '../ExpertCard'

const TopExpert = ({ topExpert }) => {
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
        {t('topExpert')}
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {topExpert.map((expert) => (
          <Grid item xs={12} sm={6} md={3} key={expert._id}>
            <ExpertCard expert={expert} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default TopExpert
