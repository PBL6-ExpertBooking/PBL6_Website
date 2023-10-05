import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { AppContext } from '../../../../contexts/app.context'
import { useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SyncLockIcon from '@mui/icons-material/SyncLock'
import ChecklistIcon from '@mui/icons-material/Checklist';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function ExpertSideNav() {
  const navigate = useNavigate()
  const logOut = async () => {
    navigate('/login')
  }
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
        <Link to={path.expertProfile} style={styleLink}>
          <MenuItem icon={<ManageAccountsIcon />}>Profile</MenuItem>
        </Link>
        <Link to={path.expertChangePassword} style={styleLink}>
          <MenuItem icon={<SyncLockIcon />}>Change Password</MenuItem>
        </Link>
        <Link to={path.expertTransactionHistory} style={styleLink}>
          <MenuItem icon={<CalendarMonthRoundedIcon />}>History Transaction</MenuItem>
        </Link>
        <Link to={path.expertShowListPost} style={styleLink}>
          <MenuItem icon={<ChecklistIcon />}>Show list post</MenuItem>
        </Link>
        <Link to={path.expertBookings} style={styleLink}>
          <MenuItem icon={<ShoppingCartIcon />}>My orders</MenuItem>
        </Link>
        <MenuItem icon={<LogoutRoundedIcon />} onClick={logOut} style={styleLink}>
          Sign Out
        </MenuItem>
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