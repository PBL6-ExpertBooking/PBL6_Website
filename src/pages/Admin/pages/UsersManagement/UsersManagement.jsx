import { useState, lazy } from 'react';
// @mui
import {
  Stack,
  Container,
  IconButton,
  Popover,
  MenuItem,
  Typography
} from '@mui/material';

import {
  DataGrid
} from '@mui/x-data-grid';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserInfoModal = lazy(() => import('../../components/UserInfoModal'))

//USERS DATA
const users = [
  {
    id: '1',
    firstName: "Phạm Thành",
    lastName: "Công",
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng, K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    email: "conpham@gmail.com",
    phone: '0382412729',
    role: 'Expert',
    gender: 0,
    username: 'congphamit2002',
    DoB: '2002-07-22',
    verify: 'Yes'
  },
  {
    id: '2',
    firstName: "Bùi Phước",
    lastName: "Huy",
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng, K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    email: "huybui@gmail.com",
    phone: '0382412729',
    role: 'User',
    gender: 0,
    username: 'huybui2002',
    DoB: '2002-07-23',
    verify: 'No'
  }
]

const UsersManagement = () => {

  //STATE
  const [openMenu, setOpenMenu] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [openModal, setOpenModal] = useState(false)

  //HANDLE
  const handleOpenMenu = (event, row) => {
    setCurrentRow(row)
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  const handleClickEditBtn = () => {
    setOpenModal(true)
  }

  const handleClickDeleteBtn = () => {
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const columns = [
    { field: 'fullName', 
      headerName: 'Full name', 
      flex: 2,
      renderCell: (params) => {
        return (
          params.row.firstName + " " + params.row.lastName
        )
      }
    },
    { field: 'email', headerName: 'Email', flex: 2 },
    { field: 'address', headerName: 'Address', flex: 5 },
    { field: 'phone', headerName: 'Phone', flex: 2 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'verify', headerName: 'Verify', flex: 1 },
    {
      field: 'action',
      headerName: '',
      flex: 1,
      sortable: false,
      disableClickEventBubbling: true,
      
      renderCell: (params) => {
          return (
            <IconButton size="large" color="inherit" onClick={(e) => handleOpenMenu(e, params.row)}>
              <MoreVertIcon/>
            </IconButton>
          );
      },
    }
  ];

  return (
    <>

      <Container
        sx={{ minWidth: 1500
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h3" gutterBottom>
            Users management
          </Typography>
        </Stack>
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid

            getRowHeight={() => 'auto'}
            rows={users}
            columns={columns}
            editMode="row"
            sx={{
            '& .MuiDataGrid-row': {
                minHeight: '64px !important',
            },
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[10, 20, 30, 50]}
          />
        </div>  
      </Container>

      <Popover
        open={Boolean(openMenu)}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
         onClick={handleClickEditBtn}
        >
          <EditIcon sx={{mr: 1}} />
          Edit
        </MenuItem>

        <MenuItem 
          sx={{ color: 'error.main' }}
          onClick={handleClickDeleteBtn}
        >
          <DeleteIcon sx={{mr: 1}}/>
          Delete
        </MenuItem>
      </Popover>
      
      {currentRow && < UserInfoModal open={openModal} handleCloseModal={handleCloseModal} user={currentRow}/>}
    </>
  )
}

export default UsersManagement
