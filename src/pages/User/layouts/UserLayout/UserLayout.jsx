import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import UserSideNav from '../../components/UserSideNav/UserSideNav'
import Header from '../../components/Header'
import { Box } from '@mui/material'

function UserLayoutInner({ children }) {
  return (
    <div>
      <Header />
      <Box sx={{
        display: 'flex',
        height: '95vh',
      }} >
      <UserSideNav />
      {children}
      <Outlet />
      </Box>
    </div>
  )
}

const UserLayout = memo(UserLayoutInner)

export default UserLayout
