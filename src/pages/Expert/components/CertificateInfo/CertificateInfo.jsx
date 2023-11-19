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
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'

const CertificateInfo = (props) => {
  const [certificate, setCertificate] = useState(props.certificate)
  const [majors, setMajors] = useState(props.majors)
  const { snack, setSnack } = useSnackbar()

  const handleDeleteCertificate = async () => {
    await AxiosInterceptors.delete(urlConfig.certificate.deleteCertificate + `/${certificate._id}`)
    .then((res) => {
      setSnack({
        ...snack,
        open: true,
        message: 'Delete certificate successfully',
        type: 'success'
      })
      props.setRefresh(!props.refresh)
    })
    .catch((err) => {
      console.log(err)
      setSnack({
        ...snack,
        open: true,
        message: 'Delete certificate request failed',
        type: 'error'
      })
    })
  }

  return (
    certificate._id  && (
      <div style={{ width: '100%' }}>
        <Snackbar />
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
                      disabled
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
                      disabled
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
                    disabled
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
                spacing={2}
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
                  onClick={handleDeleteCertificate}
                  sx={{
                    backgroundColor: '#FF4842',
                    color: '#FFF',
                    '&:hover': {
                      backgroundColor: '#F8F6F4',
                      color: 'black'
                    }
                  }}
                >
                  Delete
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
