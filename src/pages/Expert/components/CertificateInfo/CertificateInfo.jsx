import { Box, Stack, Avatar, Button, Typography, Card, Grid } from '@mui/material'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { useTranslation } from 'react-i18next'
import useResponsive from '../../../../hooks/useResponsive'

const CertificateInfo = (props) => {
  const isMobile = useResponsive('down', 'sm')
  const certificate = props.certificate
  const { snack, setSnack } = useSnackbar()
  const { t } = useTranslation()

  const handleDeleteCertificate = async () => {
    await AxiosInterceptors.delete(urlConfig.certificate.deleteCertificate + `/${certificate._id}`)
      .then((res) => {
        setSnack({
          ...snack,
          open: true,
          message: t('deleteCertificateSuccess'),
          type: 'success'
        })
        props.setRefresh(!props.refresh)
      })
      .catch((err) => {
        console.log(err)
        setSnack({
          ...snack,
          open: true,
          message: t('deleteCertificateFail'),
          type: 'error'
        })
      })
  }

  return (
    certificate._id && (
      <div style={{ width: '100%' }}>
        <Snackbar />
        <Card
          sx={
            isMobile
              ? { display: 'flex', flexDirection: 'row', padding: '20px', margin: '20px 20px' }
              : {
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '20px',
                  margin: '20px 100px'
                }
          }
        >
          <Stack
            spacing={2}
            direction='row'
            sx={{
              width: '100%'
            }}
          >
            <Box sx={{ display: 'block', width: '100%' }}>
              <Typography variant='h4' component='h4' sx={{ margin: '1.5rem' }}>
                {t('certificateInformation')}
              </Typography>
              <Grid container spacing={2} sx={{ margin: '1.5rem' }}>
                <Grid item xs={12} md={5}>
                  <Typography variant='h5' component='h5'>
                    {t('major')}
                  </Typography>
                  <Typography variant='body1' component='div'>
                    {certificate.major.name}
                  </Typography>
                  <Typography variant='h5' component='h5' sx={{ mt: 2 }}>
                    {t('status')}
                  </Typography>
                  <Typography
                    variant='body1'
                    component='div'
                    sx={{
                      color: certificate.isVerified ? 'green' : 'red'
                    }}
                  >
                    {certificate.isVerified ? t('confirmed') : t('unconfirmed')}
                  </Typography>
                  <Typography variant='h5' component='h5' sx={{ mt: 2 }}>
                    {t('certificateName')}
                  </Typography>
                  <Typography variant='body1' component='div'>
                    {certificate.name}
                  </Typography>
                  <Typography variant='h5' component='h5' sx={{ mt: 2 }}>
                    {t('description')}
                  </Typography>
                  <Typography variant='body1' component='div'>
                    {certificate.descriptions}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Box sx={{ paddingRight: 10 }}>
                    <Avatar
                      alt='Remy Sharp'
                      src={certificate.photo_url}
                      variant='square'
                      sx={{ width: '100%', height: 400 }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Stack
                spacing={2}
                direction='row'
                alignItems='center'
                justifyContent='flex-end'
                sx={{
                  marginRight: '2rem'
                }}
              >
                <Button variant='text' component='label' color='error' onClick={handleDeleteCertificate}>
                  {t('delete')}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Card>
      </div>
    )
  )
}

export default CertificateInfo
