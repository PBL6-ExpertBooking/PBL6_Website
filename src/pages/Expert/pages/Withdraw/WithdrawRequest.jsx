import React, { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Stack,
  Box
} from '@mui/material'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import BankCard from './BankCard'
import Loading from '../../../../common/components/Loading/Loading'
import useResponsive from '../../../../hooks/useResponsive'

const WithdrawRequest = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const { t } = useTranslation()
  const isMobile = useResponsive('down', 'sm')
  const [isLoading, setIsLoading] = useState(true)
  const { snack, setSnack } = useSnackbar()
  const [data, setData] = useState({
    amount: 0,
    bank_account: {
      number: '',
      owner_name: '',
      bank_name: ''
    }
  })
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.expert.getWithdrawMethod).then((res) => {
      setData({
        amount: 0,
        bank_account: {
          number: res.data.bank_account.number,
          owner_name: res.data.bank_account.owner_name,
          bank_name: res.data.bank_account.bank_name
        }
      })
      setIsLoading(false)
    })
  }
  const handleWithdraw = async () => {
    await AxiosInterceptors.post(urlConfig.withdraw_request.createWithdrawRequest, data)
      .then((res) => {
        if (res.status === 200) {
          setSnack({ ...snack, open: true, message: t('makeRequestSuccess'), type: 'success' })
        }
      })
      .catch((err) => {
        setSnack({ ...snack, open: true, message: t('makeRequestFail'), type: 'error' })
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <Grid container spacing={5}>
      <Snackbar />
      <Grid item xs={12} md={6}>
        <Typography variant='h4' sx={{ my: 2 }}>
          {t('withdraw')}
        </Typography>
        <div>
          <FormControl sx={{ marginTop: 2 }} fullWidth>
            <InputLabel htmlFor='outlined-adornment-amount'>{t('moneyAmount')}</InputLabel>
            <OutlinedInput
              id='outlined-adornment-amount'
              startAdornment={<InputAdornment position='start'>đ</InputAdornment>}
              label={t('moneyAmount')}
              type='number'
              onChange={(e) => setData({ ...data, amount: e.target.value })}
            />
            <FormHelperText id='outlined-weight-helper-text'>
						{t('youCanWithdraw')} {user.balance.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
            </FormHelperText>
          </FormControl>
        </div>
        <Button variant='text' sx={{ marginTop: 2 }} onClick={() => handleWithdraw()}>
					{t('makeRequest')}
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction='column' spacing={2} sx={{ my: 2 }}>
          <Typography variant='h4'>{t('paymentInfo')}</Typography>
          {isMobile ? (
            <Box
              sx={{
                border: '1px solid #E0E0E0',
                borderRadius: '10px',
                padding: '20px'
              }}
            >
              <Typography variant='subtitle1'>{t('bankName')}: {data.bank_account.bank_name}</Typography>
              <Typography variant='subtitle1'>{t('bankAccountName')}: {data.bank_account.owner_name}</Typography>
              <Typography variant='subtitle1'>{t('bankAccount')}: {data.bank_account.number}</Typography>
            </Box>
          ) : (
            <BankCard data={data.bank_account} />
          )}
        </Stack>
      </Grid>
    </Grid>
  )
}

export default WithdrawRequest
