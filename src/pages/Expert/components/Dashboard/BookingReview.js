import Slider from 'react-slick'
// @mui
import { useTheme } from '@mui/material/styles'
import { Card, Stack, Avatar, Rating, CardHeader, Typography, Container } from '@mui/material'
import moment from 'moment'

export default function BookingReview({ data }) {
  const theme = useTheme()

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl')
  }

  return (
    <Card>
      <CardHeader
        title='Customer Reviews'
        sx={{
          '& .MuiCardHeader-action': {
            alignSelf: 'center'
          }
        }}
      />

      <Slider {...settings}>
        {data.map((item) => (
          <ReviewItem key={item._id} item={item} />
        ))}
      </Slider>
    </Card>
  )
}

// ----------------------------------------------------------------------
function ReviewItem({ item }) {
  return (
    <Stack spacing={2} sx={{ position: 'relative', p: 2 }}>
      <Stack
        direction='row'
        alignItems='center'
        spacing={2}
        sx={{
          pl: 2
        }}
      >
        <Avatar alt={item.user.photo_url} src={item.user.photo_url} />
        <div>
          <Typography variant='subtitle2'>
            {item.user.first_name} {item.user.last_name}
          </Typography>
          <Typography variant='caption' sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            Posted {moment(item.updatedAt).fromNow()}
          </Typography>
        </div>
      </Stack>
      <Container
        maxWidth='sm'
        sx={{
          '& .MuiRating-root': {
            my: 2
          }
        }}
      >
        <Rating value={item.rating} size='small' readOnly precision={0.5} />
        <Typography variant='body2'>{item.comment}</Typography>
      </Container>
    </Stack>
  )
}