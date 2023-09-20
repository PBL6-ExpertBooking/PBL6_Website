import React from 'react'
import {Box} from '@mui/material'

const Header = () => {
  return (
    <div>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5vh',
        bgcolor: 'black',
      }}
       >
        Header  
      </Box>
    </div>
  )
}

export default Header