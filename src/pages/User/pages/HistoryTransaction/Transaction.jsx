import { Card } from '@mui/material'
import TransactionTable from './TransactionTable'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { useEffect } from 'react'
import { useState } from 'react'

function Transaction() {
  const [transaction, setTransaction] = useState([])
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.user.getTransaction)
      .then((res) => setTransaction(res.data.transactions.transactions))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    fetchData()
  }, [])
  return <Card>{transaction.length > 0 && <TransactionTable transaction={transaction} />}</Card>
}

export default Transaction
