import { Avatar, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import moment from 'moment'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'

export const PostCard = ({ jobRequest, refresh, setRefresh }) => {
  const { snack, setSnack } = useSnackbar()
  const { t } = useTranslation()

  const handleAccept = async () => {
    await AxiosInterceptors.post(urlConfig.job_requests.updateJobRequests + `/${jobRequest._id}/accept`)
      .then((res) => {
        setSnack({
          ...snack,
          open: true,
          message: t('acceptJobRequestSuccess'),
          type: 'success'
        })
        setRefresh(!refresh)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('acceptJobRequestFail'),
          type: 'error'
        })
      })
  }
  const handleDelete = async () => {
    await AxiosInterceptors.delete(urlConfig.expert.deleteJobRequests + `/${jobRequest._id}`)
      .then((res) => {
        setSnack({
          ...snack,
          open: true,
          message: t('deleteJobRequestSuccess'),
          type: 'success'
        })
        setRefresh(!refresh)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: t('deleteJobRequestFail'),
          type: 'error'
        })
      })
  }
  return (
    <>
      <Snackbar />
      <Card
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column'
        }}
      >
        <CardContent>
          <Stack direction='column' spacing={2}>
            <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between'>
              <Typography align='start' gutterBottom variant='body1'>
                <Typography
                  align='start'
                  gutterBottom
                  variant='h5'
                  sx={{
                    display: 'inline-block',
                    fontStyle: 'italic'
                  }}
                >
                  Post By:
                </Typography>{' '}
              </Typography>
              <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-around'>
                <Avatar alt={jobRequest && jobRequest.user.first_name} src={jobRequest && jobRequest.user.photo_url} />
                <Typography align='start' gutterBottom variant='body1'>
                  {jobRequest && jobRequest.user.first_name} {jobRequest && jobRequest.user.last_name}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction='column' spacing={1}>
              <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between'>
                <Typography
                  align='start'
                  gutterBottom
                  variant='h5'
                  sx={{
                    display: 'inline-block',
                    fontStyle: 'italic'
                  }}
                >
                  Title:
                </Typography>
                <Typography align='start' gutterBottom variant='h4'>
                  {jobRequest && jobRequest.title ? jobRequest.title : ''}
                </Typography>
              </Stack>
              <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between'>
                <Typography
                  align='start'
                  gutterBottom
                  variant='h5'
                  sx={{
                    display: 'inline-block',
                    fontStyle: 'italic'
                  }}
                >
                  Address:
                </Typography>
                {jobRequest && jobRequest.address.city.name ? jobRequest.address.city.name : ''}
              </Stack>
              <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between'>
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
                </Typography>
                {jobRequest && jobRequest.price
                  ? jobRequest.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
                  : ''}
              </Stack>
              <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between'>
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
                </Typography>
                {jobRequest && jobRequest.descriptions ? jobRequest.descriptions : ''}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
        <Stack alignItems='center' direction='row' justifyContent='space-between' spacing={2} sx={{ p: 3 }}>
          <Stack alignItems='center' direction='row' spacing={1}>
            <Typography color='text.secondary' display='inline' variant='body2'>
              {jobRequest && jobRequest.createdAt
                ? `Post at: ${moment(Date.parse(jobRequest.createdAt)).format('DD/MM/YYYY, h:mm:ss A')}`
                : ''}
            </Typography>
          </Stack>
          <Stack alignItems='center' direction='row' spacing={1}>
            <Button variant='text' color='success' onClick={handleAccept}>
              Accept
            </Button>
            <Button variant='text' color='error' onClick={handleDelete}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Card>
    </>
  )
}
