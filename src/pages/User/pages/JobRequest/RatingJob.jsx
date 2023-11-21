import React from 'react'
import { Rating, TextField, Stack, Typography } from '@mui/material'
import RootModal from '../../../../components/Modal/RootModal'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
const RatingJob = ({ id, open, setOpen }) => {
  const { snack, setSnack } = useSnackbar()
  const [data, setData] = React.useState({
    job_request_id: id,
    rating: 0,
    comment: ''
  })
  const handleReview = async () => {
    await AxiosInterceptors.post(urlConfig.review.createReview, data)
      .then((res) => {
        if (res && res.status === 200) {  
          setSnack({
            ...snack,
            open: true,
            message: 'Review successfully!',
            type: 'success'
          })
          setOpen(false)
        }
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      <Snackbar />
      <RootModal
        variant='Create'
        title='Review this job'
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={handleReview}
        closeOnly={false}
      >
        <Stack my={3} direction='column' spacing={2}>
          <Stack direction='row' spacing={2}>
            <Typography variant='h6' gutterBottom component='div'>
              Rating:
            </Typography>
            <Rating
              name='simple-controlled'
              value={data.rating}
              onChange={(event, newValue) => {
                setData({ ...data, rating: newValue })
              }}
            />
          </Stack>
          <TextField
            fullWidth
            label='Your review'
            multiline
            rows={4}
            onChange={(e) => setData({ ...data, review: e.target.value })}
          />
        </Stack>
      </RootModal>
    </>
  )
}

export default RatingJob
