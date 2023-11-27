import * as React from 'react'
import Modal from '@mui/material/Modal'
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'

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

export default function BookingDetailInfoModal({ open, handleCloseModal, post, setRefresh, refresh }) {
  const { snack, setSnack } = useSnackbar()
  const { t } = useTranslation()
  const handleCancel = async () => {
    await AxiosInterceptors.post(urlConfig.job_requests.updateJobRequests + `/${post._id}/cancel`)
      .then((res) => {
        setSnack({
          ...snack,
          open: true,
          message: t('cancelJobRequestSuccess'),
          type: 'success'
        })
        handleCloseModal()
        setRefresh(!refresh)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('cancelJobRequestFail'),
          type: 'error'
        })
      })
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
        <Box sx={style}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%'
            }}
          >
            <CardContent>
              <Typography align='start' gutterBottom variant='h3'>
                {post.title}
              </Typography>

              <Typography
                align='start'
                gutterBottom
                variant='body1'
                sx={{
                  fontSize: '1.2rem'
                }}
              >
                <Typography
                  align='start'
                  gutterBottom
                  variant='h5'
                  sx={{
                    display: 'inline-block',
                    fontStyle: 'italic'
                  }}
                >
                  Price:
                </Typography>{' '}
                {post.price} VNĐ
              </Typography>

              <Typography
                align='start'
                gutterBottom
                variant='body1'
                sx={{
                  fontSize: '1.2rem'
                }}
              >
                <Typography
                  align='start'
                  gutterBottom
                  variant='h5'
                  sx={{
                    display: 'inline-block',
                    fontStyle: 'italic'
                  }}
                >
                  Description:
                </Typography>{' '}
                {post.description}
              </Typography>

              <Typography
                align='start'
                gutterBottom
                variant='body1'
                sx={{
                  fontSize: '1.2rem',
                  color: 'green'
                }}
              >
                <Typography
                  align='start'
                  gutterBottom
                  variant='h5'
                  sx={{
                    display: 'inline-block',
                    fontStyle: 'italic',
                    color: 'black'
                  }}
                >
                  Status:
                </Typography>{' '}
                {post.status}
              </Typography>
            </CardContent>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <Stack alignItems='center' direction='row' justifyContent='space-between' spacing={2} sx={{ p: 3 }}>
              <Stack alignItems='center' direction='row' spacing={1}>
                <Typography color='text.secondary' display='inline' variant='body2'>
                  Accept at {post.time_booking}
                </Typography>
              </Stack>
              <Stack alignItems='center' direction='row' spacing={1}>
                <Button variant='contained' color='error' onClick={handleCancel}>
                  Cancel booking
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Box>
      </Modal>
    </div>
  )
}
