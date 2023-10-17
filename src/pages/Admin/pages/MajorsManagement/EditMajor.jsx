import React, { useState } from 'react'
import RootModal from '../../../../components/Modal/RootModal'
import { Stack, TextField } from '@mui/material'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import urlConfig from '../../../../config/UrlConfig'
import useSnackbar from '../../../../contexts/snackbar.context'
import Snackbar from '../../../../common/components/SnackBar'
const EditMajor = ({ open, handleClose, fetchData, item }) => {
  const { snack, setSnack } = useSnackbar()
  const [major, setMajor] = useState({
    name: item.name,
    descriptions: item.descriptions
  })
  const handleEdit = async () => {
    await AxiosInterceptors.put(urlConfig.majors.updateMajors + `/${item._id}`, major)
      .then((res) => {
        fetchData()
        setSnack({
          ...snack,
          open: true,
          message: 'Edit major successfully!',
          type: 'success'
        })
      })
      .catch((err) =>
        setSnack({
          ...snack,
          open: true,
          message: 'Edit major failed!',
          type: 'error'
        })
      )
  }
  return (
    <>
      <Snackbar />
      <RootModal
        variant='Edit'
        title='Edit Major'
        open={open}
        handleClose={handleClose}
        handleOk={() => {
          handleEdit()
          handleClose()
        }}
        closeOnly={false}
      >
        <Stack spacing={2} direction='row' sx={{ width: '100%', my: 2 }}>
          <TextField
            id='outlined-basic'
            label='Major Name'
            variant='outlined'
            fullWidth
            defaultValue={item.name}
            onChange={(e) =>
              setMajor({
                ...major,
                name: e.target.value
              })
            }
          />
          <TextField
            id='outlined-basic'
            label='Descriptions'
            variant='outlined'
            fullWidth
            defaultValue={item.descriptions}
            onChange={(e) =>
              setMajor({
                ...major,
                descriptions: e.target.value
              })
            }
          />
        </Stack>
      </RootModal>
    </>
  )
}

export default EditMajor
