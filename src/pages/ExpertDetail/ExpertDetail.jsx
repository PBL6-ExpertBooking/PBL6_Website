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

const ExpertDetail = () => {
  const id = useParams()
  const [expert, setExpert] = useState({})
  const getData = async () => {
    await AxiosInterceptors.get(urlConfig.user.searchExpert + `/${id.nameId}`)
      .then((res) => {
        if (res && res.status === 200) {
          console.log(res.data.expert)
          if (res.data.expert) {
            setExpert(res.data.expert)
          }
        }
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Helmet>
        <title>Expert Detail</title>
      </Helmet>
      {expert.user && (
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
              <Card sx={{
                maxHeight: '400px',
                overflow: 'auto',
                overflowX: 'hidden'
              }}>
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
              <Card>
                <CardHeader title='Đánh giá' />
                <CardContent>
                  <Stack direction='column' spacing={1}>
                    <RatingContent photoURL='https://i.seadn.io/s/raw/files/8a2ba20257690ce5e47cde115bce13e6.png?auto=format&dpr=1&w=1000' />
                    <RatingContent photoURL='https://i.seadn.io/s/raw/files/ff24a5434aa00e6645bda8b6d0d4a991.png?auto=format&dpr=1&w=1000' />
                    <RatingContent photoURL='https://i.seadn.io/gae/VHVse2oudUymb_bJPFoK09BAat6X6ArBX3DBiJHYN0wJYpAOP91H0HiCNT8qjiNnhn4WFykaQS5nZLx8x-AFOI5yvBoAylQVwEPzjqM?auto=format&dpr=1&w=1000' />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  )
}

export default ExpertDetail
