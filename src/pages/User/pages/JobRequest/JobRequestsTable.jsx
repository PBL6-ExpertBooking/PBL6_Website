import { useState } from 'react'
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material'
import Label from '../../../../components/Label'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import PaidTwoToneIcon from '@mui/icons-material/PaidTwoTone'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnack from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import DetailJobRequest from './DetailJobRequest'
import PaymentConfirm from './PaymentConfirm'

const getStatusLabel = (jobStatus) => {
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

  const { text, color } = map[jobStatus]

  return <Label color={color}>{text}</Label>
}

const JobRequestTable = ({ majorsOrder, fetchData }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const { snack, setSnack } = useSnack()
  const [open, setOpen] = useState(false)
  const [openPayment, setOpenPayment] = useState(false)
  const [id, setId] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const theme = useTheme()
  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = (event) => {
    setRowsPerPage(parseInt(event.target.value))
  }
  const handleDone = async (id) => {
    await AxiosInterceptors.post(urlConfig.job_requests.doneJobRequests + `/${id}/complete`)
      .then((res) => {
        if (res && res.status === 200) {
          setSnack({
            ...snack,
            open: true,
            message: 'Change status successfully!',
            type: 'success'
          })
          fetchData()
        }
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: 'Change status failed!',
          type: 'error'
        })
      )
  }
  return (
    <>
      <Snackbar />
      {open && <DetailJobRequest open={open} setOpen={setOpen} id={id} />}
      {openPayment && <PaymentConfirm open={openPayment} setOpen={setOpenPayment} id={id} fetchData={fetchData} />}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Descriptions</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Address</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? majorsOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : majorsOrder
              ).map((majorsOrder) => {
                return (
                  <TableRow hover key={majorsOrder._id}>
                    <TableCell>
                      <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                        {majorsOrder.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                        {majorsOrder.descriptions}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                        {majorsOrder.price}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                        {getStatusLabel(majorsOrder.status)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                        {majorsOrder.address.city.name}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      {majorsOrder.status === 'PENDING' && (
                        <>
                          <Tooltip title='Edit Request' arrow>
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
                          <Tooltip title='Delete Request' arrow>
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
                        </>
                      )}
                      {majorsOrder.status === 'PROCESSING' && (
                        <>
                          <Tooltip title='Detail Information' arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.palette.primary.lighter
                                },
                                color: theme.palette.primary.main
                              }}
                              color='inherit'
                              size='small'
                              onClick={() => {
                                setId(majorsOrder._id)
                                setOpen(true)
                              }}
                            >
                              <VisibilityTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='Done!' arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.palette.success.lighter
                                },
                                color: theme.palette.success.main
                              }}
                              color='inherit'
                              size='small'
                              onClick={() => {
                                if (user.balance < majorsOrder.price) {
                                  setSnack({
                                    ...snack,
                                    open: true,
                                    message: 'Your balance is not enough!',
                                    type: 'error'
                                  })
                                } else handleDone(majorsOrder._id)
                              }}
                            >
                              <CheckCircleOutlineTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      {majorsOrder.status === 'DONE' && (
                        <>
                          <Tooltip title='Detail Information' arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.palette.primary.lighter
                                },
                                color: theme.palette.primary.main
                              }}
                              color='inherit'
                              size='small'
                              onClick={() => {
                                setId(majorsOrder._id)
                                setOpen(true)
                              }}
                            >
                              <VisibilityTwoToneIcon fontSize='small' />
                            </IconButton>
                          </Tooltip>
                          {!majorsOrder.time_payment && (
                            <Tooltip title='Pay Money' arrow>
                              <IconButton
                                sx={{
                                  '&:hover': {
                                    background: theme.palette.success.lighter
                                  },
                                  color: theme.palette.success.main
                                }}
                                color='inherit'
                                size='small'
                                onClick={() => {
                                  setId(majorsOrder._id)
                                  setOpenPayment(true)
                                }}
                              >
                                <PaidTwoToneIcon fontSize='small' />
                              </IconButton>
                            </Tooltip>
                          )}
                        </>
                      )}
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
            count={majorsOrder.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>
    </>
  )
}

export default JobRequestTable
