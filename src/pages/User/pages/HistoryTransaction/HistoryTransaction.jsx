import React from 'react'
import { Typography, Fab, Stack } from '@mui/material'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import SearchIcon from '@mui/icons-material/Search'
import { Helmet } from 'react-helmet-async'
import Transaction from './Transaction'
import { useTranslation } from 'react-i18next'

const HistoryTransaction = () => {
  const { t } = useTranslation()
  const [value, setValue] = React.useState(dayjs('2022-04-17'))
  return (
    <div style={{ width: '100%', padding: '20px 100px', maxHeight: '93vh', overflow: 'auto' }}>
      <Helmet>
        <title>{t('historyTransaction')}</title>
      </Helmet>
      <Stack direction='row' spacing={2} justifyContent='space-between'>
        <Typography variant='h3' sx={{ margin: '1rem 0' }}>
          {t('historyTransaction')}
        </Typography>
        <Stack direction='row' spacing={2} sx={{ marginBottom: '20px', float: 'right' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ padding: '1rem 0' }}>
              <DatePicker label={t('fromDate')} value={value} onChange={(newValue) => setValue(newValue)} />
              <DatePicker label={t('toDate')} value={value} onChange={(newValue) => setValue(newValue)} />
              <Fab aria-label='notifi'>
                <SearchIcon />
              </Fab>
            </DemoContainer>
          </LocalizationProvider>
        </Stack>
      </Stack>
      <Transaction />
    </div>
  )
}

export default HistoryTransaction
