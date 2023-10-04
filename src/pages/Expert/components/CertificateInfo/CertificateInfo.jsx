import { Box, Stack, Avatar, Button, TextField, Typography, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import {React, useState, useRef } from 'react'
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

const CertificateInfo = () => {
  const [major, setMajor] = useState(0);
  const [image, setImage] = useState(null)
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleChange = (event) => {
    setMajor(event.target.value);
  };

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
          <Box sx={{ display: 'block', width: '100%' }}>
            <Typography variant='h4' component='h4' sx={{ margin: '1.5rem' }}>
              Certificate Information
            </Typography>
            <Box component='form' noValidate autoComplete='off'>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 2, width: '45%' }
                }}
              >
                <FormControl 
                  sx={{width: '45%', m: 2}}
                >
                  <InputLabel id="demo-simple-select-label">Major</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={major}
                    label="Major"
                    onChange={handleChange}
                  >
                    <MenuItem value={0}>IT</MenuItem>
                    <MenuItem value={1}>Teacher</MenuItem>
                    <MenuItem value={2}>Fuho</MenuItem>
                  </Select>
                </FormControl>
                <TextField fullWidth required id='outlined-required' label='Status' defaultValue='Confirmed' />
              </Box>

              <Box
                sx={{
                  '& .MuiTextField-root': { m: 2, width: '45%' }
                }}
              >
                <Stack
                  spacing={2}
                  direction='row'
                  sx={{
                    width: '100%'
                  }}
                >
                  <TextField required id='outlined-required' label='Certificate name' defaultValue='College degree' />
                  <Stack
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                    spacing={2}
                    sx={{
                      width: '45%'
                    }}
                  >
                    {image ? (
                      <Avatar alt='Remy Sharp' src={URL.createObjectURL(image)} variant="square" sx={{ width: '100%', height: 400 }} />
                    ) : (
                      <Avatar alt='Remy Sharp' src='https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png' variant="square" sx={{ width: '100%', height: 400 }} />
                    )}
                    <Box>
                      <Button component='label' variant='contained' startIcon={<CloudUploadIcon />} onChange={(e) => handleImageChange(e)}>
                        Upload image
                        <VisuallyHiddenInput type='file' />
                      </Button>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
              <Box
                sx={{
                  '& .MuiTextField-root': { m: 2, width: '100%' }
                }}
              >
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  defaultValue="Description"
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
            </Stack>
          </Box>
        </Stack>
      </Card>
    </div>
  )
}

export default CertificateInfo
