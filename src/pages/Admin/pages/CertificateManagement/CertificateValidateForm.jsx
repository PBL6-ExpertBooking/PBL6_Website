import React from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Grid, Typography } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'

const CertificateValidateForm = ({ open, setOpen, certificate, fetchData }) => {
  const { snack, setSnack } = useSnackbar()
  const handleVerify = async () => {
    await AxiosInterceptors.put(urlConfig.certificate.verifyCertificate + `/${certificate._id}/verify`)
      .then((res) => {
        if (res && res.status === 200) {
          setSnack({
            ...snack,
            open: true,
            message: 'Xác thực chứng chỉ thành công',
            type: 'success'
          })
          fetchData()
          setOpen(false)
        }
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: 'Xác thực chứng chỉ thất bại',
          type: 'error'
        })
      )
  }
  return (
    <>
      <Snackbar />
      <RootModal
        variant='Create'
        title='Xác thực chứng chỉ'
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={handleVerify}
        closeOnly={false}
      >
        <Grid
          container
          spacing={2}
          sx={{
            mt: 2
          }}
        >
          <Grid item xs={6} sm={6}>
            <Typography variant='h5' color='text.primary' gutterBottom noWrap>
              Tên chứng chỉ:
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='body2' color='text.secondary' noWrap>
              {certificate.name}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='h5' color='text.primary' gutterBottom noWrap>
              Mô tả:
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='body2' color='text.secondary' noWrap>
              {certificate.descriptions}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='h5' color='text.primary' gutterBottom noWrap>
              Chuyên ngành:
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='body2' color='text.secondary' noWrap>
              {certificate.major.name}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='h5' color='text.primary' gutterBottom noWrap>
              Trạng thái:
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='body2' color={certificate.isVerified ? 'success' : 'error'} noWrap>
              {certificate.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' color='text.primary' gutterBottom noWrap>
              Hình ảnh:
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img src={certificate.photo_url} alt='certificate' style={{ width: '80%' }} />
          </Grid>
        </Grid>
      </RootModal>
    </>
  )
}

export default CertificateValidateForm
