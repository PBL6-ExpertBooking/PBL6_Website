import Slider from 'react-slick'
// @mui
import { useTheme } from '@mui/material/styles'
import { Card, Stack, Avatar, Rating, CardHeader, Typography } from '@mui/material'
import moment from 'moment'

// _mock_
// components

// ----------------------------------------------------------------------

const _bookingReview = [
  {
    id: '1',
    name: 'Ekaterina Tankova',
    avatar: 'https://i.pravatar.cc/300?img=1',
    rating: 4,
    description: `
        I love this product, it really help me to boost my conversion rate.
        Should have purchased it a lot earlier. I love this product, it really
        help me to boost my conversion rate. Should have purchased it a lot
        earlier.
        `,
    postedAt: '2021-08-28T16:28:32.616Z'
  },
  {
    id: '2',
    name: 'Ekaterina Tankova',
    avatar: 'https://i.pravatar.cc/300?img=2',
    rating: 4,
    description: `
        I've been using this product for a while now and decided to purchase
        `,
    postedAt: '2021-08-28T16:28:32.616Z'
  },
  {
    id: '3',
    name: 'Ekaterina Tankova',
    avatar: 'https://i.pravatar.cc/300?img=3',
    rating: 4,
    description: `
        Very good product, easy to use and nice design. I love this product!
        `,
    postedAt: '2021-08-28T16:28:32.616Z'
  }
]

// ----------------------------------------------------------------------

export default function EcommerceNewProducts() {
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
        subheader={`${_bookingReview.length} Reviews`}
        sx={{
          '& .MuiCardHeader-action': {
            alignSelf: 'center'
          }
        }}
      />

      <Slider {...settings}>
        {_bookingReview.map((item) => (
          <ReviewItem key={item.id} item={item} />
        ))}
      </Slider>
    </Card>
  )
}

// ----------------------------------------------------------------------
function ReviewItem({ item }) {
  const { avatar, name, description, rating, postedAt } = item

  return (
    <Stack spacing={2} sx={{ position: 'relative', p: 3 }}>
      <Stack direction='row' alignItems='center' spacing={2}>
        <Avatar alt={name} src={avatar} />
        <div>
          <Typography variant='subtitle2'>{name}</Typography>
          <Typography variant='caption' sx={{ color: 'text.secondary', mt: 0.5, display: 'block' }}>
            Posted {moment(postedAt).fromNow()}
          </Typography>
        </div>
      </Stack>

      <Rating value={rating} size='small' readOnly precision={0.5} />
      <Typography variant='body2'>{description}</Typography>
    </Stack>
  )
}
