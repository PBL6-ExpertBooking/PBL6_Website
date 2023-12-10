// @mui
import { Card, CardHeader, Typography, Stack, LinearProgress, Box } from '@mui/material'
// utils
// _mock_

// ----------------------------------------------------------------------

const _bookingsOverview = [
  { status: 'Pending', quantity: 25, value: 25 },
  { status: 'Cancel', quantity: 5, value: 5 },
  { status: 'Success', quantity: 70, value: 70 }
]
export default function BookingBooked() {
  return (
    <Card>
      <CardHeader title='Booked Job' />
      <Stack spacing={3} sx={{ px: 3, my: 5 }}>
        {_bookingsOverview.map((progress) => (
          <LinearProgress
            variant='determinate'
            key={progress.status}
            value={progress.value}
            color={
              (progress.status === 'Pending' && 'warning') || (progress.status === 'Cancel' && 'error') || 'success'
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
                  ...(progress.status === 'Pending' && { bgcolor: 'warning.main' }),
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
