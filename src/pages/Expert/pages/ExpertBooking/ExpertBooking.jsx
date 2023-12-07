import { useState, lazy } from 'react'
// @mui
import { Stack, Button, Container, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'
const BookingDetailInfoModal = lazy(() => import('../../components/BookingDetailInfoModal'))

export default function ExpertBooking() {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [jobRequests, setJobRequests] = useState([])
  const [item, setItem] = useState({})
  const [refresh, setRefresh] = useState(false)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.expert.acceptJobRequest)
      .then((res) => {
        res.data.pagination.job_requests.map((jobRequest) => {
          jobRequest.major = jobRequest.major.name
          jobRequest.time = jobRequest.time_booking
          jobRequest.price = jobRequest.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
          jobRequest.time_booking = moment(jobRequest.time_booking).format('DD/MM/YYYY h:mm:ss A')
        })
        setJobRequests(res.data.pagination.job_requests)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchData()
  }, [refresh])
  useEffect(() => {
    fetchData()
  }, [])
  const columns = [
    { field: 'major', headerName: t('major'), flex: 1 },
    { field: 'title', headerName: t('title'), flex: 2 },
    { field: 'time_booking', headerName: t('timeBooking'), flex: 3 },
    {
      field: 'price',
      headerName: t('price'),
      flex: 1,
      renderCell: (params) => {
        return <Typography variant='body2'>{params.value}</Typography>
      }
    },
    { field: 'status', headerName: t('status'), flex: 1 },
    {
      field: 'action',
      headerName: t('action'),
      width: 180,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        return (
          <Stack direction='row' spacing={2}>
            <Button
              variant='contained'
              color='warning'
              size='small'
              onClick={(e) => {
                handleOpenModal(e, params.row)
              }}
            >
              {t('showDetail')}
            </Button>
          </Stack>
        )
      }
    }
  ]
  const handleOpenModal = (e, row) => {
    setItem(row)
    setOpen(true)
  }

  const handleCloseModal = () => {
    setOpen(false)
  }

  return (
    <>
      <Helmet>
        <title>{t('myBookings')}</title>
      </Helmet>
      <Container sx={isMobile ? {} : { minWidth: 1500 }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={3}>
          <Typography variant='h3' gutterBottom>
            {t('myBookings')}
          </Typography>
        </Stack>
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            getRowHeight={() => 'auto'}
            rows={jobRequests}
            columns={columns}
            editMode='row'
            sx={{
              '& .MuiDataGrid-row': {
                minHeight: '64px !important'
              }
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } }
            }}
            pageSizeOptions={[10, 20, 30, 50]}
          />
        </div>
      </Container>
      <BookingDetailInfoModal
        open={open}
        handleCloseModal={handleCloseModal}
        post={item}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    </>
  )
}
