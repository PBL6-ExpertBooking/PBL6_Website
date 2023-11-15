import * as React from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Box,
  Stack,
  Avatar,
  Button,
  TextField,
  Typography,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { useState, useEffect } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { styled } from '@mui/material/styles'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #ccc',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4
}

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

export default function CertificateInformodal({ openCertificate, setOpenCertificate }) {
  const { snack, setSnack } = useSnackbar()
  const [majors, setMajors] = useState([])
	const [majorId, setMajorId] = useState(0)
  const [formData, setFormData] = useState(new FormData())

	const fetchDataMajors = async () => {
    const res = await AxiosInterceptors.get(urlConfig.majors.getMajors)
    if (res.status === 200) {
      if (res.data.majors) {
        setMajors(res.data.majors)
      }
    }
  }

	useEffect(() => {
    ;(async () => {
      await fetchDataMajors()
			setMajorId(majors.length > 0 ? majors[0].id : 0)
    })()
  }, [])
  // const handleCancel = async () => {
  //   await AxiosInterceptors.post(urlConfig.job_requests.updateJobRequests + `/${post._id}/cancel`)
  //     .then((res) => {
  //       setSnack({
  //         ...snack,
  //         open: true,
  //         message: 'Cancel job request successfully',
  //         type: 'success'
  //       })
  //       handleCloseModal()
  //       setRefresh(!refresh)
  //     })
  //     .catch((err) => {
  //       setSnack({
  //         ...snack,
  //         open: true,
  //         message: 'Cancel job request failed',
  //         type: 'error'
  //       })
  //     })
  // }
  return (
		(majors.length > 0 && 
		(
    <div>
      <Snackbar />
      <RootModal
          variant='Create'
					title='Create Certificate'
					open={openCertificate}
					handleClose={() => setOpenCertificate(false)}
					// handleOk={() => handleRecharge()}
					closeOnly={false}
        >
          <Box sx={{ my: 2 }}>
					<FormControl sx={{ width: '100%'}}>
						<InputLabel id='demo-simple-select-label'>Major</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={majorId}
							onChange={(e) => {setMajorId(e.target.value)}}
							label='Major'
						>
							{majors &&
								majors.length > 0 &&
								majors.map((major) => {
									return <MenuItem value={major._id}>{major.name}</MenuItem>
								})}
						</Select>
					</FormControl>
            <TextField
              id='outlined-basic'
              label='Certificatename'
              variant='outlined'
              fullWidth
              sx={{
                mt: 2
              }}
            />
						<TextField
              id='outlined-basic'
              label='Description'
              variant='outlined'
              fullWidth
							multiline
              rows={4}
              sx={{
                mt: 2
              }}
            />
							<Avatar
								alt='Remy Sharp'
								// src={certificate.photo_url}
								variant='square'
								sx={{ width: '100%', height: 400, mt: 2 }}
							/>
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
									},
									mt: 2
								}}
							>
								Upload Certificate Image
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
											console.log(reader.result)
										}
									}}
								/>
							</Button>
          </Box>
        </RootModal>
    </div>
  ))
	)
}
