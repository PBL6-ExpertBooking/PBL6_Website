import { useEffect, useState, lazy } from 'react'
import {
Tooltip,
Divider,
Box,
Card,
IconButton,
Table,
TableBody,
TableCell,
TableHead,
TablePagination,
TableRow,
TableContainer,
Typography,
useTheme,
CardHeader,
Avatar,
Stack
} from '@mui/material'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import Snackbar from '../../../../common/components/SnackBar'
import useSnackbar from '../../../../contexts/snackbar.context'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
import moment from 'moment'
import Label from '../../../../components/Label'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import LockIcon from '@mui/icons-material/Lock'

const BookingDetailInfoModal = lazy(() => import('../../components/BookingDetailInfoModal'))

const ExpertBookingTable = ({ jobRequests, fetchData }) => {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [openModal, setOpenModal] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [currentRow, setCurrentRow] = useState(null)
  const [item, setItem] = useState({})
  const { snack, setSnack } = useSnackbar()
  const theme = useTheme()

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = (event) => {
    setRowsPerPage(parseInt(event.target.value))
  }

  const handleCloseMenu = () => {
    setOpenMenu(null)
  }

  const handleClickShowBtn = (jobRequest) => {
    setCurrentRow(jobRequest)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

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

  useEffect(() => {
    if (isMobile) {
      setRowsPerPage(5)
    }
  }, [isMobile])
  return (
    <>
      <Snackbar />
      {openModal && (
        <BookingDetailInfoModal
          open={openModal}
          handleCloseModal={handleCloseModal}
          post={currentRow}
          fetchData={fetchData}
        />
      )}
      <Card>
        <CardHeader title={t('myBookings')} />
        <Divider />
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>

                {!isMobile && (
                  <>
                    <TableCell>{t('major')}</TableCell>
                  </>
                )}
                <TableCell>{t('title')}</TableCell>
                {!isMobile && (
                  <>
                    <TableCell>{t('timeBooking')}</TableCell>
                  </>
                )}
                <TableCell>{t('price')}</TableCell>
                <TableCell>{t('status')}</TableCell>
                <TableCell align='right'>{t('action')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? jobRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : jobRequests
              ).map((jobRequests) => {
                return (
                  <TableRow hover key={jobRequests._id}>
                    {!isMobile && (
                      <>
                        <TableCell>
                          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                            {jobRequests?.major}
                          </Typography>
                        </TableCell>
                      </>
                    )}
                    <TableCell>
                      <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                        {jobRequests?.title}
                      </Typography>
                    </TableCell>
                    {!isMobile && (
                      <>
                        <TableCell>
                          <Typography variant='body1' color='text.primary' gutterBottom noWrap>
                            {jobRequests.time_booking}
                          </Typography>
                        </TableCell>
                      </>
                    )}
                    <TableCell>
                      <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                        {jobRequests?.price}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1' fontWeight='bold' color='text.success' gutterBottom noWrap>
                        {getStatusLabel(jobRequests.status)}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Tooltip title={t('detailInfo')} arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.palette.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          onClick={() => {
                            handleClickShowBtn(jobRequests)
                          }}
                          color='inherit'
                          size='small'
                        >
                          <VisibilityTwoToneIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box>
          <TablePagination
            component='div'
            count={jobRequests.length}
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

export default ExpertBookingTable
