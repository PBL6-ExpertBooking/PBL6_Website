import { Avatar, Button, Card, CardContent, Divider, Stack, Typography, Grid } from '@mui/material'
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
          flexDirection: 'column',
          '&:hover': {
            boxShadow: '0 0 11px rgba(33,33,33,.2)',
            cursor: 'pointer'
          }
        }}
      >
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Stack direction='column' spacing={2}>
                <Stack direction='column' spacing={1}>
                  <Typography align='start' gutterBottom variant='h5'>
                    {jobRequest && jobRequest.title ? jobRequest.title : ''}
                  </Typography>
                  <Typography align='start' gutterBottom variant='body1' noWrap>
                    {jobRequest && jobRequest.descriptions ? jobRequest.descriptions : ''}
                  </Typography>
                  <Typography align='start' gutterBottom variant='body2'>
                    Giá:{' '}
                    {jobRequest && jobRequest.price
                      ? jobRequest.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })
                      : ''}
                  </Typography>
                  <Typography align='start' gutterBottom variant='subtitle2'>
                    {jobRequest && jobRequest.address.city.name
                      ? jobRequest.address.district.name +
                        ', ' +
                        jobRequest.address.ward.name +
                        ', ' +
                        jobRequest.address.city.name
                      : ''}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Divider orientation='vertical' />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Stack direction='column' spacing={1} alignItems='center'>
                <Avatar alt={jobRequest && jobRequest.user.first_name} src={jobRequest && jobRequest.user.photo_url} />
                <Typography align='start' gutterBottom variant='h6'>
                  {jobRequest && jobRequest.user.first_name} {jobRequest && jobRequest.user.last_name}
                </Typography>
                <Typography align='start' gutterBottom variant='subtitle2' noWrap>
                  {jobRequest && jobRequest.user.email}
                </Typography>
                <Typography align='start' gutterBottom variant='subtitle2' noWrap>
                  {jobRequest && jobRequest.user.phone}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Stack alignItems='center' direction='row' justifyContent='space-between' spacing={2} sx={{ p: 2 }}>
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
