import React, { useContext } from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import JobRequestsTable from './JobRequestsTable'
import { MajorContext } from '../../../../contexts/major.context'
import { TextField, MenuItem, Box, Stack, Fab, Tooltip, Container, Typography } from '@mui/material'
import Loading from '../../../../common/components/Loading/Loading'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import svg from '../../../../assets/images/empty.png'

const JobRequest = () => {
  const { majors, loading, getMajors } = useContext(MajorContext)
  const [jobRequests, setJobRequests] = React.useState([])
  const [refresh, setRefresh] = React.useState(false)
  const [major_id, setMajor_id] = React.useState('')
  const [pageCount, setPageCount] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.user.getJobRequests + `?page=${pageCount}&major_id=${major_id}`)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination.job_requests) {
            setJobRequests(res.data.pagination.job_requests)
            setIsLoading(false)
          }
        }
      })
      .catch((err) => console.log(err))
  }
  React.useEffect(() => {
    getMajors()
  }, [])
  React.useEffect(() => {
    setPageCount(1)
    setIsLoading(true)
    fetchData()
  }, [refresh, major_id])

  React.useEffect(() => {
    setIsLoading(true)
    fetchData()
  }, [pageCount])
  return (
    <div style={{ width: '100%', padding: '20px 100px' }}>
      <Helmet>
        <title>Job Requests</title>
      </Helmet>
      <Box direction='row' spacing={2} sx={{ marginBottom: '20px', display: 'flex' }}>
        <h1>Job Requests</h1>
        <TextField
          id='outlined-select-currency'
          select
          label='Major'
          defaultValue='0'
          sx={{
            width: '30%',
            marginLeft: 'auto',
            marginTop: '15px'
          }}
          onChange={(e) => setMajor_id(e.target.value)}
        >
          <MenuItem key='all' value='0'>
            All
          </MenuItem>
          {majors.majors?.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      {isLoading ? (
        <Loading />
      ) : jobRequests.length > 0 ? (
        <JobRequestsTable
          majorsOrder={jobRequests}
          fetchData={fetchData}
          pageCount={pageCount}
          setPageCount={setPageCount}
        />
      ) : (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <Container maxWidth='md'>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <img alt='404' height={200} src={svg} />
              <Typography variant='h3' color='text.secondary' fontWeight='500' sx={{ mt: 2 }}>
                No results found!
              </Typography>
            </Box>
          </Container>
        </div>
      )}
      <Stack
        spacing={2}
        direction='row'
        p={2}
        sx={{
          float: 'right'
        }}
      >
        <Tooltip title='Before' arrow>
          <Fab
            size='small'
            aria-label='add'
            disabled={pageCount === 1 ? true : false}
            onClick={() => setPageCount(pageCount - 1)}
          >
            <NavigateBeforeIcon />
          </Fab>
        </Tooltip>
        <Fab size='small' aria-label='add' disabled>
          {pageCount}
        </Fab>
        <Tooltip title='Next' arrow>
          <Fab size='small' aria-label='add' onClick={() => setPageCount(pageCount + 1)}>
            <NavigateNextIcon />
          </Fab>
        </Tooltip>
      </Stack>
    </div>
  )
}

export default JobRequest
