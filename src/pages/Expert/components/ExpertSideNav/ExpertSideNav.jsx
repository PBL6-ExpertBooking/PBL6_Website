import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SyncLockIcon from '@mui/icons-material/SyncLock'
import ChecklistIcon from '@mui/icons-material/Checklist'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useTranslation } from 'react-i18next'

export default function ExpertSideNav() {
  const { collapseSidebar } = useProSidebar()
	const { t } = useTranslation()
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
        <Link to={path.expertProfile} style={styleLink}>
          <MenuItem icon={<ManageAccountsIcon />}>{t('myProfile')}</MenuItem>
        </Link>
        <Link to={path.expertChangePassword} style={styleLink}>
          <MenuItem icon={<SyncLockIcon />}>{t('changePassword')}</MenuItem>
        </Link>
        <Link to={path.expertTransactionHistory} style={styleLink}>
          <MenuItem icon={<CalendarMonthRoundedIcon />}>{t('historyTransaction')}</MenuItem>
        </Link>
        <Link to={path.expertShowListPost} style={styleLink}>
          <MenuItem icon={<ChecklistIcon />}>{t('listJobRequests')}</MenuItem>
        </Link>
        <Link to={path.expertBookings} style={styleLink}>
          <MenuItem icon={<ShoppingCartIcon />}>{t('myBookings')}</MenuItem>
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
