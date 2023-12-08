import React, { useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Grid, Typography, Button } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { styled } from '@mui/material/styles'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import svg from '../../../../assets/icons/pdf_file.svg'

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

const CertificateValidateForm = ({ open, setOpen, certificate, fetchData, expertId }) => {
  const [formData, setFormData] = useState(new FormData())
  const [document, setDocument] = useState({
    name: null,
    description: null,
    file: null
  })
  const { snack, setSnack } = useSnackbar()
  const handleDocument = async () => {
    await AxiosInterceptors.post(
      urlConfig.expert.uploadDocuments + `/${expertId}/documents`,
      {
        name: formData.get('file').name,
        description: formData.get('file').name,
        file: formData.get('file')
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then((res) => {
        if (res && res.status === 200) {
          setSnack({
            ...snack,
            open: true,
            message: 'Tải tài liệu thành công',
            type: 'success'
          })
          setDocument({
            ...document,
            file: res.data.data.file
          })
        }
      })
      .catch((err) => console.log(err))
  }

  const handleVerify = async () => {
    await AxiosInterceptors.put(urlConfig.certificate.verifyCertificate + `/${certificate._id}/verify`)
      .then((res) => {
        if (res && res.status === 200) {
          setSnack({
            ...snack,
            open: true,
            message: 'Xác thực chứng chỉ thành công',
            type: 'success'
          })
          fetchData()
          setOpen(false)
        }
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: 'Xác thực chứng chỉ thất bại',
          type: 'error'
        })
      )
  }
  return (
    <>
      <Snackbar />
      <RootModal
        variant='Create'
        title='Xác thực chứng chỉ'
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => {
          handleDocument()
          handleVerify()
        }}
        closeOnly={false}
      >
        <Grid
          container
          spacing={1}
          sx={{
            mt: 2
          }}
        >
          <Grid item xs={6} sm={6}>
            <Typography variant='h5' color='text.primary' gutterBottom noWrap>
              Tên chứng chỉ:
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='body2' color='text.secondary' noWrap>
              {certificate.name}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='h5' color='text.primary' gutterBottom noWrap>
              Mô tả:
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='body2' color='text.secondary' noWrap>
              {certificate.descriptions}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='h5' color='text.primary' gutterBottom noWrap>
              Chuyên ngành:
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='body2' color='text.secondary' noWrap>
              {certificate.major.name}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='h5' color='text.primary' gutterBottom noWrap>
              Trạng thái:
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='body2' color={certificate.isVerified ? 'success' : 'error'} noWrap>
              {certificate.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6}>
            <Typography variant='h5' color='text.primary' gutterBottom noWrap>
              Tài liệu:
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {formData.get('file') && (
              <img
                src={svg}
                alt='file'
                width='20px'
                style={{
                  marginRight: '10px'
                }}
              />
            )}
            <Typography variant='body2' color='text.secondary' noWrap></Typography>
            {formData.get('file') ? (
              <Typography variant='body2' color='text.secondary' noWrap>
                {formData.get('file').name}
              </Typography>
            ) : (
              <Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
                Upload file
                <VisuallyHiddenInput
                  type='file'
                  accept='application/pdf'
                  onChange={(e) => {
                    const file = e.target.files[0]
                    let newFormData = new FormData()
                    newFormData.append('file', file)
                    setFormData(newFormData)
                    const reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onloadend = () => {
                      setDocument({
                        ...document,
                        file: reader.result
                      })
                    }
                  }}
                />
              </Button>
            )}
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' color='text.primary' gutterBottom noWrap>
              Hình ảnh:
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              height: '400px'
            }}
          >
            <img src={certificate.photo_url} alt='certificate' style={{ width: '100%', objectFit: 'contain' }} />
          </Grid>
        </Grid>
      </RootModal>
    </>
  )
}

export default CertificateValidateForm
