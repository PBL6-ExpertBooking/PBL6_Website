import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { useTranslation } from 'react-i18next'
export default function AdminSideNav() {
  const { t } = useTranslation()
  const { collapseSidebar } = useProSidebar()
  const styleLink = {
    textDecoration: 'none',
    color: 'black'
  }
  return (
    <Sidebar style={{ height: '100%' }}>
      <Menu>
        <Link to={path.dashboard} style={styleLink}>
          <MenuItem icon={<HomeRoundedIcon />}>{t('dashboard')}</MenuItem>
        </Link>
        <Link to={path.adminProfile} style={styleLink}>
          <MenuItem icon={<AccountBoxIcon />}>{t('profile')}</MenuItem>
        </Link>
        <Link to={path.adminListUser} style={styleLink}>
          <MenuItem icon={<ManageAccountsIcon />}>{t('usersManagement')}</MenuItem>
        </Link>
        <Link to={path.adminListMajor} style={styleLink}>
          <MenuItem icon={<ManageSearchIcon />}>{t('majorsManagement')}</MenuItem>
        </Link>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar()
          }}
          style={styleLink}
        >
          {t('collapse')}
        </MenuItem>
      </Menu>
    </Sidebar>
  )
}
