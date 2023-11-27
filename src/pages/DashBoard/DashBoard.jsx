import React, { useState, useContext, useEffect } from 'react'
import { Card, Typography, TextField, InputAdornment, Stack, MenuItem, Button, Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@mui/icons-material/Search'
import { MajorContext } from '../../contexts/major.context'
import TopExpert from '../../components/TopExpert'
import { Helmet } from 'react-helmet-async'
import AxiosInterceptors from '../../common/utils/axiosInterceptors'
import urlConfig from '../../config/UrlConfig'
import ListSearch from '../../components/ListSearch'
import useSnackbar from '../../contexts/snackbar.context'
import Snackbar from '../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'

const DashBoard = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [major_id, setMajor_id] = useState('')
  const { majors, loading, getMajors } = useContext(MajorContext)
  const [listExpert, setListExpert] = useState([])
  const [topExpert, setTopExpert] = useState([])
  const { snack, setSnack } = useSnackbar()
  const [isSearch, setIsSearch] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getMajors()
    fetchTop()
  }, [])
  const handleChange = (event) => {
    setIsSearch(true)
    setSearchTerm(event.target.value)
  }
  const fetchTop = async () => {
    await AxiosInterceptors.get(urlConfig.expert.topExpert + '?num=4')
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.experts) {
            setTopExpert(res.data.experts)
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const handleSearch = async () => {
    setIsLoading(true)
    await AxiosInterceptors.get(urlConfig.user.searchExpert + `?major_id=${major_id}&search=${searchTerm}&limit=100`)
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
            setIsLoading(false)
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
        <title>{t('dashboard')}</title>
      </Helmet>
      <Card
        sx={{
          backgroundImage: 'url(https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_7.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
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
          {t('discover')}
        </Typography>
        <Stack direction='row' spacing={3} sx={{ mt: 5, color: 'black' }}>
          <TextField
            id='search'
            type='search'
            label={t('searchTitle')}
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
              label={t('major')}
              sx={{ width: 200 }}
              defaultValue=''
              onChange={(e) => setMajor_id(e.target.value)}
            >
              {majors.majors?.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          )}
          <Button
            variant='contained'
            onClick={handleSearch}
            sx={{
              color: 'white',
              backgroundColor: 'black'
            }}
          >
            {t('search')}
          </Button>
        </Stack>
      </Card>
      {isSearch ? (
        !isLoading ? (
          <ListSearch listExpert={listExpert} />
        ) : (
          <Box
            sx={{
              width: '100%',
              px: 10,
              py: 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        )
      ) : (
        <TopExpert topExpert={topExpert} />
      )}
    </>
  )
}

export default DashBoard
