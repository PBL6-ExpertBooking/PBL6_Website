import { useEffect, useState } from 'react'
import AxiosInterceptors from '../../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../../config/UrlConfig'
import useResponsive from '../../../../../hooks/useResponsive'
import Loading from '../../../../../common/components/Loading/Loading'
import WithdrawHistoryTable from './WithdrawHistoryTable'
// @mui
import { Box, Pagination } from '@mui/material'

export default function WithdrawHistory() {
  const isMobile = useResponsive('down', 'sm')
  const [pageCount, setPageCount] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [request, setRequest] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.expert.getWithdrawRequest + `?page=${pageCount}`)
      .then((res) => {
        setRequest(res.data.withdrawal_requests.withdrawal_requests)
        setTotalPages(res.data.withdrawal_requests.totalPages)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      {isLoading ? <Loading /> : <WithdrawHistoryTable request={request} fetchData={fetchData} />}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Pagination
          count={totalPages}
          color='primary'
          page={pageCount}
          onChange={(e, value) => setPageCount(value)}
          sx={{
            p: 2,
            mb: isMobile ? 3 : 0
          }}
        />
      </Box>
    </div>
  )
}
