import React from 'react'
import { Box, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material'
import RootModal from '../Modal/RootModal'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'

const Recharge = ({ openRecharge, setOpenRecharge }) => {
  const { snack, setSnack } = useSnackbar()
  const [money, setMoney] = React.useState(0)
  const handleRecharge = async () => {
    await AxiosInterceptors.post(urlConfig.transaction.recharge, {
      amount: Number(money)
    })
      .then((res) => {
        // open new page to pay
        window.open(res.data.paymentUrl, '_blank')
        setOpenRecharge(false)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Recharge failed!',
          type: 'error'
        })
      })
  }
  return (
    <>
      <Snackbar />
      <RootModal
        variant='Create'
        title='Recharge'
        open={openRecharge}
        handleClose={() => setOpenRecharge(false)}
        handleOk={() => handleRecharge()}
        closeOnly={false}
      >
        <Box sx={{ my: 3 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor='outlined-adornment-amount'>Money Amount</InputLabel>
            <OutlinedInput
              id='outlined-adornment-amount'
              startAdornment={<InputAdornment position='start'>đ</InputAdornment>}
              label='Money Amount'
              type='number'
              onChange={(e) => setMoney(e.target.value)}
            />
          </FormControl>
        </Box>
      </RootModal>
    </>
  )
}

export default Recharge
