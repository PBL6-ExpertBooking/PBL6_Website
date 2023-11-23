import { Card, Fab, Stack, Tooltip } from '@mui/material'
import TransactionTable from './TransactionTable'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import Loading from '../../../../common/components/Loading/Loading'
import { useTranslation } from 'react-i18next'
function Transaction() {
  const { t } = useTranslation()
  const [pageCount, setPageCount] = useState(1)
  const [transaction, setTransaction] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    setIsLoading(true)
    await AxiosInterceptors.get(urlConfig.user.getTransaction + `?page=${pageCount}`)
      .then((res) => {
        setTransaction(res.data.transactions.transactions)
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchData()
  }, [pageCount])
  return (
    <>
      <Card>{!isLoading ? <TransactionTable transaction={transaction} /> : <Loading />}</Card>
      <Stack
        spacing={2}
        direction='row'
        p={2}
        sx={{
          float: 'right'
        }}
      >
        <Tooltip title={t('previous')} arrow>
          <Fab
            size='small'
            aria-label='add'
            disabled={pageCount === 1 ? true : false}
            onClick={() => setPageCount(pageCount - 1)}
          >
            <NavigateBeforeIcon />
          </Fab>
        </Tooltip>
        <Fab size='small' aria-label='add' disabled>
          {pageCount}
        </Fab>
        <Tooltip title={t('next')} arrow>
          <Fab size='small' aria-label='add' onClick={() => setPageCount(pageCount + 1)}>
            <NavigateNextIcon />
          </Fab>
        </Tooltip>
      </Stack>
    </>
  )
}

export default Transaction
