import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SyncLockIcon from '@mui/icons-material/SyncLock'
import WorkIcon from '@mui/icons-material/Work'

export default function UserSideNav() {
  const { collapseSidebar } = useProSidebar()
  const styleLink = {
    textDecoration: 'none',
    color: 'black'
  }
  return (
    <Sidebar style={{ height: '100%' }}>
      <Menu>
        <Link to={path.dashboard} style={styleLink}>
          <MenuItem icon={<HomeRoundedIcon />}>DashBoard</MenuItem>
        </Link>
        <Link to={path.profile} style={styleLink}>
          <MenuItem icon={<ManageAccountsIcon />}>Profile</MenuItem>
        </Link>
        <Link to={path.changePassword} style={styleLink}>
          <MenuItem icon={<SyncLockIcon />}>Change Password</MenuItem>
        </Link>
        <Link to={path.historyTransaction} style={styleLink}>
          <MenuItem icon={<CalendarMonthRoundedIcon />}>History Transaction</MenuItem>
        </Link>
        <Link to={path.jobRequest} style={styleLink}>
          <MenuItem icon={<WorkIcon />}>Job Request</MenuItem>
        </Link>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar()
          }}
          style={styleLink}
        >
          Collapse
        </MenuItem>
      </Menu>
    </Sidebar>
  )
}
