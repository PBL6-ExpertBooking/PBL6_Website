import { useState, useEffect, lazy } from 'react';
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

import { useCookies } from 'react-cookie'
import UseAxios from '../../../../hooks/useAxios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '../../../../common/components/SnackBar'
import axios from 'axios';
import useSnackbar from '../../../../contexts/snackbar.context'
import urlConfig from '../../../../config/UrlConfig';
import _ from 'lodash';

const UserInfoModal = lazy(() => import('../../components/UserInfoModal'))

const UsersManagement = () => {
  //STATE
  const [cookies, setCookie] = useCookies(['user'])
  const [users, setUsers] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [openModal, setOpenModal] = useState(false)
  const { snack, setSnack } = useSnackbar()
  const accessToken = cookies.access_token

  const fetchUsers = async () => {
    const res = await UseAxios(urlConfig.user.users, accessToken)
    if(res && res.status === 200) {
      if(res.data.pagination) {
        console.log(res.data.pagination.users)
        if(res.data.pagination.users) {
          setUsers(res.data.pagination.users)
        }
      }
    }
  } 

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng ở đây
    fetchUsers();
  }, []); 

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
          params.row.first_name + " " + params.row.last_name
        )
      }
    },
    { field: 'email', headerName: 'Email', flex: 2 },
    { field: 'address', headerName: 'Address', flex: 5 },
    { field: 'phone', headerName: 'Phone', flex: 1.3 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'isConfirmed', 
      headerName: 'Verify', 
      flex: 1,
      renderCell: (params) => {
        return (
          params.row.isConfirmed == true ? "YES" : "NO"
        )
      }
    },
    { field: 'isRestricted', 
      headerName: 'Status', 
      flex: 1,
      renderCell: (params) => {
        return (
          params.row.isRestricted ? "ACTIVE" : "UNACTIVE"
        )
      }
    },
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
      <Snackbar />
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
