import {
  Box,
  Stack,
  Avatar,
  Button,
  TextField,
  Typography,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { React, useState, useEffect } from 'react'
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

const CertificateInfo = (props) => {
  const [formData, setFormData] = useState(new FormData())
  const [certificate, setCertificate] = useState(props.certificate)
  const [majors, setMajors] = useState(props.majors)

  const handleSaveData = () => {
    console.log('Check data update ', certificate)
  }

  return (
    certificate._id && (
      <div style={{ width: '100%' }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#D2E9E9 ',
            padding: '20px',
            margin: '20px 100px'
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
                  <FormControl sx={{ width: '45%', m: 2 }}>
                    <InputLabel id='demo-simple-select-label'>Major</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={certificate.major._id}
                      label='Major'
                      onChange={(e) =>
                        setCertificate({
                          ...certificate,
                          major: {
                            _id: e.target.value
                          }
                        })
                      }
                    >
                      {majors &&
                        majors.length > 0 &&
                        majors.map((major) => {
                          return <MenuItem value={major._id}>{major.name}</MenuItem>
                        })}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    required
                    id='outlined-required'
                    label='Status'
                    disabled
                    defaultValue={certificate.isVerified ? 'Confirmed' : 'Unconfirmed'}
                  />
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
                    <TextField
                      required
                      id='outlined-required'
                      label='Certificate name'
                      value={certificate.name}
                      onChange={(e) =>
                        setCertificate({
                          ...certificate,
                          name: e.target.value
                        })
                      }
                    />
                    <Stack
                      direction='column'
                      alignItems='center'
                      justifyContent='center'
                      spacing={2}
                      sx={{
                        width: '45%'
                      }}
                    >
                      <Avatar
                        alt='Remy Sharp'
                        src={certificate.photo_url}
                        variant='square'
                        sx={{ width: '100%', height: 400 }}
                      />
                      <Box>
                        <Button
                          component='label'
                          variant='contained'
                          startIcon={<CloudUploadIcon />}
                          sx={{
                            backgroundColor: '#F8F6F4',
                            color: 'black',
                            '&:hover': {
                              backgroundColor: '#F8F6F4',
                              color: 'black'
                            }
                          }}
                        >
                          Upload image
                          <VisuallyHiddenInput
                            type='file'
                            accept='.jpg, .png'
                            onChange={(e) => {
                              const file = e.target.files[0]
                              let newFormData = new FormData()
                              newFormData.append('photo', file)
                              setFormData(newFormData)
                              const reader = new FileReader()
                              reader.readAsDataURL(file)
                              reader.onloadend = () => {
                                setCertificate({
                                  ...certificate,
                                  photo_url: reader.result
                                })
                              }
                            }}
                          />
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
                    id='outlined-multiline-static'
                    label='Description'
                    multiline
                    rows={4}
                    value={certificate.descriptions}
                    onChange={(e) =>
                      setCertificate({
                        ...certificate,
                        descriptions: e.target.value
                      })
                    }
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
                <Button
                  variant='contained'
                  component='label'
                  onClick={handleSaveData}
                  sx={{
                    backgroundColor: '#F8F6F4',
                    color: 'black',
                    '&:hover': {
                      backgroundColor: '#F8F6F4',
                      color: 'black'
                    }
                  }}
                >
                  Save Change
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Card>
      </div>
    )
  )
}

export default CertificateInfo
