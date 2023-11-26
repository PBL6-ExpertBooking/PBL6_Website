import React from 'react'
import { Box, Typography, Card, Avatar, Stack, Rating, Divider } from '@mui/material'
import styled from '@mui/material/styles/styled'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute'
}))
const ExpertCard = ({ expert }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const i = Math.floor(Math.random() * 20) + 1
  return (
    <>
      <Card sx={{ textAlign: 'center' }} onClick={() => navigate(`/expertDetail/${expert._id}`)}>
        <Box sx={{ position: 'relative' }}>
          <Box
            component='span'
            sx={{
              display: 'inline-block',
              bgcolor: 'currentColor',
              mask: `url('https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg') no-repeat center / contain`,
              WebkitMask: `url('https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg') no-repeat center / contain`,
              width: 144,
              height: 62,
              zIndex: 10,
              left: 0,
              right: 0,
              bottom: -26,
              mx: 'auto',
              position: 'absolute',
              color: 'background.paper'
            }}
          />
          <Avatar
            alt={expert.user.first_name}
            src={expert.user.photo_url}
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              left: 0,
              right: 0,
              bottom: -32,
              mx: 'auto',
              position: 'absolute'
            }}
          />
          <OverlayStyle />
          <img
            src={`https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_${i}.jpg`}
            alt={expert.user.first_name}
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover'
            }}
          />
        </Box>

        <Typography variant='h6' sx={{ mt: 6 }}>
          {expert.user.first_name} {expert.user.last_name}
        </Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary', mb: 2 }}>
          {expert.descriptions}
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack alignItems='center' sx={{ my: 2 }}>
          <Rating name='read-only' value={expert.average_rating} readOnly />
          <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
            {expert.rating_count} {t('reviews')}
          </Typography>
        </Stack>
      </Card>
    </>
  )
}

export default ExpertCard
