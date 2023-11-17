import { useState } from 'react'
import moment from 'moment'
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material'

import Label from '../../../../components/Label'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'

const getStatusLabel = (transaction) => {
  const map = {
    CANCELED: {
      text: 'Canceled',
      color: 'error'
    },
    DONE: {
      text: 'Completed',
      color: 'success'
    },
    PENDING: {
      text: 'Pending',
      color: 'warning'
    },
    PROCESSING: {
      text: 'Processing',
      color: 'info'
    }
  }

  const { text, color } = map[transaction]

  return <Label color={color}>{text}</Label>
}

const applyFilters = (cryptoOrders, filters) => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true

    if (filters.status && cryptoOrder.transaction_status !== filters.status) {
      matches = false
    }

    return matches
  })
}

const applyPagination = (cryptoOrders, page, limit) => {
  return cryptoOrders.slice(page * limit, page * limit + limit)
}

const TransactionTable = ({ transaction }) => {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(5)
  const [filters, setFilters] = useState({
    status: null
  })

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'DONE',
      name: 'Completed'
    },
    {
      id: 'PROCESSING',
      name: 'Processing'
    },
    {
      id: 'CANCELED',
      name: 'Canceled'
    },
    {
      id: 'PENDING',
      name: 'Pending'
    }
  ]

  const handleStatusChange = (e) => {
    let value = null

    if (e.target.value !== 'all') {
      value = e.target.value
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }))
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value))
  }

  const filteredCryptoOrders = applyFilters(transaction, filters)
  const paginatedCryptoOrders = applyPagination(filteredCryptoOrders, page, limit)
  const theme = useTheme()
  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant='outlined'>
              <InputLabel>Status</InputLabel>
              <Select value={filters.status || 'all'} onChange={handleStatusChange} label='Status' autoWidth>
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title='Recent Transactions'
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>To</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align='right'>Amount</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              return (
                <TableRow hover key={cryptoOrder.id}>
                  <TableCell>
                    {cryptoOrder.expert ? (
                      <>
                        <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                          {cryptoOrder.expert.first_name} {cryptoOrder.expert.last_name}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                          Me
                        </Typography>
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2' color='text.secondary' noWrap>
                      {moment(cryptoOrder.updatedAt).format('DD/MM/YYYY, h:mm:ss a')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {cryptoOrder.transaction_type}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='body2' color='text.secondary' noWrap>
                      {cryptoOrder.amount.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>{getStatusLabel(cryptoOrder.transaction_status)}</TableCell>
                  <TableCell align='right'>
                    <Tooltip title='Edit Order' arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.palette.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color='inherit'
                        size='small'
                      >
                        <EditTwoToneIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete Order' arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.palette.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color='inherit'
                        size='small'
                      >
                        <DeleteTwoToneIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component='div'
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  )
}

export default TransactionTable
