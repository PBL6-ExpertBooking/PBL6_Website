import React from 'react'
import Rootmodal from '../../../../components/Modal/RootModal'
import { Container } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnack from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'

const PaymentConfirm = ({ id, open, setOpen, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnack()
  const handlePayment = async (id) => {
    let id_transaction = ''
    await AxiosInterceptors.post(urlConfig.transaction.createPayment, {
      job_request_id: id
    })
      .then((res) => {
        if (res && res.status === 200) {
          id_transaction = res.data.transaction._id
        }
        AxiosInterceptors.post(urlConfig.transaction.executePayment + `/${id_transaction}/execute`)
          .then((res) => {
            if (res && res.status === 200) {
              setSnack({
                ...snack,
                open: true,
                message: 'Payment successfully!',
                type: 'success'
              })
              setOpen(false)
              fetchData()
            }
          })
          .catch((err) => {
            setSnack({
              ...snack,
              open: true,
              message: 'Payment failed!',
              type: 'error'
            })
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <Snackbar />  
      <Rootmodal
        variant='Info'
        title={t('paymentConfirm')}
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => handlePayment(id)}
        closeOnly={false}
      >
        <Container
          maxWidth='sm'
          sx={{
            mt: 3
          }}
        ></Container>
      </Rootmodal>
    </>
  )
}

export default PaymentConfirm
