import * as React from 'react';
import { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal';
import { Box, Stack, Button, TextField, Typography, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import _ from 'lodash';
import dayjs from 'dayjs';
import urlConfig from '../../../../config/UrlConfig';
import useSnackbar from '../../../../contexts/snackbar.context';
import Snackbar from '../../../../common/components/SnackBar'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function UserInfoModal({open, handleCloseModal, user, setRerender}) {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState(0);
  const [DoB, setDoB] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(0);
  const [isRestricted, setIsRestricted] = useState(false);
  const { snack, setSnack } = useSnackbar()

  useEffect(() => {
    // Khi prop user thay đổi, cập nhật state currentUser
    // initState(user)
    clearState()
    initState(user)
  }, [user]);


  const clearState = () => {
    setUserId("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setUsername("")
    setGender(0)
    setDoB("")
    setIsConfirmed(false)
    setAddress("")
    setRole("USER")
    setIsRestricted(false)
  }

  const initState = (user) => {
    if (user && !_.isNull(user) && user._id) {
      setUserId(user._id)
    }

    if (user && !_.isNull(user) && user.first_name) {
      setFirstName(user.first_name)
    }

    if (user && !_.isNull(user) && user.last_name) {
      setLastName(user.last_name)
    }

    if (user && !_.isNull(user) && user.email) {
      setEmail(user.email)
    } 
    
    if (user && !_.isNull(user) && user.username) {
      setUsername(user.username)
    }

    if (user && !_.isNull(user) && user.gender) {
      setGender(user.gender ? 1 : 0)
    }

    if (user && !_.isNull(user) && user.DoB) {
      setDoB(user.DoB)
    }

    if (user && !_.isNull(user) && user.isConfirmed) {
      setIsConfirmed(user.isConfirmed ? 1 : 0)
    }

    if (user && !_.isNull(user) && user.address) {
      setAddress(user.address)
    }

    if (user && !_.isNull(user) && user.phone) {
      setPhone(user.phone)
    }

    if (user && !_.isNull(user) && user.role) {
      switch(user.role) {
        case "USER":{
          setRole(0);
          break;
        }
        case "EXPERT": {
          setRole(1);
          break;
        }
        case "ADMIN": {
          setRole(2);
          break;
        }
      }
    } 

    if (user && !_.isNull(user) && user.isRestricted) {
      setIsRestricted(user.isRestricted ? 1 : 0)
    } 
  }

  const handleOnclickSaveChangesBtn = async () => {
    const url = urlConfig.user.users + `/${userId}`
    const res = await AxiosInterceptors.put(url, {
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      phone: phone,
      address: address,
      DoB: DoB,
    })
    if (res.status === 200) {
      setRerender()
      setSnack({
        open: true,
        message: 'Updated account successfully',
        type: 'success'
      })
    } else {
      setSnack({
        open: true,
        message: res.message,
        type: 'error'
      })
    }
    handleCloseModal();
  }

  const lowerAndCapitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleCloseModal()}
        borderRadius
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Card
            sx={{
              display: 'flex',
              flexDirection: 'row'
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
              {lowerAndCapitalize(`${user.role} Profile`)}
              </Typography>
              <Box component='form' noValidate autoComplete='off'>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 2, width: '45%' }
                  }}
                >
                  <TextField required id='outlined-required' label='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                  <TextField required id='outlined-required' label='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Box>

                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 2, width: '45%' }
                  }}
                >
                  <TextField fullWidth required id='outlined-required' label='Username' value={username} disabled />
                  <TextField fullWidth required id='outlined-required' label='Email' value={email} disabled />
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <FormControl 
                    sx={{width: '45%', m: 2}}
                  >
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      label="Gender"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value={0}>Male</MenuItem>
                      <MenuItem value={1}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 2, width: '45%' }
                  }}
                >
                  <FormControl 
                    sx={{width: '45%', m: 2}}
                  >
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      label="Role"
                      onChange={(e) => setRole(e.target.value)}
                      disabled
                    >
                      <MenuItem value={0}>User</MenuItem>
                      <MenuItem value={1}>Expert</MenuItem>
                      <MenuItem value={2}>Admin</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    id='outlined-number'
                    label='Verify'
                    disabled
                    value={isConfirmed ? "YES" : "NO"}
                  />
                </Box>

                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 2, width: '45%' }
                  }}
                >
                  <LocalizationProvider 
                      dateAdapter={AdapterDayjs}
                      sx={{width: '45%', m: 2}}
                    >
                      <DateField
                        label="Date of birthday"
                        value={dayjs(DoB)}
                        onChange={(newValue) => setDoB(newValue)}
                      />
                  </LocalizationProvider>

                  <TextField
                    id='outlined-number'
                    label='Status'
                    disabled
                    value={isRestricted ? "ACTIVE" : "UNACTIVE"}
                  />
                </Box>
                <Box
                  sx={{
                    '& .MuiTextField-root': { m: 2, width: '94%' }
                  }}
                >
                  <TextField 
                    required id='outlined-required' 
                    label='Address' 
                    multiline
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Box>
              </Box>
            </Box>
          </Stack>
          </Card>
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
              sx={{width: 130}}
              onClick={handleOnclickSaveChangesBtn}
            >
              Save Change
            </Button>
            <Button 
              variant='contained' 
              component='label' 
              color='error'
              sx={{width: 130}}
              onClick={() => handleCloseModal()}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}