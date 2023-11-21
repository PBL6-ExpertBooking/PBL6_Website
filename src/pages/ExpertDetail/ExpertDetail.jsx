import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Grid,
  Stack,
  CardHeader,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import RatingContent from '../../components/RatingContent'
import { Helmet } from 'react-helmet-async'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import { useParams } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Loading from '../../common/components/Loading/Loading'

const ExpertDetail = () => {
  const id = useParams()
  const [expert, setExpert] = useState({})
  const [review, setReview] = useState([{}])
  const getData = async () => {
    await AxiosInterceptors.get(urlConfig.user.searchExpert + `/${id.nameId}`)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.expert) {
            setExpert(res.data.expert)
          }
        }
      })
      .catch((err) => console.log(err))
  }
  const getReview = async () => {
    await AxiosInterceptors.get(urlConfig.expert.expert + `/${id.nameId}/reviews`)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination.reviews) {
            setReview(res.data.pagination.reviews)
          }
        }
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getData()
    getReview()
  }, [])
  return (
    <>
      <Helmet>
        <title>Expert Detail</title>
      </Helmet>
      {expert.user ? (
        <Box
          sx={{
            px: 20,
            py: 5,
            backgroundColor: '#F5F5F5'
          }}
        >
          <Card
            sx={{
              width: '100%',
              py: 5,
              px: 10
            }}
          >
            <Grid container spacing={5}>
              <Grid item xs={12} sm={3}>
                <Avatar alt='Remy Sharp' src={expert.user?.photo_url} sx={{ width: 250, height: 250 }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='h3' sx={{ mt: 2 }}>
                  {expert.user?.first_name} {expert.user?.last_name}
                </Typography>
                <Stack direction='row' spacing={10} sx={{ mt: 5 }}>
                  <div>
                    <Typography variant='h6' sx={{ mt: 2 }}>
                      {expert.descriptions}
                    </Typography>
                    <Typography variant='body1' sx={{ mt: 2 }}>
                      Da Nang City, Viet Nam
                    </Typography>
                  </div>
                  <div>
                    <Typography variant='h6' sx={{ mt: 2 }}>
                      Average Rating
                    </Typography>
                    <Typography variant='body1' sx={{ mt: 2 }}>
                      <Rating name='read-only' value={expert?.average_rating} readOnly />
                    </Typography>
                    <Typography variant='subtitle2'>{expert.rating_count} đánh giá</Typography>
                  </div>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography variant='h3' sx={{ my: 2 }}></Typography>
              </Grid>
            </Grid>
          </Card>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  maxHeight: '400px',
                  overflow: 'auto',
                  overflowX: 'hidden'
                }}
              >
                <CardHeader title='Bằng cấp' />
                <CardContent>
                  {expert.certificates?.map((certificate) => (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        <Typography> {certificate.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <img src={certificate.photo_url} alt='certificate' style={{ width: '100%' }} />
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Card
                sx={{
                  maxHeight: '400px',
                  overflow: 'auto',
                  overflowX: 'hidden'
                }}
              >
                <CardHeader title='Đánh giá' />
                <CardContent>
                  <Stack direction='column' spacing={1}>
                    {review.map((item) => (
                      <RatingContent
                        photoURL={item.user.photo_url}
                        name={item.user.first_name + ' ' + item.user.last_name}
                        date={item.createdAt}
                        rating={item.rating}
                        comment={item.comment}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default ExpertDetail
