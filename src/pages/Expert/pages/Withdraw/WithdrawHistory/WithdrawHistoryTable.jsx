import moment from 'moment'
import {
  Divider,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  CardHeader
} from '@mui/material'

import Label from '../../../../../components/Label'
import { useTranslation } from 'react-i18next'

const getStatusLabel = (request) => {
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

  const { text, color } = map[request]

  return <Label color={color}>{text}</Label>
}

const WithdrawHistoryTable = ({ request }) => {
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader title='Yêu cầu gần đây' />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('time')}</TableCell>
              <TableCell>{t('type')}</TableCell>
              <TableCell align='right'>{t('moneyAmount')}</TableCell>
              <TableCell align='right'>{t('status')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {request.map((cryptoOrder) => {
              return (
                <TableRow hover key={cryptoOrder.id}>
                  <TableCell>
                    <Typography variant='body1' fontWeight='bold' color='text.secondary' noWrap>
                      {moment(cryptoOrder.transaction.updatedAt).format('DD/MM/YYYY')}
                    </Typography>
                    <Typography variant='subtitle1' color='text.secondary' noWrap>
                      {moment(cryptoOrder.transaction.updatedAt).format('h:mm:ss A')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body1' fontWeight='bold' color='text.primary' gutterBottom noWrap>
                      {cryptoOrder.transaction.transaction_type}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography variant='body2' color='text.secondary' noWrap>
                      {cryptoOrder.transaction.amount.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>{getStatusLabel(cryptoOrder.transaction.transaction_status)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default WithdrawHistoryTable
