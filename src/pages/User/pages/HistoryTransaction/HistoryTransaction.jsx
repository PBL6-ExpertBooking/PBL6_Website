import React from 'react'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Fab } from '@mui/material'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import SearchIcon from '@mui/icons-material/Search'

function createData(name, price, time, methods) {
  return { name, price, time, methods }
}

const rows = [
  createData('Expert 01', 200000, '2021-10-10', 'Paypal'),
  createData('Expert 02', 150000, '2021-10-10', 'Paypal'),
  createData('Expert 03', 100000, '2021-10-10', 'Paypal')
]
const HistoryTransaction = () => {
  const [value, setValue] = React.useState(dayjs('2022-04-17'))
  return (
    <div style={{ width: '100%', padding: '20px 100px' }}>
      <Typography variant='h3' sx={{ margin: '1rem 0' }}>
        History Transaction
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']} sx={{ padding: '1rem 0' }}>
          <DatePicker label='From Date' value={value} onChange={(newValue) => setValue(newValue)} />
          <DatePicker label='To Date' value={value} onChange={(newValue) => setValue(newValue)} />
          <Fab
            aria-label='notifi'
            sx={{
              backgroundColor: '#E8DDDD'
            }}
          >
            <SearchIcon />
          </Fab>
        </DemoContainer>
      </LocalizationProvider>
      <TableContainer component={Paper} sx={{ mt: '1.5rem' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Expert Name</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Time</TableCell>
              <TableCell align='right'>Method</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.price}</TableCell>
                <TableCell align='right'>{row.time}</TableCell>
                <TableCell align='right'>{row.methods}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default HistoryTransaction
