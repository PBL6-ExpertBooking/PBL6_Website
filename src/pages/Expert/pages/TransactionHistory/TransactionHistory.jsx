import {
  Box,
  Stack,
  Button,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import React from 'react'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import SendIcon from '@mui/icons-material/Send'
import { Helmet } from 'react-helmet-async'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const TransactionHistory = () => {
  const [value, setValue] = React.useState(dayjs('2022-04-17'))

  return (
    <div style={{ width: '100%' }}>
      <Helmet>
        <title>Expert - Transaction History</title>
      </Helmet>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#dfdfdf',
          padding: '20px',
          margin: '20px 100px'
        }}
      >
        <Stack
          spacing={2}
          direction='row'
          sx={{
            width: '100%',
            height: '100vh'
          }}
        >
          <Box sx={{ display: 'block', width: '100%' }}>
            <Typography variant='h4' component='h4' sx={{ mt: '1.5rem' }}>
              Transaction History
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker label='From Date' value={value} onChange={(newValue) => setValue(newValue)} />
                <DatePicker label='To Date' value={value} onChange={(newValue) => setValue(newValue)} />
                <Button
                  variant='contained'
                  endIcon={<SendIcon />}
                  sx={{
                    width: '150px'
                  }}
                >
                  Seach
                </Button>
              </DemoContainer>
            </LocalizationProvider>
            <TableContainer component={Paper} sx={{ mt: '1.5rem' }}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align='right'>Calories</TableCell>
                    <TableCell align='right'>Fat&nbsp;(g)</TableCell>
                    <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
                    <TableCell align='right'>Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        {row.name}
                      </TableCell>
                      <TableCell align='right'>{row.calories}</TableCell>
                      <TableCell align='right'>{row.fat}</TableCell>
                      <TableCell align='right'>{row.carbs}</TableCell>
                      <TableCell align='right'>{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Card>
    </div>
  )
}

export default TransactionHistory
