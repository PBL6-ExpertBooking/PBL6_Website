import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import ExpertSideNav from '../../components/ExpertSideNav/ExpertSideNav'
import { Box } from '@mui/material'

function ExpertLayoutInner({ children }) {
  return (
    <div>
      <Box sx={{
        display: 'flex',
        height: '93vh',
      }} >
      <ExpertSideNav />
      {children}
      <Outlet />
      </Box>
    </div>
  )
}

const ExpertLayout = memo(ExpertLayoutInner)

export default ExpertLayout