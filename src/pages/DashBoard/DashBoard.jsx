import React, { useState, useContext, useEffect } from 'react'
import { Card, Typography, TextField, InputAdornment, Stack, MenuItem, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import province from '../../constants/location'
import { MajorContext } from '../../contexts/major.context'
import TopExpert from '../../components/TopExpert'
import { Helmet } from 'react-helmet-async'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import ListSearch from '../../components/ListSearch'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'

const DashBoard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [major_id, setMajor_id] = useState('')
  const { majors, loading, getMajors } = useContext(MajorContext)
  const [listExpert, setListExpert] = useState([])
  const { snack, setSnack } = useSnackbar()
  useEffect(() => {
    // Fetch majors when this component mounts
    getMajors()
    // setDefaultValue(majors.majors[0]._id)
  }, [])
  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }
  const handleSearch = async () => {
    await AxiosInterceptors.get(urlConfig.user.searchExpert + `?major_id=${major_id}&search=${searchTerm}`)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.pagination.experts) {
            setListExpert(res.data.pagination.experts)
            setSnack({
              ...snack,
              open: true,
              message: 'Search successfully!',
              type: 'success'
            })
          }
        }
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: 'Search failed!',
          type: 'error'
        })
      })
  }
  return (
    <>
      <Snackbar />
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Card
        sx={{
          backgroundImage: 'conic-gradient(white, gray, #D2E9E9, white)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          py: 10,
          mt: 5,
          mx: 10
        }}
      >
        <Typography variant='h1' sx={{ color: 'black' }}>
          Discorver Top Experts
        </Typography>
        <Stack direction='row' spacing={3} sx={{ mt: 5, color: 'black' }}>
          <TextField
            id='search'
            type='search'
            label='Find an expert'
            value={searchTerm}
            onChange={handleChange}
            sx={{ width: 600 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          {majors.majors && (
            <TextField
              id='outlined-select-currency'
              select
              label='Major'
              defaultValue={majors.majors[0]._id}
              onChange={(e) => setMajor_id(e.target.value)}
            >
              {majors.majors?.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          <TextField id='outlined-select-currency' select label='Location' defaultValue='15'>
            {province.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant='contained'
            onClick={handleSearch}
            sx={{
              color: 'white',
              backgroundColor: 'black'
            }}
          >
            Search
          </Button>
        </Stack>
      </Card>
      {listExpert.length > 0 ? <ListSearch listExpert={listExpert} /> : <TopExpert />}
    </>
  )
}

export default DashBoard
