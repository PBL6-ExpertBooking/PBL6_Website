import {
  Box,
  Container,
  Pagination,
  Stack,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Unstable_Grid2 as Grid
} from '@mui/material'
import { PostCard } from '../../components/PostCard/PostCard'
import Select from '@mui/material/Select'
import React from 'react'
import { useState, useEffect } from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'

const ShowListPost = () => {
  const [majors, setMajors] = useState('')
  const [listMajors, setListMajors] = useState([])
  const [jobRequests, setJobRequests] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [refresh, setRefresh] = useState(false)

  const fetchDataMajors = async () => {
    const res = await AxiosInterceptors.get(urlConfig.expert.majors)
    if (res.status === 200) {
      setListMajors(res.data.majors)
      setMajors(res.data.majors[0]._id)
    }
  }

  const fetchDataJobRequestByMajorId = async () => {
    if (!majors) {
      return
    }
    await AxiosInterceptors.get(urlConfig.expert.getJobRequests + `?major_id=${majors}`)
      .then((res) => {
        setJobRequests(res.data.pagination.job_requests)
        setTotalPages(res.data.pagination.totalPages)
      })
      .catch((err) => {
        setJobRequests([])
      })
  }

  useEffect(() => {
    fetchDataMajors()
  }, [])

  useEffect(() => {
    fetchDataJobRequestByMajorId()
  }, [majors, refresh])

  return (
    <div style={{ width: '100%', maxHeight: '93vh', overflow: 'auto' }}>
      <Helmet>
        <title>Expert - List Job Requests</title>
      </Helmet>
      <Box
        component='main'
        sx={{
          justifyContent: 'space-between',
          flexGrow: 1,
          py: 4
        }}
      >
        <Container
          maxWidth='xl'
          sx={{
            minHeight: '80vh'
          }}
        >
          <Stack spacing={3}>
            <Stack direction='row' justifyContent='space-between' alignItems='start' spacing={4} px='12px'>
              <Stack spacing={1}>
                <Typography variant='h3'>List Job Requests</Typography>
              </Stack>

              <Box sx={{ minWidth: 120 }}>
                <FormControl sx={{ minWidth: 240 }}>
                  <InputLabel id='demo-simple-select-label'>Choose Major</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={majors}
                    label='Major'
                    onChange={(event) => {
                      setMajors(event.target.value)
                    }}
                  >
                    {listMajors.length > 0 &&
                      listMajors.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item._id}>
                            {item.name}
                          </MenuItem>
                        )
                      })}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            <Grid container spacing={3}>
              {jobRequests.length > 0 &&
                jobRequests.map((jobRequest) => (
                  <Grid xs={12} md={6} lg={4} key={jobRequest._id}>
                    <PostCard jobRequest={jobRequest} refresh={refresh} setRefresh={setRefresh} />
                  </Grid>
                ))}
            </Grid>
          </Stack>
        </Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Pagination count={totalPages} size='large' />
        </Box>
      </Box>
    </div>
  )
}

export default ShowListPost
