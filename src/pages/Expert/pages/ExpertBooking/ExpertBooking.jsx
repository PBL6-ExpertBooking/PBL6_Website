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
import Loading from '../../../../common/components/Loading/Loading'
import ExpertBookingTable from './ExpertBookingTable'
// const BookingDetailInfoModal = lazy(() => import('../../components/BookingDetailInfoModal'))

export default function ExpertBooking() {
  const isMobile = useResponsive('down', 'sm')
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [jobRequests, setJobRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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
				setIsLoading(false)
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

  return (
    <div
      style={
        isMobile
          ? { width: '100%', padding: '20px 20px', maxHeight: '93vh', overflow: 'auto' }
          : { width: '100%', padding: '20px 100px', maxHeight: '93vh', overflow: 'auto' }
      }
    >
      <Helmet>
        <title>{t('userManagement')}</title>
      </Helmet>
      {isLoading ? <Loading /> : <ExpertBookingTable jobRequests={jobRequests} fetchData={fetchData} />}
    </div>
  )
}
