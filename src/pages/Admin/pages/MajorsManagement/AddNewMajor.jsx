import React from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Box, TextField } from '@mui/material'
const AddNewMajor = ({ open, handleClose }) => {
  return (
    <RootModal
      variant='Create'
      title='New Major'
      open={open}
      handleClose={handleClose}
      handleOk={() => {}}
      closeOnly={false}
    >
      <Box sx={{ my: 2 }}>
        <TextField id='outlined-basic' label='Major Name' variant='outlined' fullWidth />
        <TextField id='outlined-basic' label='Descriptions' variant='outlined' fullWidth />
      </Box>
    </RootModal>
  )
}

export default AddNewMajor
