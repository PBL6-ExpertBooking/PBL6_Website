import { Box, Stack, Avatar, Button, TextField, Typography, Card, FormControlLabel, Checkbox } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

const Profile = () => {
  return (
    <div style={{width: '100%'}}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#E8DDDD',
          padding: '20px',
          margin: '20px 100px',
        }}
      >
        <Stack
          spacing={2}
          direction='row'
          sx={{
            width: '100%'
          }}
        >
          <Stack
            spacing={5}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{
              width: '50%'
            }}
          >
            <Avatar alt='Remy Sharp' src='https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png' sx={{ width: 250, height: 250 }} />
            <Box>
              <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput type='file' />
              </Button>
            </Box>
          </Stack>
          <Box sx={{ display: 'block', width: '100%' }}>
            <Typography variant='h4' component='h4' sx={{ margin: '1.5rem' }}>
              Change Profile Information
            </Typography>
            <Box component='form' noValidate autoComplete='off'>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 2, width: '45%' }
                }}
              >
                <TextField fullWidth required id='outlined-required' label='Username' defaultValue='test123' />
                <TextField fullWidth required id='outlined-required' label='Email' defaultValue='test123@gmail.com' />
              </Box>

              <Box
                sx={{
                  '& .MuiTextField-root': { m: 2, width: '45%' }
                }}
              >
                <TextField required id='outlined-required' label='First Name' defaultValue='test' />
                <TextField required id='outlined-required' label='Last Name' defaultValue='user ' />
              </Box>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 2, width: '45%' }
                }}
              >
                <TextField
                  id='outlined-number'
                  label='Phone Number'
                  type='number'
                  InputLabelProps={{
                    shrink: true
                  }}
                  defaultValue='0123456789'
                />
              </Box>
            </Box>
            <Stack
              spacing={1}
              direction='row'
              alignItems='center'
              justifyContent='flex-end'
              sx={{
                marginRight: '2rem'
              }}
            >
              <Button variant='contained' component='label'>
                Save Change
              </Button>
              <Button variant='contained' component='label' color='error'>
                Reset
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Card>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#E8DDDD',
          padding: '20px',
          margin: '20px 100px',
        }}
      >
        <Typography variant='h4' component='h4' sx={{ margin: '1rem' }}>
          Delete Account
        </Typography>
        <FormControlLabel control={<Checkbox defaultChecked />} label="
          I understand that I will not be able to undo this action and that all my data will be deleted.
        "  sx={{ marginLeft: '1.5rem' }} />
        <Stack
              spacing={1}
              direction='row'
              alignItems='center'
              justifyContent='flex-end'
              sx={{
                marginRight: '2rem'
              }}
            >
              <Button variant='contained' component='label' color='error'>
                Delete
              </Button>
            </Stack>
      </Card>
    </div>
  )
}

export default Profile
