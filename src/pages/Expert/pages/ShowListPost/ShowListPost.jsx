import {
  Box,
  Container,
  Pagination,
  Stack,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import {PostCard} from '../../components/PostCard/PostCard'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react'

const posts = [
  {
    id: '1',
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
    description: "Tôi muốn tìm một người sửa win 7 tại nhà nhanh gọn lẹ, đang cần gấp",
    createdAt: ""
  },
  {
    id: '2',
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
    description: "Tôi muốn tìm một người sửa win 7 tại nhà nhanh gọn lẹ, đang cần gấp",
    createdAt: ""
  },{
    id: '3',
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
    description: "Tôi muốn tìm một người sửa win 7 tại nhà nhanh gọn lẹ, đang cần gấp",
    createdAt: ""
  },{
    id: '4',
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
    description: "Tôi muốn tìm một người sửa win 7 tại nhà nhanh gọn lẹ, đang cần gấp",
    createdAt: ""
  },{
    id: '5',
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
    description: "Tôi muốn tìm một người sửa win 7 tại nhà nhanh gọn lẹ, đang cần gấp",
    createdAt: ""
  },{
    id: '6',
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
    description: "Tôi muốn tìm một người sửa win 7 tại nhà nhanh gọn lẹ, đang cần gấp",
    createdAt: ""
  },{
    id: '7',
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
    description: "Tôi muốn tìm một người sửa win 7 tại nhà nhanh gọn lẹ, đang cần gấp",
    createdAt: ""
  },{
    id: '8',
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
    description: "Tôi muốn tìm một người sửa win 7 tại nhà nhanh gọn lẹ, đang cần gấp",
    createdAt: ""
  },{
    id: '9',
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
    description: "Tôi muốn tìm một người sửa win 7 tại nhà nhanh gọn lẹ, đang cần gấp",
    createdAt: ""
  },
];


const ShowListPost = () => {
  const [age, setAge] = React.useState('');

  return(
  <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
            px="12px"
          >
            <Stack spacing={1}>
              <Typography variant="h3">
                List Post
              </Typography>
            </Stack>

            <Box sx={{ minWidth: 120 }}>
            <FormControl
            sx={{ minWidth: 240 }}
            >
              <InputLabel id="demo-simple-select-label">Choose Major</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
              >
                <MenuItem value={1}>IT</MenuItem>
                <MenuItem value={2}>Fuho</MenuItem>
                <MenuItem value={3}>Gamming</MenuItem>
              </Select>
            </FormControl>
            </Box>
          </Stack>
          <Grid
            container
            spacing={3}
          >
            {posts.map((post) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={post.id}
              >
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Pagination
              count={4}
              size="large"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  </>
)};


export default ShowListPost;
