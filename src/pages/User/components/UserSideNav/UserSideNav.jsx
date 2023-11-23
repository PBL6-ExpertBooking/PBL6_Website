import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import SyncLockIcon from '@mui/icons-material/SyncLock'
import WorkIcon from '@mui/icons-material/Work'
import { useTranslation } from 'react-i18next'

export default function UserSideNav() {
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
        <Link to={path.profile} style={styleLink}>
          <MenuItem icon={<ManageAccountsIcon />}>{t('profile')}</MenuItem>
        </Link>
        <Link to={path.historyTransaction} style={styleLink}>
          <MenuItem icon={<CalendarMonthRoundedIcon />}>{t('historyTransaction')}</MenuItem>
        </Link>
        <Link to={path.jobRequest} style={styleLink}>
          <MenuItem icon={<WorkIcon />}>{t('jobRequest')}</MenuItem>
        </Link>
        <Link to={path.changePassword} style={styleLink}>
          <MenuItem icon={<SyncLockIcon />}>{t('changePassword')}</MenuItem>
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
