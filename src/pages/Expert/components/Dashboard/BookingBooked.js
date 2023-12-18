// @mui
import { Card, CardHeader, Typography, Stack, LinearProgress, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function BookingBooked({ canceled, done, processing }) {
  const { t } = useTranslation()
  const _bookingsOverview = [
    { status: 'Cancelled', quantity: canceled, value: canceled, tag: 'cancelled' },
    { status: 'Completed', quantity: done, value: done, tag: 'completed' },
    { status: 'Processing', quantity: processing, value: processing, tag: 'processing' }
  ]
  return (
    <Card>
      <CardHeader title={t('jobRequestAccepted')} />
      <Stack spacing={3} sx={{ px: 3, my: 5 }}>
        {_bookingsOverview.map((progress) => (
          <LinearProgress
            variant='determinate'
            key={progress.status}
            value={progress.value}
            color={
              (progress.status === 'Processing' && 'warning') ||
              (progress.status === 'Cancelled' && 'error') ||
              'success'
            }
            sx={{ height: 8, bgcolor: 'grey.50016' }}
          />
        ))}
      </Stack>

      <Stack direction='row' justifyContent='space-between' sx={{ px: 3, pb: 3 }}>
        {_bookingsOverview.map((progress) => (
          <Stack key={progress.status} alignItems='center'>
            <Stack direction='row' alignItems='center' spacing={1} sx={{ mb: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: 0.5,
                  bgcolor: 'success.main',
                  ...(progress.status === 'Processing' && { bgcolor: 'warning.main' }),
                  ...(progress.status === 'Cancelled' && { bgcolor: 'error.main' })
                }}
              />
              <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                {t(progress.tag)}
              </Typography>
            </Stack>

            <Typography variant='h6'>{progress.quantity}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  )
}
