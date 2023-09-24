import { useState, useEffect } from 'react';
// @mui
import {
  Stack,
  Button,
  Container,
  Typography
} from '@mui/material';

import {
  DataGrid
} from '@mui/x-data-grid';

const columns = [
  { field: 'major', headerName: 'Major', flex: 1},
  { field: 'title', headerName: 'Title', flex: 2 },
  { field: 'address', headerName: 'Address', flex: 3 },
  { 
    field: 'price', 
    headerName: 'Price', 
    flex: 1 ,
    renderCell: (params) => {
      return (
        <Typography variant="body2">
          {params.value} VNĐ
        </Typography>
      )
    }
  },
  { field: 'status', headerName: 'Status', flex: 1 },
	{
		field: 'action',
		headerName: 'Action',
		width: 180,
		sortable: false,
		disableClickEventBubbling: true,
		
		renderCell: (params) => {
				const onClick = (e) => {
					const currentRow = params.row;
					return alert(JSON.stringify(currentRow, null, 4));
				};
				return (
					<Stack direction="row" spacing={2}>
						<Button variant="contained" color="warning" size="small" onClick={onClick}>Show detail</Button>
					</Stack>
				);
		},
	}
];

const posts = [
  {
    id: '1',
		major: "IT1",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '2',
		major: "IT2",
    title: 'Tìm kiếm người sửa máy tính Win10',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '3',
		major: "IT3",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '4',
		major: "IT4",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '5',
		major: "IT5",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '6',
		major: "IT6",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '7',
		major: "IT",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '8',
		major: "IT",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '9',
		major: "IT",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '10',
		major: "IT",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '11',
		major: "IT",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '12',
		major: "IT",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '13',
		major: "IT",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },{
    id: '14',
		major: "IT",
    title: 'Tìm kiếm người sửa máy tính Win7',
    address: 'K7/7-đường Ngô Sỹ Liên-phường Hòa Khánh Bắc-quận Liên Chiểu-thành phố Đà Nẵng',
    price: 200000,
		status: 'Confirmed',
    createdAt: ""
  },
];


export default function ExpertBooking() {

  return (
    <>
      <Container
				sx={{ minWidth: 1500
				}}
			>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h3" gutterBottom>
            My bookings
          </Typography>
        </Stack>
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid

            getRowHeight={() => 'auto'}
            rows={posts}
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
    </>
  );
}
