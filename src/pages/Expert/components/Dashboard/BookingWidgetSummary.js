// @mui
import { styled } from '@mui/material/styles'
import { Card, Typography, Box } from '@mui/material'
import numeral from 'numeral'

// utils
// ----------------------------------------------------------------------
export function fShortenNumber(number) {
  return numeral(number).format('0.00a').replace('.00', '')
}
const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3)
}))

export default function BookingWidgetSummary({ title, total, icon }) {
  return (
    <RootStyle>
      <div>
        <Typography variant='h3'>{fShortenNumber(total)}</Typography>
        <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </div>
      <Box
        sx={{
          width: 120,
          height: 120,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
          color: 'cornflowerblue'
        }}
      >
        {icon}
      </Box>
    </RootStyle>
  )
}
