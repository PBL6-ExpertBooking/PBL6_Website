import React, { useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
import { useTranslation } from 'react-i18next'
const AddNewMajor = ({ open, handleClose, fetchData }) => {
  const { t } = useTranslation()
  const { snack, setSnack } = useSnackbar()
  const [newMajor, setNewMajor] = useState({
    name: '',
    descriptions: ''
  })
  const handleAddNew = async () => {
    await AxiosInterceptors.post(urlConfig.majors.createMajors, newMajor)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: t('addNewMajorSuccess'),
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: t('addNewMajorFail'),
          type: 'error'
        })
      )
  }
  return (
    <>
      <Snackbar />
      <RootModal
        variant='Create'
        title={t('newMajor')}
        open={open}
        handleClose={handleClose}
        handleOk={() => {
          handleAddNew()
          handleClose()
        }}
        closeOnly={false}
      >
        <Stack spacing={2} direction='row' sx={{ width: '100%', my: 2 }}>
          <TextField
            id='outlined-basic'
            label={t('majorName')}
            variant='outlined'
            fullWidth
            onChange={(e) =>
              setNewMajor({
                ...newMajor,
                name: e.target.value
              })
            }
          />
          <TextField
            id='outlined-basic'
            label={t('description')}
            variant='outlined'
            fullWidth
            onChange={(e) =>
              setNewMajor({
                ...newMajor,
                descriptions: e.target.value
              })
            }
          />
        </Stack>
      </RootModal>
    </>
  )
}

export default AddNewMajor
