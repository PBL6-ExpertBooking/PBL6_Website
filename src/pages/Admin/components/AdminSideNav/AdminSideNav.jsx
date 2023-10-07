import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SyncLockIcon from '@mui/icons-material/SyncLock'
import { useCookies } from 'react-cookie'

export default function AdminSideNav() {
  const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
  const logOut = async () => {
    removeCookie('access_token', { path: '/' })
    removeCookie('refresh_token', { path: '/' })
    removeCookie('user', { path: '/' })
    localStorage.removeItem('profile')
    window.location.reload()
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
        <Link to={path.adminListUser} style={styleLink}>
          <MenuItem icon={<ManageAccountsIcon />}>Users management</MenuItem>
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
