import * as React from 'react';
import { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal';
import { Box, Stack, Button, TextField, Typography, Card, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import BlockIcon from '@mui/icons-material/Block';
import _ from 'lodash';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #ccc',
  boxShadow: 24,
  p: 4,
};

export default function UserInfoModal({open, handleCloseModal, user}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState(0);
  const [DoB, setDoB] = useState("");
  const [verify, setVerify] = useState("No");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // Khi prop user thay đổi, cập nhật state currentUser
    // initState(user)
    initState(user)
  }, [user]);

  const initState = (user) => {
    if (user && !_.isNull(user) && user.firstName) {
      setFirstName(user.firstName)
    }

    if (user && !_.isNull(user) && user.lastName) {
      setLastName(user.lastName)
    }

    if (user && !_.isNull(user) && user.email) {
      setEmail(user.email)
    } 
    
    if (user && !_.isNull(user) && user.username) {
      setUsername(user.username)
    }

    if (user && !_.isNull(user) && user.gender) {
      setGender(user.gender)
    }

    if (user && !_.isNull(user) && user.DoB) {
      setDoB(user.DoB)
    }

    if (user && !_.isNull(user) && user.verify) {
      setVerify(user.verify)
    }

    if (user && !_.isNull(user) && user.address) {
      setAddress(user.address)
    }

    if (user && !_.isNull(user) && user.phone) {
      setPhone(user.phone)
    }

    if (user && !_.isNull(user) && user.role) {
      setRole(user.role)
    } 
  }

  const handleOnclickSaveChangesBtn = () => {
    console.log(firstName, lastName, email, username, gender, DoB, verify, address, phone, role)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleCloseModal()}
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
              {user.role} Profile
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
                <TextField fullWidth required id='outlined-required' label='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <TextField fullWidth required id='outlined-required' label='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
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
                    <MenuItem value={2}>Orther</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box
                sx={{
                  '& .MuiTextField-root': { m: 2, width: '29%' }
                }}
              >
                <FormControl 
                  sx={{width: '29%', m: 2}}
                >
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role === 'User' ? 1 : 0}
                    label="Gender"
                    onChange={(e) => setRole(e.target.value == 1 ? "User" : "Expert")}
                  >
                    <MenuItem value={0}>Expert</MenuItem>
                    <MenuItem value={1}>User</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  id='outlined-number'
                  label='Verify'
                  disabled
                  type='number'
                  value={String(verify)}
                />
                <LocalizationProvider 
                  dateAdapter={AdapterDayjs}
                  sx={{width: '29%', m: 2}}
                >
                  <DateField
                    label="Date of birthday"
                    value={dayjs(DoB)}
                    onChange={(newValue) => setDoB(newValue)}
                  />
                </LocalizationProvider>

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
                color='warning'
                sx={{width: 130}}
              >
                Ban
              </Button>
              <Button 
                variant='contained' 
                component='label' 
                color='error'
                sx={{width: 130}}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Card>
        </Box>
      </Modal>
    </div>
  );
}