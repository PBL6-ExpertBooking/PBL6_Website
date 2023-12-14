import * as React from 'react'
import Modal from '@mui/material/Modal'
import { Box, Button, Card, CardContent, Divider, Stack, Typography, Avatar, Grid} from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'
import Label from '../../../../components/Label'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #ccc',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4
}

export default function BookingDetailInfoModal({ open, handleCloseModal, post, fetchData }) {
  const { snack, setSnack } = useSnackbar()
  const { t } = useTranslation()
  const handleCancel = async () => {
    await AxiosInterceptors.post(urlConfig.job_requests.cancelJobRequests + `/${post._id}/cancel`)
      .then((res) => {
        setSnack({
          ...snack,
          open: true,
          message: t('postSuccess'),
          type: 'success'
        })
        fetchData()
        handleCloseModal()
      })
      .catch((err) => {
        console.log(err)
        setSnack({
          ...snack,
          open: true,
          message: t('postFail'),
          type: 'error'
        })
      })
  }

  const getStatusLabel = (transaction) => {
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
  
    const { text, color } = map[transaction]
  
    return <Label color={color}>{text}</Label>
  }

  return (
    <div>
      <Snackbar />
      <Modal
        open={open}
        onClose={() => handleCloseModal()}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Card
            sx={style}
          >
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={7}>
              <Stack direction='column' spacing={2}>
                <Stack direction='column' spacing={1}>
                  <Typography align='start' gutterBottom variant='h4'>
                  {t('title')}: {post && post.title ? post.title : ''}
                  </Typography>
                  <Typography align='start' gutterBottom variant='h5' noWrap>
                  {t('description')}: {post && post.descriptions ? post.descriptions : ''}
                  </Typography>
                  <Typography align='start' gutterBottom variant='body1'>
                  {t('price')}:{' '}
                    {post && post.price
                      ? post.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
                      : ''}
                  </Typography>
                  <Typography align='start' gutterBottom variant='body1'>
                  {t('address')}:{post && post.address.city.name
                      ? post.address.district.name +
                        ', ' +
                        post.address.ward.name +
                        ', ' +
                        post.address.city.name
                      : ''}
                  </Typography>
                  <Typography align='start' gutterBottom variant='body1'>
                  {t('status')}:{getStatusLabel(post.status)}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Divider orientation='vertical' />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction='column' spacing={1} alignItems='center'>
                <Avatar alt={post && post.user.first_name} src={post && post.user.photo_url} />
                <Typography align='start' gutterBottom variant='h6'>
                  {post && post.user.first_name} {post && post.user.last_name}
                </Typography>
                <Typography align='start' gutterBottom variant='subtitle2' noWrap>
                  {post && post.user.email}
                </Typography>
                <Typography align='start' gutterBottom variant='subtitle2' noWrap>
                  {post && post.user.phone}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Stack alignItems='center' direction='row' justifyContent='space-between' spacing={2} sx={{ p: 2 }}>
          <Stack alignItems='center' direction='row' spacing={1}>
            <Typography color='text.secondary' display='inline' variant='body2'>
            {t('acceptAt')} {post.time_booking}
            </Typography>
          </Stack>
          {
                (post.status !== 'DONE' && post.status !== 'CANCELED') && (
                  <Stack alignItems='center' direction='row' spacing={1}>
                    <Button variant='contained' color='error' onClick={handleCancel}>
                      {t('cancelBooking')}
                    </Button>
                  </Stack>
                )
              }
              {
                (post.status === 'DONE' || post.status === 'CANCELED' ) && (
                  <Stack alignItems='center' direction='row' spacing={1}>
                    <Button variant='contained' color='primary' onClick={handleCloseModal}>
                      {t('close')}
                    </Button>
                  </Stack>
                )
              }
        </Stack>
      </Card>
      </Modal>
    </div>
  )
}
