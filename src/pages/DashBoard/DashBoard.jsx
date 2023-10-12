import React, { useState } from 'react'
import { Box, Typography, TextField, InputAdornment, Stack, MenuItem, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import province from '../../constants/location'
import major from '../../constants/major'
import TopExpert from '../../components/TopExpert'
import { Helmet } from 'react-helmet-async'

const DashBoard = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'white',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          py: 10
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
          <TextField id='outlined-select-currency' select label='Major' defaultValue='IT'>
            {major.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField id='outlined-select-currency' select label='Location' defaultValue='15'>
            {province.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant='contained'
            sx={{
              color: 'white',
              backgroundColor: 'black'
            }}
          >
            Search
          </Button>
        </Stack>
      </Box>
      <TopExpert />
    </div>
  )
}

export default DashBoard
