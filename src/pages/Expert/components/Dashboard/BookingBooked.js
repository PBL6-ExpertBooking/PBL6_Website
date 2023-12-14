// @mui
import { Card, CardHeader, Typography, Stack, LinearProgress, Box } from '@mui/material'

export default function BookingBooked({ canceled, done, processing }) {
  const _bookingsOverview = [
    { status: 'Cancel', quantity: canceled, value: canceled },
    { status: 'Success', quantity: done, value: done },
    { status: 'Processing', quantity: processing, value: processing }
  ]
  return (
    <Card>
      <CardHeader title='Công việc đã nhận' />
      <Stack spacing={3} sx={{ px: 3, my: 5 }}>
        {_bookingsOverview.map((progress) => (
          <LinearProgress
            variant='determinate'
            key={progress.status}
            value={progress.value}
            color={
              (progress.status === 'Processing' && 'warning') || (progress.status === 'Cancel' && 'error') || 'success'
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
                  ...(progress.status === 'Cancel' && { bgcolor: 'error.main' })
                }}
              />
              <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                {progress.status}
              </Typography>
            </Stack>

            <Typography variant='h6'>{progress.quantity}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  )
}
