import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'

export default function AdminSideNav() {
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
