import React, { useContext } from 'react'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import { Helmet } from 'react-helmet-async'
import JobRequestsTable from './JobRequestsTable'
import { MajorContext } from '../../../../contexts/major.context'
import { TextField, MenuItem, Box } from '@mui/material'

const JobRequest = () => {
  const { majors, loading, getMajors } = useContext(MajorContext)
  const [jobRequests, setJobRequests] = React.useState([])
  const [refresh, setRefresh] = React.useState(false)
  const [major_id, setMajor_id] = React.useState('')
  const fetchData = async () => {
    await AxiosInterceptors.get(urlConfig.user.getJobRequests + `?major_id=${major_id}`)
      .then((res) => {
        if (res && res.status === 200) {
          console.log(res.data.pagination.job_requests)
          if (res.data.pagination.job_requests) {
            setJobRequests(res.data.pagination.job_requests)
          }
        }
      })
      .catch((err) => console.log(err))
  }
  React.useEffect(() => {
    getMajors()
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [refresh, major_id])
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
          defaultValue=''
          sx={{
            width: '30%',
            marginLeft: 'auto',
            marginTop: '15px'
          }}
          onChange={(e) => setMajor_id(e.target.value)}
        >
          {majors.majors?.map((option) => (
            <MenuItem key={option._id} value={option._id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <JobRequestsTable majorsOrder={jobRequests} fetchData={fetchData} />
    </div>
  )
}

export default JobRequest
