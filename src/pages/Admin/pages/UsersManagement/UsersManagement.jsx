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
  DataGrid,useGridApiRef
} from '@mui/x-data-grid';
import Label from '../../../../components/Label'


import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '../../../../common/components/SnackBar'
import AxiosInterceptors from '../../../../common/utils/axiosInterceptors'
import useSnackbar from '../../../../contexts/snackbar.context'
import urlConfig from '../../../../config/UrlConfig';
import _ from 'lodash';
import LockIcon from '@mui/icons-material/Lock';

const UserInfoModal = lazy(() => import('../../components/UserInfoModal'))

const UsersManagement = () => {
  //STATE
  const [openMenu, setOpenMenu] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [openModal, setOpenModal] = useState(false)
  const { snack, setSnack } = useSnackbar()
  const [rerender, setRerender] = useState(false)
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalDocs, setTotalDocs] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchUsers = async (page=1, limit=100000) => {
    const res = await AxiosInterceptors.get(urlConfig.user.users + `?page=${page}&limit=${limit}`)
    if(res && res.status === 200) {
      if(res.data.pagination) {
        if(res.data.pagination.users) {
          setUsers(res.data.pagination.users)
          setTotalDocs(res.data.pagination.totalDocs)
        }
      }
    }
  } 

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng ở đây
    (async () => {
      if (rerender) {
        await fetchUsers();
        setRerender(false)
      }
    })();

    let active = true;
    (async () => {
      if(rerender){
        return;
      }
      setLoading(true);
      await fetchUsers(page + 1);

      if (!active) {
        return;
      }
      setLoading(false);

    })();

    return () => {
      active = false;
    };
  }, [rerender, page]); 

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

  const handleSetRerender = () => {
    setRerender(true)
  }

  const handleClickDeleteBtn = () => {
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const hanldeClickLockAccount = async () => {
    handleCloseMenu()
    if(currentRow.isRestricted) {
      const res = await AxiosInterceptors.put(`${urlConfig.user.users}/${currentRow._id}/enable`)
      if (res.status === 200) {
        setRerender(true)
        setSnack({
          open: true,
          message: 'Unlocked account successfully',
          type: 'success'
        })
      } else {
        setSnack({
          open: true,
          message: res.message,
          type: 'error'
        })
      }
    } else if (!currentRow.isRestricted) {
      const res = await AxiosInterceptors.put(`${urlConfig.user.users}/${currentRow._id}/disable`)
      if (res.status === 200) {
        setRerender(true)
        setSnack({
          open: true,
          message: 'Locked account successfully',
          type: 'success'
        })
      } else {
        setSnack({
          open: true,
          message: res.message,
          type: 'error'
        })
      }
    }
  }

  const getLabel = (item) => {
    console.log(item)
    const map = {
      USER: {
        text: 'USER',
        color: 'info'
      },
      EXPERT: {
        text: 'EXPERT',
        color: 'success'
      },
      ADMIN: {
        text: 'ADMIN',
        color: 'warning'
      },
      YES: {
        text: 'YES',
        color: 'success'
      },
      NO: {
        text: 'NO',
        color: 'error'
      },
      ACTIVE: {
        text: 'ACTIVE',
        color: 'success'
      },
      UNACTIVE: {
        text: 'UNACTIVE',
        color: 'error'
      }
    }

    const { text, color } = map[item]

    return <Label color={color}>{text}</Label>
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
    { field: 'role', 
      headerName: 'Role',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {
        return (
          getLabel(params.row.role)
        )
      }
    },
    { field: 'isConfirmed', 
      headerName: 'Verify',
      align: 'center',
      justifyContent: 'center',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => {
        return (
          params.row.isConfirmed == true ? getLabel('YES') : getLabel('NO')
        )
      }
    },
    { field: 'isRestricted', 
      headerName: 'Status',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: (params) => {
        return (
          params.row.isRestricted ? getLabel("UNACTIVE") : getLabel("ACTIVE")
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
            sx={{
            '& .MuiDataGrid-row': {
                minHeight: '64px !important',
            },
            }}
            initialState={{
              pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[10, 20, 30, 50]}
            rowCount={totalDocs}
            paginationMode="server"
            page={page}
            onPaginationModelChange={(params) => {
              setPage(params.page);
              setPageSize(params.pageSize)
            }}
            loading={loading}
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
          sx={{ color: 'warning.main' }}
          onClick={hanldeClickLockAccount}
        >
          <LockIcon sx={{mr: 1}}/>
          {currentRow && currentRow.isRestricted ? "Unlock" : "Lock"}
        </MenuItem>

        <MenuItem 
          sx={{ color: 'error.main' }}
          onClick={handleClickDeleteBtn}
        >
          <DeleteIcon sx={{mr: 1}}/>
          Delete
        </MenuItem>
      </Popover>
      
      {currentRow && < UserInfoModal open={openModal} handleCloseModal={handleCloseModal} user={currentRow} setRerender={handleSetRerender}/>}
    </>
  )
}

export default UsersManagement
