import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import moment from 'moment'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
export const PostCard = ({ jobRequest, refresh, setRefresh }) => {
  const { snack, setSnack } = useSnackbar()
  const handleAccept = async () => {
    await AxiosInterceptors.post(urlConfig.job_requests.updateJobRequests + `/${jobRequest._id}/accept`)
      .then((res) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Accept job request successfully',
          type: 'success'
        })
        setRefresh(!refresh)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Accept job request failed',
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
          message: 'Delete job request successfully',
          type: 'success'
        })
        setRefresh(!refresh)
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Delete job request failed',
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
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <CardContent>
          <Typography align='start' gutterBottom variant='h4'>
            {jobRequest && jobRequest.title ? jobRequest.title : ''}
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
              Address:
            </Typography>{' '}
            {jobRequest && jobRequest.address.city.name ? jobRequest.address.city.name : ''}
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
            {jobRequest && jobRequest.price ? jobRequest.price : ''} VNĐ
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
            {jobRequest && jobRequest.descriptions ? jobRequest.descriptions : ''}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Stack alignItems='center' direction='row' justifyContent='space-between' spacing={2} sx={{ p: 3 }}>
          <Stack alignItems='center' direction='row' spacing={1}>
            <Typography color='text.secondary' display='inline' variant='body2'>
              {jobRequest && jobRequest.createdAt
                ? `Post at ${moment(Date.parse(jobRequest.createdAt)).format('DD/MM/YYYY, h:mm:ss a')}`
                : ''}
            </Typography>
          </Stack>
          <Stack alignItems='center' direction='row' spacing={1}>
            <Button variant='contained' color='success' onClick={handleAccept}>
              Accept
            </Button>
            <Button variant='contained' color='error' onClick={handleDelete}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Card>
    </>
  )
}
